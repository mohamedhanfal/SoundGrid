const PALETTES = {
  calm: {
    bg1: '#e3ecff',
    bg2: '#d9e3ff',
    blob1: '#4f86f7',
    blob2: '#8b6eff',
    arch1: '#3b82f6',
    arch2: '#7c5dfa',
    pad: '#2e3856'
  },
  indigo: {
    bg1: '#dfe7ff',
    bg2: '#ede2ff',
    blob1: '#4361ee',
    blob2: '#7209b7',
    arch1: '#4361ee',
    arch2: '#560bad',
    pad: '#1e293b'
  },
  teal: {
    bg1: '#def7f4',
    bg2: '#e0f2fe',
    blob1: '#0d9488',
    blob2: '#3b82f6',
    arch1: '#0f766e',
    arch2: '#2563eb',
    pad: '#1e293b'
  },
  purple: {
    bg1: '#f1e6ff',
    bg2: '#e2ebff',
    blob1: '#7c3aed',
    blob2: '#ec4899',
    arch1: '#6d28d9',
    arch2: '#db2777',
    pad: '#2e1065'
  },
  blue: {
    bg1: '#dceeff',
    bg2: '#e8efff',
    blob1: '#1d72e8',
    blob2: '#6366f1',
    arch1: '#1a73e8',
    arch2: '#4f46e5',
    pad: '#1e3a8a'
  }
};

export function renderPlaylistCoverSVG(variant = 'calm') {
  const palette = PALETTES[variant] || PALETTES.calm;
  // Unique gradient IDs prevent SVG fill collisions when multiple cards render on the same view
  const uid = `${variant}-${Math.random().toString(36).slice(2, 7)}`;

  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg1}" />
          <stop offset="100%" stop-color="${palette.bg2}" />
        </linearGradient>
        <linearGradient id="blobA-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.blob1}" />
          <stop offset="100%" stop-color="${palette.blob2}" />
        </linearGradient>
        <linearGradient id="headband-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.arch1}" />
          <stop offset="100%" stop-color="${palette.arch2}" />
        </linearGradient>
      </defs>

      <rect width="200" height="200" rx="22" fill="url(#bg-${uid})" />

      <path d="M120,0 C142,24 168,18 200,48 L200,0 Z" fill="url(#blobA-${uid})" opacity="0.88" />
      <path d="M140,0 C155,36 182,42 200,82 L200,0 Z" fill="url(#blobA-${uid})" opacity="0.45" />

      <path d="M0,128 C38,125 56,158 92,175 C115,186 112,200 112,200 L0,200 Z" fill="url(#blobA-${uid})" opacity="0.85" />
      <path d="M0,152 C28,150 48,176 76,200 L0,200 Z" fill="${palette.blob2}" opacity="0.55" />

      <g transform="translate(26, 26)" fill="${palette.arch1}">
        <path d="M16,4 L34,0 L34,9 L20,12 L20,31 C20,36 15,40 9,40 C4,40 0,36 0,32 C0,27 4,24 10,24 C12,24 14,24.5 16,25.5 Z" />
      </g>

      <circle cx="52" cy="24" r="3" fill="#93bbf5" />
      <circle cx="32" cy="96" r="3.5" fill="#a5b4fc" />
      <path d="M168,112 L171,119 L178,122 L171,125 L168,132 L165,125 L158,122 L165,119 Z" fill="${palette.arch2}" opacity="0.75" />

      <g transform="translate(46, 46)">
        <path d="M14,62 C14,26 32,8 54,8 C76,8 94,26 94,62" fill="none" stroke="url(#headband-${uid})" stroke-width="13" stroke-linecap="round" />
        <path d="M24,42 C32,22 42,16 54,16 C66,16 76,22 84,42" fill="none" stroke="#93c5fd" stroke-width="4" stroke-linecap="round" opacity="0.7" />

        <rect x="4" y="52" width="24" height="44" rx="12" fill="url(#headband-${uid})" />
        <rect x="18" y="55" width="12" height="38" rx="6" fill="${palette.pad}" />

        <rect x="80" y="52" width="24" height="44" rx="12" fill="url(#headband-${uid})" />
        <rect x="78" y="55" width="12" height="38" rx="6" fill="${palette.pad}" />
      </g>

      <g transform="translate(136, 138)">
        <circle cx="22" cy="22" r="21" fill="url(#headband-${uid})" />
        <polygon points="18,14 18,30 31,22" fill="#ffffff" />
      </g>
    </svg>
  `;
}

export function renderAlbumThumbSVG(variant = 'midnight') {
  if (variant === 'midnight') {
    return `
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#18181b" />
        <rect x="4" y="6" width="12" height="36" rx="2" fill="#52525b" />
        <rect x="18" y="8" width="12" height="34" rx="2" fill="#71717a" />
        <rect x="33" y="5" width="12" height="37" rx="2" fill="#a1a1aa" />
        <rect x="47" y="9" width="13" height="33" rx="2" fill="#52525b" />
        <circle cx="10" cy="14" r="4" fill="#e4e4e7" />
        <circle cx="24" cy="15" r="4" fill="#d4d4d8" />
        <circle cx="39" cy="13" r="4" fill="#f4f4f5" />
        <circle cx="53" cy="16" r="4" fill="#d4d4d8" />
        <rect x="0" y="43" width="64" height="21" fill="#09090b" />
        <text x="32" y="52" text-anchor="middle" fill="#f4f4f5" font-size="6.5" font-weight="800" font-family="Inter, sans-serif" letter-spacing="0.4">MIDNIGHT</text>
        <text x="32" y="60" text-anchor="middle" fill="#ef4444" font-size="6" font-weight="800" font-family="Inter, sans-serif" letter-spacing="0.4">MEMORIES</text>
      </svg>
    `;
  }
  return renderPlaylistCoverSVG(variant);
}
