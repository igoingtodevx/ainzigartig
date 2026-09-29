import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export const Impressum: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Impressum | Ainzigartig" description="Anbieterkennzeichnung und Kontaktdaten von Ainzigartig." />
    <div className="max-w-[820px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Startseite
      </Link>

      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Rechtliches</p>
      <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.3rem)] leading-[1.02] tracking-[-0.03em] mb-8">Impressum</h1>

      <div className="rounded-[26px] border border-[#B77A36]/25 bg-accent/12 p-5 md:p-6 mb-6">
        <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#8B5A24] mb-2">Noch nicht veröffentlichungsfertig</p>
        <p className="text-sm text-muted leading-relaxed">
          Die ladungsfähige Geschäftsanschrift wird vor dem öffentlichen Livegang ergänzt. Die übrigen Anbieter- und Kontaktdaten sind bereits hinterlegt.
        </p>
      </div>

      <div className="brand-card bg-surface p-6 md:p-8 space-y-7">
        <section>
          <h2 className="font-editorial text-2xl mb-2">Angaben gemäß § 5 DDG</h2>
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-ink font-semibold">Florian Schupp</strong><br />
            handelnd unter der Geschäftsbezeichnung „Ainzigartig“<br />
            <span className="text-light">[ladungsfähige Geschäftsanschrift wird ergänzt]</span>
          </p>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Kontakt</h2>
          <p className="text-sm text-muted leading-relaxed">
            E-Mail:{' '}
            <a href="mailto:contact@sejerlaenner.tech" className="text-ink underline underline-offset-4 hover:text-accent-hover transition-colors">
              contact@sejerlaenner.tech
            </a>
          </p>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Geschäftsbezeichnung</h2>
          <p className="text-sm text-muted leading-relaxed">
            Ainzigartig ist die Geschäftsbezeichnung von Florian Schupp. Eine Gesellschaft bürgerlichen Rechts (GbR) besteht derzeit nicht.
          </p>
        </section>
      </div>
    </div>
  </main>
);
