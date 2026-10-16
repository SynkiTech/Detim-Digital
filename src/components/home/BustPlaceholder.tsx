/**
 * Stylised placeholder bust (Master Prompt §5.2): a 3D-style SVG stand-in
 * used until the real avatar asset (`/public/avatar/detim-avatar.png`)
 * arrives. Swapping the file is the only step needed later.
 * Duotone orange/black shading with rim light, head and shoulders.
 */
export function BustPlaceholder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      role="img"
      aria-label="Stylised 3D portrait placeholder of Oluwadetimi Ajayi"
      className={className}
    >
      <defs>
        <radialGradient id="bustBg" cx="50%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#241408" />
          <stop offset="55%" stopColor="#120A04" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </radialGradient>
        <linearGradient id="bustSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3D2415" />
          <stop offset="45%" stopColor="#2B1810" />
          <stop offset="100%" stopColor="#1A0F09" />
        </linearGradient>
        <linearGradient id="bustRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF5A1F" />
          <stop offset="100%" stopColor="#F25C05" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="bustShoulders" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C1210" />
          <stop offset="100%" stopColor="#0D0908" />
        </linearGradient>
        <radialGradient id="bustGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#F25C05" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#F25C05" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F25C05" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* backdrop disc */}
      <rect width="400" height="480" rx="32" fill="url(#bustBg)" />
      <rect width="400" height="480" rx="32" fill="url(#bustGlow)" />

      {/* soft halo behind head */}
      <ellipse cx="200" cy="170" rx="120" ry="128" fill="#F25C05" opacity="0.14" />

      {/* shoulders / blazer */}
      <path
        d="M62 480c8-88 62-128 138-128s130 40 138 128H62Z"
        fill="url(#bustShoulders)"
      />
      {/* shirt v */}
      <path d="M170 352h60l-30 62-30-62Z" fill="#F5F4F2" opacity="0.92" />
      {/* blazer lapels */}
      <path d="M170 352l30 62-52-24 8-44 14 6Z" fill="#151012" />
      <path d="M230 352l-30 62 52-24-8-44-14 6Z" fill="#151012" />

      {/* neck */}
      <path d="M178 300h44v52c0 16-10 26-22 26s-22-10-22-26v-52Z" fill="url(#bustSkin)" />
      <path d="M178 306c12 10 32 10 44 0v-6h-44v6Z" fill="#120A06" opacity="0.6" />

      {/* head */}
      <ellipse cx="200" cy="212" rx="74" ry="86" fill="url(#bustSkin)" />
      {/* jaw taper */}
      <path
        d="M126 210c0 52 32 96 74 96s74-44 74-96c0 30-10 78-74 78s-74-48-74-78Z"
        fill="#241309"
        opacity="0.35"
      />

      {/* hair — voluminous top with orange sheen */}
      <path
        d="M124 196c-6-64 34-108 76-108s82 44 76 108c-4-12-14-22-24-26 2-18-8-30-20-34-20-8-46-8-64 0-12 4-22 16-20 34-10 4-20 14-24 26Z"
        fill="#0E0806"
      />
      <path
        d="M128 190c2-48 30-84 72-84 30 0 54 18 66 44-16-22-40-32-66-30-34 2-60 26-72 70Z"
        fill="url(#bustRim)"
        opacity="0.85"
      />

      {/* facial features — minimal, elegant */}
      <ellipse cx="172" cy="212" rx="7" ry="8" fill="#0C0705" />
      <ellipse cx="228" cy="212" rx="7" ry="8" fill="#0C0705" />
      <circle cx="174.5" cy="209" r="2.2" fill="#FFD9C2" opacity="0.9" />
      <circle cx="230.5" cy="209" r="2.2" fill="#FFD9C2" opacity="0.9" />
      <path
        d="M186 196c4-4 12-4 16 0"
        stroke="#0C0705"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M198 214c0 6-2 10-6 12 3 3 9 3 12 0"
        stroke="#120A06"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M184 252c10 6 22 6 32 0"
        stroke="#3B1E10"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* earrings */}
      <circle cx="126" cy="238" r="5" fill="#F25C05" />
      <circle cx="274" cy="238" r="5" fill="#F25C05" />

      {/* orange rim light on the left of the figure */}
      <path
        d="M124 196c-6-64 34-108 76-108 12 0 24 3 34 9-20-2-44 2-60 16-18 14-28 42-28 74 0 34 10 64 28 84-30-14-44-42-50-75Z"
        fill="#FF5A1F"
        opacity="0.35"
      />
      <path
        d="M64 476c10-74 54-112 112-122-52 18-84 60-92 122H64Z"
        fill="#FF5A1F"
        opacity="0.22"
      />

      {/* bottom fade into ground shadow */}
      <rect y="420" width="400" height="60" fill="url(#bustBg)" opacity="0.9" />
    </svg>
  );
}
