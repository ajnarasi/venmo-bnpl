import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allSlugs, getDoc } from '@/lib/docs';

export function generateStaticParams() {
  return allSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  return { title: doc ? `${doc.meta.title} · Venmo Group Pay Later` : 'Document not found' };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  if (!doc) notFound();
  return (
    <div className="doc">
      <p>
        <Link href="/artifacts">← back to artifacts</Link>
      </p>
      <div className="doc-meta">
        <span className={`tag ${doc.meta.tag.toLowerCase()}`}>{doc.meta.tag}</span>
        <span className="doc-slug">{doc.meta.relPath}</span>
      </div>
      <article dangerouslySetInnerHTML={{ __html: doc.html }} />
    </div>
  );
}
