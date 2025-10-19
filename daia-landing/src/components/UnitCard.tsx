import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Small Brand components duplicated here for independence from page.tsx
export function BrandDAIA({ className }: { className?: string }) {
  return (
    <span aria-label="DAIA" className={className}>
      <span className="text-[#6C4CE5]">D</span>
      <span className="text-[#06B6D4]">A</span>
      <span className="text-[#F59E0B]">I</span>
      <span className="text-[#10B981]">A</span>
    </span>
  );
}

export function BrandText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/DAIA/g);
  const out: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) out.push(<span key={`t-${i}`}>{part}</span>);
    if (i < parts.length - 1) out.push(<BrandDAIA key={`b-${i}`} />);
  });
  return <span className={className}>{out}</span>;
}

export default function UnitCard({
  title,
  desc,
  status,
  accent,
  activeLabel,
  soonLabel,
  packages,
}: {
  title: string;
  desc: string;
  status: 'active' | 'soon';
  accent: string;
  activeLabel: string;
  soonLabel: string;
  packages?: Array<{ id: string; name: string; price: string }>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl border bg-white p-6 shadow-sm relative overflow-hidden transform transition-all ${
        expanded ? 'scale-101 shadow-lg' : ''
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setExpanded((s) => !s)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setExpanded((s) => !s);
      }}
    >
      <div className="absolute -right-10 -top-10 size-24 rounded-full opacity-10" style={{ background: accent }} />

      {/* hover preview push style */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none transition-transform duration-200 ${
          hover && !expanded ? 'translate-y-[-6px]' : 'translate-y-0'
        }`}
        style={{ transformOrigin: 'center top' }}
      >
        <div className="h-full w-full" />
      </div>

      <h3 className="font-bold text-lg">
        <BrandText text={title} />
      </h3>
      <p className="mt-2 text-sm text-neutral-700">{desc}</p>
      <div className="mt-4 flex items-center gap-2">
        {status === 'active' ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: accent, color: 'white' }}>
            {activeLabel}
          </span>
        ) : (
          <span className="text-xs font-semibold px-2 py-1 rounded-full border">{soonLabel}</span>
        )}
      </div>

      {/* reveal packages when expanded */}
      {expanded && packages && packages.length > 0 && (
        <div className="mt-4 border-t pt-4 space-y-3">
          {packages.map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-neutral-600">{p.id}</div>
              </div>
              <div className="text-sm font-semibold">{p.price}</div>
            </div>
          ))}
        </div>
      )}
      {!expanded && packages && packages.length > 0 && <div className="mt-3 text-xs text-neutral-500">Hover or click to see packages</div>}
    </motion.div>
  );
}
