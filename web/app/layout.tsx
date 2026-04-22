import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Venmo · Group Pay Later — Concept Prototype',
  description:
    'Pre-application PM concept for PayPal Senior Manager, Consumer Financial Services (BNPL). All data simulated.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <header className="app-header">
            <div className="app-header-row">
              <div>
                <div className="app-title">
                  <span className="logo-mark" aria-hidden="true">V+</span>
                  <span>
                    Venmo <span className="accent">Group Pay Later</span>
                  </span>
                </div>
                <p className="app-sub">
                  Concept prototype · PayPal Sr Manager, Consumer Financial Services (BNPL) · all data simulated
                </p>
              </div>
              <TopNav />
            </div>
          </header>

          {children}

          <footer className="app-footer">
            Built by Ajay Narasimmamoorthy · <a href="https://github.com/ajnarasi">github.com/ajnarasi</a>
            &nbsp;·&nbsp; Concept artifact, not a shipped product. All data simulated.
          </footer>
        </div>
      </body>
    </html>
  );
}
