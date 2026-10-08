const PALETTES = [
  ["#2f80ed", "#56ccf2"],
  ["#182b49", "#4da3ff"],
  ["#f2994a", "#f2c94c"],
  ["#6a11cb", "#2575fc"],
  ["#11998e", "#38ef7d"],
  ["#eb5757", "#f2994a"],
];

function Train({ body = "#fff", accent = "#182b49" }) {
  const car = (x) => (
    <g key={x} transform={`translate(${x},0)`}>
      <rect width="88" height="34" rx="6" fill={body} />
      {[6, 27, 48, 69].map((wx) => (
        <rect key={wx} x={wx} y="8" width="12" height="11" rx="2" fill={accent} opacity=".85" />
      ))}
      <rect y="26" width="88" height="4" fill={accent} opacity=".5" />
      <circle cx="18" cy="36" r="5" fill="#222" />
      <circle cx="70" cy="36" r="5" fill="#222" />
    </g>
  );

  return (
    <g>
      {car(0)}
      {car(92)}
      <g transform="translate(184,0)">
        <path d="M0 0 H70 Q96 0 104 20 L108 34 H0 Z" fill={body} />
        <path d="M60 8 H74 Q86 8 90 20 H60 Z" fill={accent} opacity=".85" />
        <rect y="26" width="108" height="4" fill={accent} opacity=".5" />
        <circle cx="18" cy="36" r="5" fill="#222" />
        <circle cx="82" cy="36" r="5" fill="#222" />
      </g>
    </g>
  );
}

// Large scene for the home page hero
export function TrainScene() {
  return (
    <svg className="hero-art" viewBox="0 0 800 200" role="img" aria-label="Train travelling through hills">
      <circle cx="680" cy="60" r="28" fill="#fff" opacity=".25" />
      <path d="M0 150 Q120 70 250 140 T520 130 T800 120 V200 H0 Z" fill="#fff" opacity=".12" />
      <path d="M0 170 Q160 110 320 160 T640 150 T800 160 V200 H0 Z" fill="#fff" opacity=".18" />
      <rect x="0" y="172" width="800" height="4" fill="#fff" opacity=".6" />
      <g transform="translate(250,130)">
        <Train />
      </g>
    </svg>
  );
}

// Small banner for route cards and the booking preview
export function CardBanner({ seed = 0 }) {
  const [c1, c2] = PALETTES[Math.abs(seed) % PALETTES.length];
  return (
    <div
      className="card-banner"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="335" cy="32" r="16" fill="#fff" opacity=".35" />
        <path d="M0 95 Q90 45 190 90 T400 80 V130 H0 Z" fill="#fff" opacity=".18" />
        <path d="M0 110 Q110 75 220 108 T400 105 V130 H0 Z" fill="#fff" opacity=".22" />
        <rect y="100" width="400" height="3" fill="#fff" opacity=".7" />
        <g transform="translate(120,62) scale(.5)">
          <Train />
        </g>
      </svg>
    </div>
  );
}
