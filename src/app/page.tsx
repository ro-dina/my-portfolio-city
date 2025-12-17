'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import StreetLight from '@/components/props/StreetLight'

export default function Home() {
  const router = useRouter()
  const MAP_W = 1200
  const MAP_H = 4200

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      // 画面幅に合わせて地図(1200px)を縮小。ヘッダは固定なのでスケールしない。
      const padding = 24 * 2 // px-6 想定の左右余白ぶん
      const avail = Math.max(320, window.innerWidth - padding)
      setScale(Math.min(1, avail / MAP_W))
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="w-full max-w-7xl mx-auto py-10 px-6">
        {/* === 背景（HTML/CSS）：SVGの<image>埋め込みで黒くなる問題を回避 === */}
        {/* モバイルでは 1200px の地図を縮小して表示（ピンチズーム不要・ヘッダは縮小しない） */}
        <div
          className="mx-auto"
          style={{
            width: '100%',
            height: MAP_H * scale,
          }}
        >
          <div
            className="relative rounded-xl shadow mx-auto overflow-hidden bg-white dark:bg-slate-950"
            style={{
              width: MAP_W,
              height: MAP_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
          {/* 石畳 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ground/stone_1200x1000_1234.svg"
            alt=""
            width={1200}
            height={1200}
            style={{ position: "absolute", left: 0, top: 0 }}
            loading="eager"
            decoding="sync"
          />

          {/* 石畳 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ground/stone_1200x1000_1234.svg"
            alt=""
            width={1200}
            height={1200}
            style={{ position: "absolute", left: 0, top: 990 }}
            loading="eager"
            decoding="sync"
          />

          {/* アスファルト */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ground/asphalt_1200x1000_1234.svg"
            alt=""
            width={1200}
            height={800}
            style={{ position: "absolute", left: 0, top: "2400px"}}
            loading="eager"
            decoding="sync"
          />

          {/* アスファルト */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ground/asphalt_1200x1000_1234.svg"
            alt=""
            width={1200}
            height={800}
            style={{ position: "absolute", left: 0, top: "3390px"}}
            loading="eager"
            decoding="sync"
          />

          {/* 夜用の暗幕（darkのみ表示） */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-60 transition-opacity"
            style={{ background: '#0b1020', mixBlendMode: 'multiply', zIndex: 50, pointerEvents: "none"}}
          />

          {/* 本屋 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/bookstore.svg"
            alt="本屋"
            width={336}
            height={336}
            style={{ position: "absolute", left: 25, top: 550, zIndex:19, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/books')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/books') }}
            className="absolute"
            style={{ left: 80, top: 590, width: 245, height: 420, cursor: 'pointer', zIndex: 20 }}
            aria-label="本屋へ"
          />

          {/* 映画館 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/cinema.svg"
            alt="映画館"
            width={280}
            height={290}
            style={{ position: "absolute", left: 325, top: 575, zIndex: 19, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/cinema')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/cinema') }}
            className="absolute"
            style={{ left: 360, top: 590, width: 255, height: 420, cursor: 'pointer', zIndex: 20 }}
            aria-label="映画館へ"
          />

          {/* 革細工屋 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/leather.svg"
            alt="革細工屋"
            width={300}
            height={290}
            style={{ position: "absolute", left: 850, top: 595, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/leather')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/leather') }}
            className="absolute"
            style={{ left: 880, top: 590, width: 240, height: 420, cursor: 'pointer', zIndex: 20 }}
            aria-label="革細工屋へ"
          />

          {/* 学校（見た目） */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/school.svg"
            alt="学校"
            width={800}
            height={800}
            style={{ position: "absolute", left: 0, top: 50, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          {/* 学校（クリック範囲） */}
          <div
            onClick={() => router.push('/school')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/school') }}
            className="absolute"
            style={{ left: 0, top: 270, width: 800, height: 230, cursor: 'pointer', zIndex: 20 }}
            aria-label="学校へ"
          />

          {/* 川（クリップ区域で横はみ出し防止） */}
          <div
            className="absolute"
            style={{
              left: 0,          // 地図の左端から
              top: 1850,        // 現在の川のY位置に合わせる
              width: 1200,      // 地図の横幅にクリップ
              height: 1200,      // 川の高さ
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {/* 1枚目 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ground/river.svg"
              alt="川"
              width={800}
              height={400}
              style={{ position: 'absolute', left: -250, top: 0, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
            />
            {/* 2枚目 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ground/river.svg"
              alt="川"
              width={800}
              height={400}
              style={{ position: 'absolute', left: 490, top: 7, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
            />
          </div>

          {/* 教会 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/church.svg"
            alt="教会"
            width={400}
            height={290}
            style={{ position: "absolute", left: 700, top: 950, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/church')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/church') }}
            className="absolute"
            style={{ left: 750, top: 1200, width: 310, height: 300, cursor: 'pointer', zIndex: 20 }}
            aria-label="教会へ"
          />

          {/* 3dプリント */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/3dprint.svg"
            alt="3Dプリント"
            width={300}
            height={290}
            style={{ position: "absolute", left: 635, top: 3000, zIndex:20, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/print')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/print') }}
            className="absolute"
            // top, left, width, height can be fine-tuned as needed
            style={{ left: 680, top: 3070, width: 210, height: 310, cursor: 'pointer', zIndex: 20 }}
            aria-label="3dプリントへ"
          />

          {/* プログラミング */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/coding.svg"
            alt="プログラミング"
            width={300}
            height={290}
            style={{ position: "absolute", left: 180, top: 2600, zIndex:20, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/coding')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/coding') }}
            className="absolute"
            // top, left, width, height can be fine-tuned as needed
            style={{ left: 230, top: 2615, width: 210, height: 405, cursor: 'pointer', zIndex: 20 }}
            aria-label="プログラミングへ"
          />

          {/* 半田付け */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/soldering.svg"
            alt="半田付け"
            width={300}
            height={290}
            style={{ position: "absolute", left: 910, top: 2595, zIndex:20, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/soldering')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/soldering') }}
            className="absolute"
            // top, left, width, height can be fine-tuned as needed
            style={{ left: 970, top: 2615, width: 210, height: 405, cursor: 'pointer', zIndex: 20 }}
            aria-label="半田付けへ"
          />

          {/* マイコン */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/microcomputer.svg"
            alt="マイコン"
            width={300}
            height={290}
            style={{ position: "absolute", left: 660, top: 2590, zIndex:20, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />
          <div
            onClick={() => router.push('/microcomputer')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/microcomputer') }}
            className="absolute"
            // top, left, width, height can be fine-tuned as needed
            style={{ left: 680, top: 2640, width: 260, height: 380, cursor: 'pointer', zIndex: 20 }}
            aria-label="マイコンへ"
          />

          {/* 橋 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buildings/bridge.svg"
            alt="橋"
            width={700}
            height={420}
            style={{ position: "absolute", left: 190, top: 1815, zIndex: 10, pointerEvents: "none", filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))" }}
          />

          {/* 街灯（ダークモードで点灯） */}
          <StreetLight left={-85} top={680}  />
          <StreetLight left={200} top={680} z={30} />
          <StreetLight left={560} top={680}  />
        </div>
        </div>
      </div>
    </div>
  )
}


{/**
  デバッグコマンド(webのコンソールに貼る)
  
  // クリック範囲（role=button の絶対配置div）に色を付ける
window.__hotspots = Array.from(document.querySelectorAll('div[role="button"].absolute'));
window.__hotspots.forEach(el => {
  el.style.background = 'rgba(8, 145, 178, 0.25)';  // シアン系半透明
  el.style.outline = '2px dashed #0891b2';
  el.style.zIndex = 9999; // 前面に
});
  */}