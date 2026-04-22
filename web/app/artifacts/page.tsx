import Link from 'next/link';
import { DOCS } from '@/lib/docs';

export const metadata = {
  title: 'Artifacts · Venmo Group Pay Later',
};

export default function Artifacts() {
  const core       = DOCS.filter((d) => d.tag === 'Built');
  const scaffold   = DOCS.filter((d) => d.tag === 'Scaffold');
  const reference  = DOCS.filter((d) => d.tag === 'Pitch');

  return (
    <div className="doc">
      <p>
        <Link href="/">← back to prototype</Link>
      </p>
      <h1>PM Artifact Pack</h1>
      <p>
        Everything a Senior Manager would bring to day one. Four core built in full. Seven scaffolded — full versions
        available on request. All cite the PayPal Pay Later PRG directly.
      </p>

      <h2>Core (built in full)</h2>
      <div className="artifacts-list">
        {core.map((a) => (
          <Link key={a.slug} className="artifact-card" href={`/doc/${a.slug}`}>
            <span className="tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </Link>
        ))}
      </div>

      <h2>Scaffolded (on request)</h2>
      <div className="artifacts-list">
        {scaffold.map((a) => (
          <Link key={a.slug} className="artifact-card scaffold" href={`/doc/${a.slug}`}>
            <span className="tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </Link>
        ))}
      </div>

      <h2>Reference</h2>
      <div className="artifacts-list">
        {reference.map((a) => (
          <Link key={a.slug} className="artifact-card" href={`/doc/${a.slug}`}>
            <span className="tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </Link>
        ))}
      </div>

      <p className="disclaimer">
        All artifacts are pre-application research. Concrete PayPal-internal data would refine every number.
      </p>
    </div>
  );
}
