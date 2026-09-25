/**
 * Static illustration that mirrors the 3D scene's composition. Used on phones,
 * when WebGL is unavailable, and as the poster while the 3D scene loads.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 520" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hf-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8eef7" />
        </linearGradient>
        <linearGradient id="hf-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56615a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#262e28" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hf-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a9a1a" />
          <stop offset="1" stopColor="#1d5505" />
        </linearGradient>
        <linearGradient id="hf-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a9a1a" />
          <stop offset="1" stopColor="#1d5505" />
        </linearGradient>
        <radialGradient id="hf-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8cc861" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8cc861" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hf-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="hf-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <circle cx="290" cy="250" r="230" fill="url(#hf-glow)" />
      <ellipse cx="290" cy="486" rx="170" ry="18" fill="url(#hf-shadow)" />

      {/* connection lines */}
      <g stroke="#a6d67f" strokeOpacity="0.45" strokeWidth="1.5" fill="none">
        <path d="M388 150 C 430 130, 450 110, 480 96" />
        <path d="M392 250 C 440 250, 460 262, 492 270" />
        <path d="M190 330 C 140 350, 110 360, 76 372" />
      </g>

      {/* credit cards — the debt Greenlight helps with */}
      <g transform="translate(70 70) rotate(14)">
        <rect width="170" height="107" rx="12" fill="#3a433c" />
        <rect x="18" y="38" width="26" height="20" rx="4" fill="#e6cf7e" />
      </g>
      <g transform="translate(88 96) rotate(10)">
        <rect width="170" height="107" rx="12" fill="url(#hf-card)" />
        <rect x="18" y="38" width="26" height="20" rx="4" fill="#f0dc92" />
        <g fill="#ffffff" fillOpacity="0.85">
          <circle cx="24" cy="80" r="3" /><circle cx="33" cy="80" r="3" /><circle cx="42" cy="80" r="3" />
          <circle cx="64" cy="80" r="3" /><circle cx="73" cy="80" r="3" /><circle cx="82" cy="80" r="3" />
        </g>
      </g>

      {/* layered documents */}
      <rect x="226" y="52" width="210" height="280" rx="12" transform="rotate(9 331 192)" fill="url(#hf-back)" opacity="0.55" />
      <rect x="205" y="60" width="210" height="280" rx="12" transform="rotate(4 310 200)" fill="url(#hf-back)" opacity="0.8" />

      {/* main document */}
      <g filter="url(#hf-soft)" transform="rotate(-4 290 250)">
        <rect x="178" y="84" width="224" height="300" rx="12" fill="url(#hf-paper)" />
        <rect x="200" y="108" width="92" height="12" rx="4" fill="#378108" />
        <rect x="200" y="130" width="140" height="8" rx="4" fill="#9aa9bf" />
        <g fill="#c6d1e0">
          <rect x="200" y="166" width="70" height="8" rx="4" />
          <rect x="300" y="166" width="80" height="8" rx="4" />
          <rect x="200" y="190" width="60" height="8" rx="4" />
          <rect x="300" y="190" width="80" height="8" rx="4" />
        </g>
        <rect x="192" y="208" width="196" height="30" rx="7" fill="#eef6e7" stroke="#8cc861" strokeWidth="1.5" />
        <rect x="204" y="219" width="64" height="8" rx="4" fill="#1f2620" />
        <rect x="316" y="219" width="60" height="8" rx="4" fill="#1f2620" />
        <g fill="#c6d1e0">
          <rect x="200" y="256" width="72" height="8" rx="4" />
          <rect x="300" y="256" width="80" height="8" rx="4" />
          <rect x="200" y="280" width="54" height="8" rx="4" />
          <rect x="300" y="280" width="80" height="8" rx="4" />
          <rect x="200" y="320" width="180" height="6" rx="3" />
          <rect x="200" y="336" width="150" height="6" rx="3" />
        </g>
      </g>

      {/* magnifying glass */}
      <g transform="translate(150 150) rotate(-18)">
        <circle cx="0" cy="0" r="44" fill="#eef6e7" fillOpacity="0.18" stroke="#d6e4f5" strokeWidth="9" />
        <circle cx="0" cy="0" r="44" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="-7" y="48" width="14" height="70" rx="7" fill="#2c352e" />
      </g>

      {/* metadata chips */}
      <g>
        <rect x="440" y="70" width="112" height="46" rx="10" fill="#1f2620" stroke="#a6d67f" strokeOpacity="0.4" />
        <circle cx="462" cy="93" r="9" fill="#8cc861" />
        <path d="m457.5 93 3 3 5-5.5" stroke="#151a16" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="478" y="88" width="58" height="10" rx="5" fill="#b9c6da" />

        <rect x="454" y="248" width="100" height="46" rx="10" fill="#1f2620" stroke="#a6d67f" strokeOpacity="0.4" />
        <circle cx="476" cy="271" r="9" fill="#8cc861" />
        <path d="m471.5 271 3 3 5-5.5" stroke="#151a16" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="492" y="266" width="46" height="10" rx="5" fill="#b9c6da" />

        <rect x="10" y="352" width="104" height="46" rx="10" fill="#1f2620" stroke="#a6d67f" strokeOpacity="0.4" />
        <circle cx="32" cy="375" r="9" fill="#8cc861" />
        <path d="m27.5 375 3 3 5-5.5" stroke="#151a16" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="48" y="370" width="50" height="10" rx="5" fill="#b9c6da" />
      </g>

      {/* shield */}
      <g transform="translate(372 330)">
        <path d="M44 0 88 16v34c0 30-19 52-44 62C19 102 0 80 0 50V16z" fill="url(#hf-shield)" stroke="#d9ecc8" strokeOpacity="0.6" strokeWidth="2" />
        <path d="m28 54 12 12 22-24" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

    </svg>
  );
}
