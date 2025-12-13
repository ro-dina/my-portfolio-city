'use client'
type StreetLightProps = { left: number; top: number; z?: number };

export default function StreetLight({ left, top, z:zIndex}: StreetLightProps) {
  return (
    <div className="absolute" style={{ left, top, pointerEvents: "none"}}>
      {/* 街灯本体 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/furniture/LampTurnOff.svg"
        alt=""
        width={250}
        height={200}
        className="pointer-events-none"
        style={{zIndex}}
      />
      {/* 光（ダーク時のみ表示） */}
      <div
        className="absolute -left-1 -top-0 w-64 h-64 rounded-full hidden dark:block opacity-0 dark:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(255,248,200,.65) 0%, rgba(255,248,200,.18) 40%, transparent 70%)',
          animation: 'lampFlicker 2.2s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 725,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}