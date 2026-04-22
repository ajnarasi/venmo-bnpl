import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export type DocMeta = {
  slug: string;
  title: string;
  tag: 'Built' | 'Scaffold' | 'Validation' | 'Pitch';
  desc: string;
  relPath: string; // relative to Venmo-Group-PayLater/
};

export const DOCS: DocMeta[] = [
  // Core (built in full)
  { slug: 'pr-faq',             title: 'PR/FAQ',                      tag: 'Built', desc: 'Amazon-style press release + 10-question internal FAQ.', relPath: 'artifacts/pr-faq.md' },
  { slug: 'pnl-model',          title: 'P&L Model',                   tag: 'Built', desc: 'Y1 unit economics across bear / base / bull with sensitivity.', relPath: 'artifacts/pnl-model.md' },
  { slug: 'okrs-scorecard',     title: 'OKRs & Scorecard',            tag: 'Built', desc: '3 KRs, KPI tree, operating cadence, guardrails.', relPath: 'artifacts/okrs-scorecard.md' },
  { slug: '30-60-90',           title: '30-60-90',                    tag: 'Built', desc: 'First 90 days in the seat — listen, narrow, ship pilot.', relPath: 'artifacts/30-60-90.md' },

  // Scaffolded
  { slug: 'research-plan',          title: 'Research plan',          tag: 'Scaffold', desc: '8 user segments · interview guide · concept test · success criteria.', relPath: 'artifacts/research-plan.md' },
  { slug: 'regulatory-checklist',   title: 'Regulatory checklist',   tag: 'Scaffold', desc: 'CFPB Reg Z · UDAAP · state licensing · CCPA · internal gates.', relPath: 'artifacts/regulatory-checklist.md' },
  { slug: 'stakeholder-map',        title: 'Stakeholder map',        tag: 'Scaffold', desc: '12 partner roles with first-meeting asks and cadence.', relPath: 'artifacts/stakeholder-map.md' },
  { slug: 'competitive-teardown',   title: 'Competitive teardown',   tag: 'Scaffold', desc: 'Affirm · Klarna · Afterpay · PPL grid and threat model.', relPath: 'artifacts/competitive-teardown.md' },
  { slug: 'pilot-merchant-list',    title: 'Pilot merchant list',    tag: 'Scaffold', desc: 'Top-5 Y1 merchant candidates and pilot brief template.', relPath: 'artifacts/pilot-merchant-list.md' },
  { slug: 'ab-test-roadmap',        title: 'A/B test roadmap',       tag: 'Scaffold', desc: '5 named experiments and their decisions.', relPath: 'artifacts/ab-test-roadmap.md' },
  { slug: 'risk-register',          title: 'Risk register',          tag: 'Scaffold', desc: 'Top-15 risks with mitigation, owner, trigger.', relPath: 'artifacts/risk-register.md' },
  { slug: 'sprint-0',               title: 'Sprint 0 plan',          tag: 'Scaffold', desc: 'RICE-scored backlog, test strategy, launch readiness.', relPath: 'artifacts/sprint-0.md' },

  // Additional reference material
  { slug: 'pitch-v1',               title: 'Original pitch (v1)',    tag: 'Pitch',     desc: 'Full pre-application pitch doc as submitted.', relPath: 'pitch/v1-original.md' },
  { slug: 'eval-criteria',          title: 'Eval criteria (locked)', tag: 'Pitch',     desc: '6 binary criteria, locked before any optimization.', relPath: 'pitch/eval_criteria.md' },
];

// Map basename → slug for rewriting inline .md links
const BASENAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  DOCS.map((d) => [path.basename(d.relPath), d.slug]),
);

// Labels we leave visible but un-linked when the target isn't in the prototype
function rewriteMdLinks(html: string): string {
  return html.replace(
    /<a([^>]*?)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g,
    (full, pre, href, post, text) => {
      // External URLs untouched
      if (/^(https?:|mailto:|#)/i.test(href)) return full;

      // Strip any #fragment
      const [pathPart, frag] = href.split('#');

      // Find a matching doc by basename
      const base = path.basename(pathPart);
      if (BASENAME_TO_SLUG[base]) {
        const slug = BASENAME_TO_SLUG[base];
        const newHref = `/doc/${slug}/${frag ? '#' + frag : ''}`;
        return `<a${pre}href="${newHref}"${post} data-rewritten="1">${text}</a>`;
      }

      // Unknown .md → render as unlinked text, preserving visible content
      if (pathPart.endsWith('.md')) {
        return `<span class="doc-ref" title="Not available in this prototype build">${text}</span>`;
      }

      // Non-markdown relative path — strip the link rather than 404
      return `<span class="doc-ref">${text}</span>`;
    },
  );
}

function workspaceRoot(): string {
  // web/ lives inside Venmo-Group-PayLater/
  return path.resolve(process.cwd(), '..');
}

export function getDoc(slug: string): { meta: DocMeta; html: string } | null {
  const meta = DOCS.find((d) => d.slug === slug);
  if (!meta) return null;
  const filePath = path.join(workspaceRoot(), meta.relPath);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const html = marked.parse(raw, { async: false }) as string;
  return { meta, html: rewriteMdLinks(html) };
}

export function allSlugs(): { slug: string }[] {
  return DOCS.map((d) => ({ slug: d.slug }));
}
