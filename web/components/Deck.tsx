'use client';

import { useCallback, useEffect, useState } from 'react';

export type Slide = {
  kicker: string;
  title: React.ReactNode;
  body?: React.ReactNode;
};

export function Deck({ slides }: { slides: Slide[] }) {
  const [idx, setIdx] = useState(0);
  const last = slides.length - 1;

  const next = useCallback(() => setIdx((i) => Math.min(last, i + 1)), [last]);
  const prev = useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        setIdx(0);
      } else if (e.key === 'End') {
        setIdx(last);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, last]);

  const slide = slides[idx];
  const progress = ((idx + 1) / slides.length) * 100;

  return (
    <section className="deck" aria-label="Pitch deck">
      <div
        className="deck-stage"
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${idx + 1} of ${slides.length}`}
      >
        <div className="deck-progress">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>

        <article className="slide" key={idx}>
          <div className="slide-kicker">
            <span className="num">{String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
            <span className="divider" />
            <span>{slide.kicker}</span>
          </div>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.body && <div className="slide-body">{slide.body}</div>}
        </article>

        <div className="deck-chrome">
          <div className="deck-counter">
            <strong>{idx + 1}</strong> / {slides.length}
          </div>
          <div className="deck-dots" role="tablist" aria-label="Slide navigation">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to slide ${i + 1}`}
                className={i === idx ? 'active' : ''}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
          <div className="deck-controls">
            <button onClick={prev} disabled={idx === 0} aria-label="Previous slide">←</button>
            <button onClick={next} disabled={idx === last} aria-label="Next slide">→</button>
          </div>
        </div>
      </div>

      <p className="deck-hint" aria-hidden="true">
        Use <kbd>←</kbd> <kbd>→</kbd> <kbd>Space</kbd> to navigate
      </p>
    </section>
  );
}
