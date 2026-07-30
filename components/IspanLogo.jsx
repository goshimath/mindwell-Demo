export default function IspanLogo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { width: 28, height: 28, iconSize: 16, textGap: 6, fontSize: '0.85rem' },
    md: { width: 36, height: 36, iconSize: 20, textGap: 8, fontSize: '1.1rem' },
    lg: { width: 48, height: 48, iconSize: 28, textGap: 10, fontSize: '1.4rem' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: s.textGap }}>
      <svg
        width={s.iconSize}
        height={s.iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Stylized human figure — iSpan brand mark */}
        <circle cx="20" cy="8" r="5" fill="#2B5EA7" />
        <path
          d="M10 18 C10 14 14 12 20 12 C26 12 30 14 30 18 L30 22 C30 22 28 24 26 24 L24 24 L24 32 L16 32 L16 24 L14 24 C12 24 10 22 10 22 Z"
          fill="#2B5EA7"
        />
        {/* Multi-color accent dots */}
        <circle cx="12" cy="28" r="3" fill="#9B8EC4" />
        <circle cx="20" cy="35" r="3" fill="#C4A84D" />
        <circle cx="28" cy="28" r="3" fill="#7CB87A" />
      </svg>
      <span style={{ fontWeight: 900, fontSize: s.fontSize, letterSpacing: '-0.01em' }}>iSpan</span>
    </div>
  );
}
