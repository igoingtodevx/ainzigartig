import React from 'react';
import founderImage from '../Assets/founder_pixelart_nobg.webp';

const members = [
  { name: 'Florian Schupp', role: 'AI & Engineering', link: 'https://sejerlaenner.tech', linkLabel: 'Portfolio' },
  { name: 'Tim Reinschmidt', role: 'Business & Vertrieb', link: '', linkLabel: '' },
  { name: 'Marvin Bertenrath', role: 'Strategy & Automation', link: 'https://www.linkedin.com/in/marvin-bertenrath-909b35200/', linkLabel: 'LinkedIn' },
];

export const TeamSection: React.FC = () => (
  <section id="team" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Ainzigartig</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Von Leuten aus der Praxis
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Technische Umsetzung, Business-Verständnis und Automatisierung in einem kleinen Team, ohne Übergaben durch fünf Agentur-Ebenen.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-stretch">
        <div className="brand-card bg-surface p-7 md:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-6">Team</p>
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {members.map((member) => (
                <div key={member.name} className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-editorial text-[1.55rem] leading-tight text-ink">{member.name}</p>
                    <p className="text-xs text-light mt-1">{member.role}</p>
                  </div>
                  {member.link && (
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
                      aria-label={`${member.linkLabel} von ${member.name} öffnen`}
                    >
                      {member.linkLabel}
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">north_east</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mt-7">
            Wir arbeiten direkt mit den Menschen, die das Problem verstehen, die Lösung bauen und später auch dafür geradestehen.
          </p>
        </div>

        <div className="brand-card relative overflow-hidden bg-[#F3EFEA] min-h-[420px] md:min-h-[520px] flex items-end justify-center px-6 pt-8">
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-ink">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Klein. Direkt. Technisch.
          </div>
          <img
            src={founderImage}
            alt="Das Ainzigartig Team als Pixel-Art Illustration"
            className="w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_24px_30px_rgba(26,25,24,.12)]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);
