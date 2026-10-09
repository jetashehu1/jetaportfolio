import { contact, links } from '../data/site.js';
import Reveal from './Reveal.jsx';
import RevealText from './RevealText.jsx';
import Rule from './Rule.jsx';
import SectionLabel from './SectionLabel.jsx';
import './Contact.css';

export default function Contact() {
  const ctaHref = links.email ? `mailto:${links.email}` : links.instagram;
  const external = !links.email;
  const rows = [
    { label: 'Email', value: links.email, href: links.email && `mailto:${links.email}` },
    { label: 'Instagram', value: links.instagramHandle, href: links.instagram, external: true },
    { label: 'Behance', value: links.behance && 'Behance profile', href: links.behance, external: true },
  ];

  return (
    <section className="contact section theme-cream" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionLabel index={6}>{contact.label}</SectionLabel>

        <RevealText
          id="contact-title"
          className="display contact__headline"
          lines={contact.headline.map((text, index) => ({ text, className: `contact__line-${index}` }))}
        />

        <div className="contact__grid">
          <Reveal as="p" className="label contact__support">
            {contact.support.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>

          <Reveal className="contact__cta-wrap" delay={120}>
            <a
              href={ctaHref}
              className="contact__cta"
              data-cursor="↗"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span>{contact.cta}</span>
              <span className="arrow">↗</span>
            </a>
            <Rule />
          </Reveal>

          <Reveal as="ul" className="contact__list" delay={200}>
            {rows.map((row) => (
              <li key={row.label} className="contact__row">
                <span className="label contact__label">{row.label}</span>
                {row.href ? (
                  <a
                    href={row.href}
                    className="contact__value line-link"
                    {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {row.value}
                    {row.external && <span className="arrow">↗</span>}
                  </a>
                ) : (
                  <span className="contact__value contact__value--soon">Coming soon</span>
                )}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
