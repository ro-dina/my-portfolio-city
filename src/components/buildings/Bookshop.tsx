// src/components/buildings/Bookshop.tsx
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onEnter?: () => void;               // 扉クリック
  onSign?: () => void;                // 看板クリック
  onWindow?: (index: number) => void; // 窓クリック
  ariaLabel?: string;
};

export default function Bookshop({
  className,
  style,
  onEnter,
  onSign,
  onWindow,
  ariaLabel = "Fantasy European Bookshop",
}: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const door = root.querySelector<SVGGElement>('[data-part="door"]');
    const sign = root.querySelector<SVGGElement>('[data-part="sign"]');
    const windows = Array.from(
      root.querySelectorAll<SVGGElement>('[data-part="window"]')
    );

    const onEnterKey = (e: KeyboardEvent) =>
      (e.key === "Enter" || e.key === " ") && onEnter?.();
    const onSignKey = (e: KeyboardEvent) =>
      (e.key === "Enter" || e.key === " ") && onSign?.();

    door?.addEventListener("click", () => onEnter?.());
    door?.setAttribute("role", "button");
    door?.setAttribute("tabindex", "0");
    door?.addEventListener("keydown", onEnterKey);

    sign?.addEventListener("click", () => onSign?.());
    sign?.setAttribute("role", "button");
    sign?.setAttribute("tabindex", "0");
    sign?.addEventListener("keydown", onSignKey);

    windows.forEach((w, i) => {
      const handler = () => onWindow?.(i);
      const key = (e: KeyboardEvent) =>
        (e.key === "Enter" || e.key === " ") && handler();
      w.addEventListener("click", handler);
      w.setAttribute("role", "button");
      w.setAttribute("tabindex", "0");
      w.addEventListener("keydown", key);
    });

    return () => {
      door?.removeEventListener("keydown", onEnterKey);
      sign?.removeEventListener("keydown", onSignKey);
    };
  }, [onEnter, onSign, onWindow]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 512 512"
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      <style>
        {`
        :root{
          --wall:#e7d7b9; --roof:#476a8f; --roof-d:#355574;
          --trim:#c9a36a; --stone:#bfa27a; --door:#6b3e1f;
          --glass:#7ec0d9; --glass-hi:#cfeefb; --sign:#2e2a24; --gold:#efc24e;
          --shadow:rgba(0,0,0,.18);
        }
        .s{stroke:#3b2c1f;stroke-linejoin:round}
        .hit{cursor:pointer;transition:filter .15s ease}
        .hit:hover{filter:brightness(1.08)}
        `}
      </style>

      {/* 影 */}
      <ellipse cx="256" cy="472" rx="140" ry="22" fill="var(--shadow)"/>

      {/* 基礎 */}
      <g className="s" strokeWidth="2">
        <path d="M110 432h292l18-18H92z" fill="var(--stone)"/>
      </g>

      {/* 本体の箱 */}
      <g className="s" strokeWidth="2">
        <rect x="120" y="238" width="272" height="186" rx="8" fill="var(--wall)"/>
        <rect x="120" y="268" width="272" height="12" fill="var(--trim)"/>
        <rect x="120" y="238" width="12" height="186" fill="var(--trim)"/>
        <rect x="380" y="238" width="12" height="186" fill="var(--trim)"/>
      </g>

      {/* 屋根 */}
      <g className="s" strokeWidth="2">
        <path d="M96 238h320l-30-54H126z" fill="var(--roof)"/>
        <rect x="126" y="176" width="260" height="6" fill="var(--roof-d)"/>
      </g>

      {/* 看板（クリック可） */}
      <g className="s" strokeWidth="2" fill="none">
        <path d="M398 266c10 0 18 8 18 18s-8 18-18 18" stroke="var(--trim)"/>
        <line x1="398" y1="266" x2="370" y2="266" stroke="var(--trim)"/>
      </g>
      <g data-part="sign" className="s hit" strokeWidth="2" transform="translate(304,268)">
        <rect x="0" y="0" rx="6" ry="6" width="96" height="30" fill="var(--sign)"/>
        <text x="48" y="20" fontFamily="serif" fontSize="14" fill="var(--gold)" textAnchor="middle" letterSpacing="1.4">LIBRAIRIE</text>
      </g>

      {/* 窓（クリック可） */}
      <g className="s" strokeWidth="2">
        <g data-part="window" className="hit" transform="translate(140,300)">
          <rect x="0" y="0" width="90" height="84" rx="6" fill="var(--trim)"/>
          <rect x="8" y="10" width="74" height="64" rx="4" fill="url(#g)"/>
        </g>
        <g data-part="window" className="hit" transform="translate(282,300)">
          <rect x="0" y="0" width="90" height="84" rx="6" fill="var(--trim)"/>
          <rect x="8" y="10" width="74" height="64" rx="4" fill="url(#g)"/>
        </g>
      </g>

      {/* 扉（クリック可） */}
      <g data-part="door" className="s hit" strokeWidth="2" transform="translate(228,306)">
        <path d="M0 54v-22c0-22 18-40 40-40s40 18 40 40v22z" fill="var(--trim)"/>
        <path d="M10 54v-20c0-17 13-30 30-30s30 13 30 30v20z" fill="var(--door)"/>
        <circle cx="64" cy="40" r="3.5" fill="var(--gold)"/>
      </g>

      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--glass-hi)"/>
          <stop offset="1" stopColor="var(--glass)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}