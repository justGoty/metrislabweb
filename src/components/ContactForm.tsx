import { useState } from 'react';
import { CircleCheck as CheckCircle, Send, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const headingRef = useScrollReveal();
  const formRef = useScrollReveal();
  const selectedModel = new URLSearchParams(window.location.search).get('model') ?? '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError(t('contact.form_error'));
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { title: t('contact.step1'), desc: t('contact.step1_desc') },
    { title: t('contact.step2'), desc: t('contact.step2_desc') },
    { title: t('contact.step3'), desc: t('contact.step3_desc') },
  ];

  return (
    <section id="contact" className="py-24 bg-[#f6fafd] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff8a00]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14 flex justify-center hero-fade-scale">
          <Logo height={60} scheme="light" />
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={headingRef} className="reveal-left">
            <p className="text-[#ff8a00] font-semibold text-sm uppercase mb-3">
              {t('contact.label')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
              {t('contact.headline')}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              {t('contact.description')}
            </p>
            <div className="space-y-7">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4 group cursor-default">
                  <div className="w-8 h-8 bg-[#0b3a5b] text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-200 transition-all duration-300">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1 group-hover:text-[#ff8a00] transition-colors">{step.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formRef} className="reveal-right">
            <div className="bg-white rounded-lg p-8 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-lg pointer-events-none" />

              {submitted ? (
                <div className="text-center py-10 relative">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <Sparkles size={20} className="absolute top-8 right-16 text-amber-400 animate-pulse" />
                  <Sparkles size={14} className="absolute top-16 left-20 text-[#1d9bf0] animate-pulse" style={{ animationDelay: '500ms' }} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.success_title')}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{t('contact.success_desc')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#ff8a00] text-white text-sm font-semibold rounded-lg hover:bg-[#e67600] active:scale-95 transition-all"
                  >
                    {t('contact.success_btn')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_name')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.form_name_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_email')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('contact.form_email_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_phone')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t('contact.form_phone_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_company')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('contact.form_company_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_model')}
                      </label>
                      <input
                        type="text"
                        name="model"
                        defaultValue={selectedModel}
                        placeholder={t('contact.form_model_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_count')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder={t('contact.form_count_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex min-h-10 items-end text-sm font-medium text-slate-700 mb-1.5 leading-snug">
                        {t('contact.form_need')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('contact.form_need_placeholder')}
                        className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t('contact.form_message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t('contact.form_placeholder')}
                      className="input-animated w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1d9bf0] focus:border-transparent resize-none"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full py-3.5 bg-[#ff8a00] text-white font-semibold rounded-lg hover:bg-[#e67600] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.form_sending')}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t('contact.form_submit')}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center">{t('contact.form_privacy')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
