import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileUp, LoaderCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../lib/useScrollReveal';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const FORM_LOADED_AT = Date.now();

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const { i18n } = useTranslation();
  const sectionRef = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const selectedModel = new URLSearchParams(window.location.search).get('model') ?? '';
  const isRussian = i18n.resolvedLanguage?.startsWith('ru') !== false;

  const copy = isRussian
    ? {
        eyebrow: 'Заявка инженеру',
        title: 'Проверим модель и уточним срок',
        description:
          'Пришлите модель прибора или фотографию шильдика. Ответим о возможности работ и следующем шаге.',
        response: 'Ответ на заявку',
        responseValue: 'В рабочее время',
        channel: 'Связь',
        channelValue: 'Телефон или email',
        name: 'Ваше имя',
        namePlaceholder: 'Иван Петров',
        phone: 'Телефон',
        phonePlaceholder: '+7 999 000-00-00',
        email: 'Email',
        emailPlaceholder: 'name@company.ru',
        request: 'Модель прибора и задача',
        requestPlaceholder: 'Например: СТА-КД1, поверка 3 шт.',
        attachment: 'Фото шильдика или документ',
        attachmentHint: 'JPG, PNG, WEBP или PDF, до 5 МБ',
        attachmentSelected: 'Выбран файл:',
        consent: 'Согласен с',
        consentLink: 'политикой обработки персональных данных',
        submit: 'Отправить инженеру',
        sending: 'Отправляем',
        successTitle: 'Заявка отправлена',
        successText: 'Заявка принята сайтом. Мы проверим данные и свяжемся с вами по указанным контактам.',
        another: 'Отправить ещё одну',
        genericError: 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.',
        fileTooLarge: 'Файл превышает 5 МБ.',
        fileTypeError: 'Допустимы только JPG, PNG, WEBP и PDF.',
      }
    : {
        eyebrow: 'Engineer request',
        title: 'We will check the model and confirm the lead time',
        description:
          'Send the instrument model or a nameplate photo. We will reply with available services and the next step.',
        response: 'Response time',
        responseValue: 'During business hours',
        channel: 'Contact',
        channelValue: 'Phone or email',
        name: 'Your name',
        namePlaceholder: 'John Smith',
        phone: 'Phone',
        phonePlaceholder: '+7 999 000-00-00',
        email: 'Email',
        emailPlaceholder: 'name@company.com',
        request: 'Instrument model and task',
        requestPlaceholder: 'For example: STA-KD1, verification, 3 units',
        attachment: 'Nameplate photo or document',
        attachmentHint: 'JPG, PNG, WEBP or PDF, up to 5 MB',
        attachmentSelected: 'Selected file:',
        consent: 'I agree to the',
        consentLink: 'personal data processing policy',
        submit: 'Send to an engineer',
        sending: 'Sending',
        successTitle: 'Request sent',
        successText: 'The website has accepted the request. We will review it and contact you using the details provided.',
        another: 'Send another request',
        genericError: 'The request could not be sent. Please try again or call us.',
        fileTooLarge: 'The file is larger than 5 MB.',
        fileTypeError: 'Only JPG, PNG, WEBP and PDF files are accepted.',
      };

  function validateFile(file: File | null) {
    if (!file || file.size === 0) return '';
    if (file.size > MAX_FILE_SIZE) return copy.fileTooLarge;
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) return copy.fileTypeError;
    return '';
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const validationError = validateFile(file);

    if (validationError) {
      event.target.value = '';
      setFileName('');
      setError(validationError);
      setStatus('error');
      return;
    }

    setFileName(file?.name ?? '');
    setError('');
    setStatus('idle');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const attachment = formData.get('attachment');
    const validationError = attachment instanceof File ? validateFile(attachment) : '';

    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    formData.set('started_at', String(FORM_LOADED_AT));
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || copy.genericError);
      }

      form.reset();
      setFileName('');
      setStatus('success');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : copy.genericError);
      setStatus('error');
    }
  }

  function resetForm() {
    formRef.current?.reset();
    setFileName('');
    setError('');
    setStatus('idle');
  }

  const fieldClass =
    'mt-2 w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-[15px] text-slate-950 placeholder:text-slate-400 focus:border-[#0b3a5b] focus:ring-0 disabled:cursor-wait disabled:opacity-60';

  return (
    <section id="contact" className="bg-[#f3f5f5] py-20 lg:py-28">
      <div ref={sectionRef} className="reveal-up mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden border border-slate-300 bg-white lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between bg-[#102f3f] p-7 text-white sm:p-10 lg:p-12">
            <div>
              <p className="mb-5 font-mono text-xs uppercase text-[#ff9d2e]">
                04 / {copy.eyebrow}
              </p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">{copy.title}</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300">{copy.description}</p>
            </div>

            <dl className="mt-12 grid grid-cols-2 border-t border-white/20 pt-6 text-sm">
              <div className="border-r border-white/20 pr-4">
                <dt className="text-slate-400">{copy.response}</dt>
                <dd className="mt-2 font-medium text-white">{copy.responseValue}</dd>
              </div>
              <div className="pl-5">
                <dt className="text-slate-400">{copy.channel}</dt>
                <dd className="mt-2 font-medium text-white">{copy.channelValue}</dd>
              </div>
            </dl>
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            {status === 'success' ? (
              <div className="flex min-h-[430px] flex-col items-start justify-center" role="status">
                <CheckCircle2 aria-hidden="true" className="text-emerald-700" size={38} strokeWidth={1.6} />
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">{copy.successTitle}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-7 text-slate-600">{copy.successText}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 border-b border-[#0b3a5b] pb-1 text-sm font-semibold text-[#0b3a5b] transition-colors hover:border-[#ff8a00] hover:text-[#d96d00]"
                >
                  {copy.another}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                action="/api/contact.php"
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="started_at" value={FORM_LOADED_AT} />
                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <fieldset disabled={status === 'loading'} className="space-y-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700">
                      {copy.name} <span className="text-[#d96d00]">*</span>
                      <input
                        className={fieldClass}
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        placeholder={copy.namePlaceholder}
                      />
                    </label>
                    <label className="text-sm font-medium text-slate-700">
                      {copy.phone} <span className="text-[#d96d00]">*</span>
                      <input
                        className={fieldClass}
                        type="tel"
                        name="phone"
                        required
                        minLength={7}
                        maxLength={25}
                        autoComplete="tel"
                        inputMode="tel"
                        pattern="[+0-9()\s-]{7,25}"
                        placeholder={copy.phonePlaceholder}
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-medium text-slate-700">
                    {copy.email}
                    <input
                      className={fieldClass}
                      type="email"
                      name="email"
                      maxLength={254}
                      autoComplete="email"
                      placeholder={copy.emailPlaceholder}
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    {copy.request} <span className="text-[#d96d00]">*</span>
                    <textarea
                      className={`${fieldClass} min-h-24 resize-y leading-6`}
                      name="request"
                      required
                      minLength={3}
                      maxLength={1000}
                      defaultValue={selectedModel ? `${selectedModel}, ` : ''}
                      placeholder={copy.requestPlaceholder}
                    />
                  </label>

                  <div>
                    <label
                      htmlFor="contact-attachment"
                      className="flex cursor-pointer items-center justify-between gap-4 border border-dashed border-slate-400 px-4 py-4 transition-colors hover:border-[#0b3a5b] hover:bg-slate-50 focus-within:border-[#0b3a5b]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <FileUp aria-hidden="true" className="shrink-0 text-[#0b3a5b]" size={20} />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-slate-800">{copy.attachment}</span>
                          <span className="mt-1 block text-xs text-slate-500">{copy.attachmentHint}</span>
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-xs uppercase text-[#0b3a5b]">{isRussian ? 'Выбрать' : 'Browse'}</span>
                      <input
                        id="contact-attachment"
                        className="sr-only"
                        type="file"
                        name="attachment"
                        accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileName && (
                      <p className="mt-2 truncate text-xs text-slate-600">
                        {copy.attachmentSelected} <span className="font-medium text-slate-900">{fileName}</span>
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 text-xs leading-5 text-slate-600">
                    <input
                      type="checkbox"
                      name="privacy_consent"
                      value="1"
                      required
                      className="mt-0.5 rounded-none border-slate-400 text-[#0b3a5b] focus:ring-[#0b3a5b]"
                    />
                    <span>
                      {copy.consent}{' '}
                      <a href="/privacy" className="font-medium text-[#0b3a5b] underline underline-offset-2 hover:text-[#d96d00]">
                        {copy.consentLink}
                      </a>
                    </span>
                  </label>

                  {status === 'error' && error && (
                    <div className="flex gap-3 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                      <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#0b3a5b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#102f3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <>
                        <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
                        {copy.sending}
                      </>
                    ) : (
                      <>
                        <Send aria-hidden="true" size={17} />
                        {copy.submit}
                      </>
                    )}
                  </button>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
