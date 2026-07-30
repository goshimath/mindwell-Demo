export default function StudentCharacter({ className = '' }) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <ellipse cx="100" cy="180" rx="50" ry="30" fill="#2B5EA7" opacity="0.15" />
      {/* Legs */}
      <rect x="80" y="155" width="14" height="40" rx="7" fill="#FFB74D" />
      <rect x="106" y="155" width="14" height="40" rx="7" fill="#FFB74D" />
      {/* Shoes */}
      <ellipse cx="87" cy="195" rx="10" ry="6" fill="#2B5EA7" />
      <ellipse cx="113" cy="195" rx="10" ry="6" fill="#2B5EA7" />
      {/* Torso */}
      <rect x="72" y="100" width="56" height="60" rx="12" fill="#2B5EA7" />
      {/* Arms */}
      <rect x="52" y="105" width="22" height="12" rx="6" fill="#FFB74D" transform="rotate(-15 62 111)" />
      <rect x="126" y="105" width="22" height="12" rx="6" fill="#FFB74D" transform="rotate(15 138 111)" />
      {/* Head */}
      <circle cx="100" cy="72" r="32" fill="#FFB74D" />
      {/* Hair */}
      <path d="M68 65 Q70 40 100 38 Q130 40 132 65 Q132 55 100 52 Q68 55 68 65Z" fill="#4A3728" />
      {/* Eyes */}
      <circle cx="88" cy="72" r="4" fill="#1a2332" />
      <circle cx="112" cy="72" r="4" fill="#1a2332" />
      <circle cx="89" cy="71" r="1.5" fill="white" />
      <circle cx="113" cy="71" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M90 82 Q100 90 110 82" stroke="#1a2332" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="80" cy="80" r="5" fill="#FF8A80" opacity="0.4" />
      <circle cx="120" cy="80" r="5" fill="#FF8A80" opacity="0.4" />
      {/* Book in hand */}
      <rect x="40" y="118" width="24" height="18" rx="3" fill="#7CB87A" transform="rotate(-10 52 127)" />
      <rect x="42" y="120" width="20" height="14" rx="2" fill="#A8D8A0" transform="rotate(-10 52 127)" />
      {/* Floating elements around character */}
      <circle cx="45" cy="50" r="4" fill="#9B8EC4" opacity="0.5">
        <animate attributeName="cy" values="50;44;50" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="155" cy="60" r="3" fill="#7CB87A" opacity="0.5">
        <animate attributeName="cy" values="60;54;60" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="130" r="2.5" fill="#C4A84D" opacity="0.4">
        <animate attributeName="cy" values="130;124;130" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="140" r="3.5" fill="#2B5EA7" opacity="0.4">
        <animate attributeName="cy" values="140;134;140" dur="2.8s" repeatCount="indefinite" />
      </circle>
      {/* Star */}
      <path d="M160 40 l3 7 7 1 -5 5 1 7 -6-3 -6 3 1-7 -5-5 7-1z" fill="#FFD54F" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
