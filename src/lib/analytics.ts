export const METRIKA_ID = 112569603;
export const CONSENT_KEY = 'metrislab.analytics.v1';
export const CONSENT_SETTINGS_EVENT = 'metrislab:analytics-settings';
const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;
const SCRIPT_ID = 'metrislab-metrika';

type Consent = 'granted' | 'denied' | null;
type Receipt = { version: number; value: Consent; expiresAt: number };
type Goal = 'lead_submit_success' | 'lead_form_start' | 'contact_phone_click' | 'contact_email_click';
type Metrika = ((id: number, method: string, ...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window { ym?: Metrika }
}

let memoryReceipt: Receipt | null = null;
let sdkReady = false;
let initialized = false;
let loading = false;
let generation = 0;
const queuedGoals: Goal[] = [];
const listeners = new Set<() => void>();

export function getAnalyticsConsent(): Consent {
  if (typeof window === 'undefined') return null;
  let receipt = memoryReceipt;
  try {
    receipt = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Receipt | null;
  } catch { /* The in-memory choice still works if storage is unavailable. */ }
  const now = Date.now();
  return receipt?.version === 1 && Number.isFinite(receipt.expiresAt)
    && receipt.expiresAt > now && receipt.expiresAt <= now + CONSENT_TTL
    && (receipt.value === 'granted' || receipt.value === 'denied') ? receipt.value : null;
}

export const getServerConsent = (): Consent => null;
export const subscribeToConsent = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

// Keep advertising attribution, but never arbitrary query text or model prefill.
export function analyticsPageUrl(href: string): string {
  const url = new URL(href);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  url.pathname = ['/', '/catalog', '/privacy'].includes(path) ? url.pathname : '/404.html';
  const allowed: Record<string, RegExp> = {
    utm_source: /^(yandex|yandex-direct)$/,
    utm_medium: /^cpc$/,
    utm_campaign: /^(metris_search_)?\d{1,20}$/,
    utm_content: /^ad_\d{1,20}_group_\d{1,20}$/,
    yclid: /^\d{1,100}$/,
  };
  const safe = new URLSearchParams();
  for (const [key, pattern] of Object.entries(allowed)) {
    const value = url.searchParams.get(key);
    if (value && pattern.test(value)) safe.set(key, value);
  }
  url.search = safe.toString();
  url.hash = '';
  return url.href;
}

function enabled() {
  return getAnalyticsConsent() === 'granted'
    && ['metrislab.ru', 'www.metrislab.ru'].includes(window.location.hostname);
}

function send(method: string, ...args: unknown[]) {
  try { window.ym?.(METRIKA_ID, method, ...args); } catch { /* Analytics must not block an enquiry. */ }
}

function initializeCounter() {
  if (!enabled() || initialized || !sdkReady) return;
  initialized = true;
  const url = analyticsPageUrl(window.location.href);
  let referrer = '';
  try { referrer = new URL(document.referrer).origin + '/'; } catch { /* Direct visit. */ }
  send('init', {
    defer: true, webvisor: false, clickmap: false, trackLinks: false,
    trackHash: false, ecommerce: false, disableYtm: true, sendTitle: false,
    accurateTrackBounce: false, url, referrer,
  });
  send('hit', url, { referer: referrer });
  queuedGoals.splice(0).forEach((goal) => send('reachGoal', goal));
}

function startCounter() {
  if (!enabled() || initialized || loading) return;
  if (sdkReady) { initializeCounter(); return; }
  loading = true;
  const attempt = ++generation;
  if (!window.ym) {
    const queue: Metrika = (...args) => { queue.a?.push(args); };
    queue.a = [];
    queue.l = Date.now();
    window.ym = queue;
  }
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.referrerPolicy = 'origin';
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
  script.onload = () => {
    if (attempt !== generation) return;
    loading = false;
    sdkReady = true;
    initializeCounter();
  };
  script.onerror = () => {
    if (attempt !== generation) return;
    loading = false;
    queuedGoals.length = 0;
    script.remove();
  };
  document.head.append(script);
}

function stopCounter() {
  ++generation;
  if (initialized) send('destruct');
  initialized = false;
  loading = false;
  queuedGoals.length = 0;
  document.getElementById(SCRIPT_ID)?.remove();
  if (!sdkReady && window.ym?.a) window.ym.a.length = 0;
  try {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ym')) continue;
      for (const domain of ['', window.location.hostname, '.metrislab.ru']) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      }
    }
    Object.keys(localStorage).filter((key) => key.startsWith('_ym')).forEach((key) => localStorage.removeItem(key));
  } catch { /* Storage can be disabled by browser policy. */ }
}

export function setAnalyticsConsent(value: Exclude<Consent, null>) {
  memoryReceipt = { version: 1, value, expiresAt: Date.now() + CONSENT_TTL };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(memoryReceipt)); } catch { /* Session-only consent. */ }
  if (value === 'granted') startCounter(); else stopCounter();
  listeners.forEach((listener) => listener());
}

export function trackAnalyticsGoal(goal: Goal): boolean {
  if (!enabled()) return false;
  if (initialized) send('reachGoal', goal);
  else if (loading && queuedGoals.length < 20) queuedGoals.push(goal);
  return true;
}

export function installAnalytics() {
  startCounter();
  const onClick = (event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    const href = link?.getAttribute('href') || '';
    if (href.startsWith('tel:')) trackAnalyticsGoal('contact_phone_click');
    if (href.startsWith('mailto:')) trackAnalyticsGoal('contact_email_click');
  };
  const syncConsent = () => {
    if (getAnalyticsConsent() === 'granted') startCounter(); else stopCounter();
    listeners.forEach((listener) => listener());
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { memoryReceipt = null; syncConsent(); }
  };
  const onVisibility = () => { if (document.visibilityState === 'visible') syncConsent(); };
  document.addEventListener('click', onClick, true);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('storage', onStorage);
  const expiryCheck = window.setInterval(syncConsent, 60000);
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('storage', onStorage);
    window.clearInterval(expiryCheck);
  };
}

export function openAnalyticsSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}
