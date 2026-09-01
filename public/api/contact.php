<?php

declare(strict_types=1);

const RECIPIENT_EMAIL = 'gotypress3@gmail.com';
const FROM_EMAIL = 'noreply@metrislab.ru';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = 6 * 1024 * 1024;
const SESSION_WINDOW_SECONDS = 600;
const SESSION_REQUEST_LIMIT = 3;
const IP_WINDOW_SECONDS = 900;
const IP_REQUEST_LIMIT = 5;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function textField(string $name): string
{
    $value = $_POST[$name] ?? '';

    if (!is_string($value)) {
        respond(422, ['ok' => false, 'error' => 'Неверный формат данных.']);
    }

    return trim(str_replace("\0", '', $value));
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clientIp(): string
{
    $candidate = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    return filter_var($candidate, FILTER_VALIDATE_IP) ? $candidate : 'unknown';
}

function checkOrigin(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return;
    }

    $host = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $allowedHosts = ['metrislab.ru', 'www.metrislab.ru', '127.0.0.1', 'localhost'];

    if (!in_array($host, $allowedHosts, true)) {
        respond(403, ['ok' => false, 'error' => 'Запрос отклонён.']);
    }
}

function enforceSessionRateLimit(): void
{
    $now = time();
    $attempts = $_SESSION['contact_attempts'] ?? [];
    $attempts = is_array($attempts)
        ? array_values(array_filter(
            $attempts,
            static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - SESSION_WINDOW_SECONDS
        ))
        : [];

    if (count($attempts) >= SESSION_REQUEST_LIMIT) {
        header('Retry-After: ' . SESSION_WINDOW_SECONDS);
        respond(429, ['ok' => false, 'error' => 'Слишком много запросов. Повторите позже.']);
    }

    $attempts[] = $now;
    $_SESSION['contact_attempts'] = $attempts;
}

function enforceIpRateLimit(string $ip): void
{
    $filePath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'metrislab-contact-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($filePath, 'c+');

    if ($handle === false) {
        respond(503, ['ok' => false, 'error' => 'Сервис временно недоступен.']);
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            respond(503, ['ok' => false, 'error' => 'Сервис временно недоступен.']);
        }

        rewind($handle);
        $stored = stream_get_contents($handle);
        $decoded = is_string($stored) && $stored !== '' ? json_decode($stored, true) : [];
        $now = time();
        $attempts = is_array($decoded)
            ? array_values(array_filter(
                $decoded,
                static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - IP_WINDOW_SECONDS
            ))
            : [];

        if (count($attempts) >= IP_REQUEST_LIMIT) {
            header('Retry-After: ' . IP_WINDOW_SECONDS);
            respond(429, ['ok' => false, 'error' => 'Слишком много запросов. Повторите позже.']);
        }

        $attempts[] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($attempts));
        fflush($handle);
        @chmod($filePath, 0600);
        flock($handle, LOCK_UN);
    } finally {
        fclose($handle);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Допустим только POST-запрос.']);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (!str_starts_with($contentType, 'multipart/form-data')) {
    respond(415, ['ok' => false, 'error' => 'Ожидается multipart/form-data.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength <= 0 || $contentLength > MAX_REQUEST_SIZE) {
    respond(413, ['ok' => false, 'error' => 'Запрос слишком большой.']);
}

checkOrigin();

ini_set('session.use_strict_mode', '1');
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Lax',
]);

if (session_status() !== PHP_SESSION_ACTIVE && !session_start()) {
    respond(503, ['ok' => false, 'error' => 'Сервис временно недоступен.']);
}

$honeypot = textField('website');
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

$startedAt = filter_var($_POST['started_at'] ?? null, FILTER_VALIDATE_INT);
$elapsedMilliseconds = $startedAt === false ? 0 : (int) floor(microtime(true) * 1000) - (int) $startedAt;
if ($elapsedMilliseconds < 1500 || $elapsedMilliseconds > 86400000) {
    respond(422, ['ok' => false, 'error' => 'Обновите страницу и повторите отправку.']);
}

$name = textField('name');
$phone = textField('phone');
$email = textField('email');
$request = textField('request');
$consent = textField('privacy_consent');

if (textLength($name) < 2 || textLength($name) > 100 || preg_match('/[\r\n]/', $name)) {
    respond(422, ['ok' => false, 'error' => 'Проверьте имя.']);
}

if (textLength($phone) > 25 || !preg_match('/^[+0-9()\s-]+$/u', $phone)) {
    respond(422, ['ok' => false, 'error' => 'Проверьте номер телефона.']);
}

$phoneDigits = preg_replace('/\D+/', '', $phone);
if (!is_string($phoneDigits) || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15) {
    respond(422, ['ok' => false, 'error' => 'Проверьте номер телефона.']);
}

if ($email !== '' && (textLength($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false)) {
    respond(422, ['ok' => false, 'error' => 'Проверьте email.']);
}

if (textLength($request) < 3 || textLength($request) > 1000) {
    respond(422, ['ok' => false, 'error' => 'Опишите модель прибора и необходимую работу.']);
}

if ($consent !== '1') {
    respond(422, ['ok' => false, 'error' => 'Необходимо согласие на обработку данных.']);
}

$attachment = null;
$upload = $_FILES['attachment'] ?? null;

if (is_array($upload) && ($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        respond(422, ['ok' => false, 'error' => 'Не удалось загрузить файл.']);
    }

    $temporaryPath = $upload['tmp_name'] ?? '';
    $fileSize = (int) ($upload['size'] ?? 0);

    if (!is_string($temporaryPath) || !is_uploaded_file($temporaryPath) || $fileSize <= 0 || $fileSize > MAX_FILE_SIZE) {
        respond(422, ['ok' => false, 'error' => 'Файл должен быть не больше 5 МБ.']);
    }

    $mimeTypes = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'application/pdf' => 'pdf',
    ];
    $fileInfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $fileInfo->file($temporaryPath);

    if (!is_string($mimeType) || !isset($mimeTypes[$mimeType])) {
        respond(422, ['ok' => false, 'error' => 'Допустимы только JPG, PNG, WEBP или PDF.']);
    }

    $contents = file_get_contents($temporaryPath);
    if ($contents === false) {
        respond(500, ['ok' => false, 'error' => 'Не удалось обработать файл.']);
    }

    $attachment = [
        'contents' => $contents,
        'mime' => $mimeType,
        'name' => 'shildik-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $mimeTypes[$mimeType],
    ];
}

enforceSessionRateLimit();
enforceIpRateLimit(clientIp());

$messageLines = [
    'Новая заявка с сайта metrislab.ru',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Email: ' . ($email !== '' ? $email : 'не указан'),
    '',
    'Модель и задача:',
    $request,
    '',
    'Дата: ' . date('d.m.Y H:i:s'),
];
$plainText = implode("\r\n", $messageLines);
$boundary = '=_MetrisLab_' . bin2hex(random_bytes(16));
$headers = [
    'MIME-Version: 1.0',
    'From: MetrisLab website <' . FROM_EMAIL . '>',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    'X-Mailer: PHP/' . PHP_VERSION,
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$body = '--' . $boundary . "\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n\r\n";
$body .= chunk_split(base64_encode($plainText), 76, "\r\n");

if (is_array($attachment)) {
    $body .= '--' . $boundary . "\r\n";
    $body .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . "\"\r\n\r\n";
    $body .= chunk_split(base64_encode($attachment['contents']), 76, "\r\n");
}

$body .= '--' . $boundary . "--\r\n";
$subject = '=?UTF-8?B?' . base64_encode('Заявка с metrislab.ru: ' . $name) . '?=';
$sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Письмо не было отправлено. Позвоните нам или повторите позже.']);
}

respond(200, ['ok' => true]);
