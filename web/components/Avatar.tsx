'use client';

import type { Friend } from '@/lib/scenarios';

export function Avatar({ friend, size = 46 }: { friend: Friend | { initials: string; hue: number }; size?: number }) {
  const bg = `linear-gradient(135deg, oklch(65% 0.14 ${friend.hue}), oklch(50% 0.16 ${friend.hue}))`;
  return (
    <div
      className="avatar"
      aria-hidden="true"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}
    >
      {friend.initials}
    </div>
  );
}
