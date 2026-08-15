interface LogoProps {
  size?: "sm" | "md" | "lg"
  /** "light" inverts the colour for dark backgrounds. */
  tone?: "default" | "light"
}

const COLORS = {
  default: "#421D36",
  light: "#F6E7F3",
}

/**
 * ToolCan wordmark — SVG (text-based, not an image).
 * Single 600×200 viewBox so the same source scales from navbar to footer.
 * `direction: ltr` + `unicode-bidi: isolate` keep the mark from flipping
 * to "NACLOOT" under the page's RTL flow.
 */
export function Logo({ size = "md", tone = "default" }: LogoProps) {
  const color = COLORS[tone]
  const width = size === "sm" ? 120 : size === "lg" ? 240 : 168

  return (
    <span
      aria-label="ToolCan"
      style={{
        direction: "ltr",
        unicodeBidi: "isolate",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 600 200"
        width={width}
        height={width / 3}
        role="img"
        aria-hidden="true"
      >
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Playfair Display', 'Bodoni 72', 'Didot', 'Georgia', serif"
          fontSize="78"
          fontWeight="500"
          fontStyle="normal"
          letterSpacing="2"
          fill={color}
        >
          TOOLCAN
        </text>
        <path
          d="M 175 55 C 215 30, 260 22, 300 30 C 340 38, 375 50, 420 56"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 420 56 L 432 50 L 426 60"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}