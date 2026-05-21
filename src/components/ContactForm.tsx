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
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14 flex justify-center hero-fade-scale">
          <Logo height={60} scheme="light" />
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={headingRef} className="reveal-left">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
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
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{step.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formRef} className="reveal-right">
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-3xl pointer-events-none" />

              {submitted ? (
                <div className="text-center py-10 relative">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <Sparkles size={20} className="absolute top-8 right-16 text-amber-400 animate-pulse" />
                  <Sparkles size={14} className="absolute top-16 left-20 text-blue-400 animate-pulse" style={{ animationDelay: '500ms' }} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.success_title')}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{t('contact.success_desc')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    {t('contact.success_btn')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {t('contact.form_name')}
                      </label>
                      <input
                        type="text"
                        required
                        className="input-animated w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {t('contact.form_email')}
                      </label>
                      <input
                        type="email"
                        required
                        className="input-animated w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {t('contact.form_phone')}
                      </label>
                      <input
                        type="tel"
                        className="input-animated w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {t('contact.form_company')}
                      </label>
                      <input
                        type="text"
                        className="input-animated w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="input-animated w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
