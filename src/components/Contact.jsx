import { contact, instagram } from '../data/site.js';
import Reveal from './Reveal.jsx';
import './Contact.css';

export default function Contact() {
  const rows = [
    { label: 'Instagram', value: `${instagram.handle} ↗`, href: instagram.url, external: true },
    contact.email
      ? { label: 'Email', value: contact.email, href: `mailto:${contact.email}` }
      : { label: 'Email', value: 'Coming soon' },
    contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    ...contact.extra,
  ].filter(Boolean);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal className="contact__meta">
          <span className="eyebrow">(05)</span>
          <span className="eyebrow">Contact</span>
        </Reveal>

        <Reveal as="h2" className="contact__title display" delay={80}>
          <span>Let&rsquo;s</span>
          <span className="contact__indent">Create</span>
          <em>Something.</em>
        </Reveal>

        <Reveal as="ul" className="contact__list" delay={160}>
          {rows.map((row) => (
            <li key={row.label} className="contact__row">
              <span className="eyebrow contact__label">{row.label}</span>
              {row.href ? (
                <a
                  className="contact__value"
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {row.value}
                </a>
              ) : (
                <span className="contact__value contact__value--muted">{row.value}</span>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
