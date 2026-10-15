export function BeamMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id="beam-mark-a"
          x1="4"
          y1="3"
          x2="36"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B7CFF" />
          <stop offset="0.55" stopColor="#6D5DFB" />
          <stop offset="1" stopColor="#4632D8" />
        </linearGradient>
        <linearGradient
          id="beam-mark-b"
          x1="39"
          y1="9"
          x2="14"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FE6F8" />
          <stop offset="1" stopColor="#12B4D4" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12.5"
        fill="url(#beam-mark-a)"
      />
      <path
        d="M39 10.5V27a12.5 12.5 0 0 1-12.5 12.5H10.5Z"
        fill="url(#beam-mark-b)"
        opacity="0.96"
      />
      <path
        d="M39 10.5 10.5 39.5"
        stroke="rgba(255,255,255,.85)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 26.5 19.5 21l4 4L30 18"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity=".92"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <BeamMark className="h-8 w-8" />
      <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em] text-ink">
        Beam
      </span>
    </span>
  );
}
