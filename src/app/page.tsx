'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import StreetLight from '@/components/props/StreetLight'
import { useI18n } from '@/components/common/LanguageProvider'
import { useHomeMode } from '@/components/common/HomeModeProvider'

type Destination = {
  href: string
  title: string
  description: string
  image: string
}

const DESTINATIONS: Destination[] = [
  { href: '/school', title: '学校', description: '制作の流れ・制作記事', image: '/images/buildings/school.svg' },
  { href: '/coding', title: 'プログラミング', description: 'アプリ・Web開発の制作物', image: '/images/buildings/coding.svg' },
  { href: '/travel', title: '旅行', description: '旅行', image: '/images/buildings/travel.svg' },
  { href: '/soldering', title: '半田付け', description: '電子工作・基板の制作', image: '/images/buildings/soldering.svg' },
  { href: '/print', title: '3Dプリント', description: '造形・試作プロジェクト', image: '/images/buildings/3dprint.svg' },
  { href: '/books', title: '本屋', description: '読書・学習メモ', image: '/images/buildings/bookstore.svg' },
  { href: '/cinema', title: '映画館', description: '映画・映像', image: '/images/buildings/cinema.svg' },
  { href: '/leather', title: '革細工', description: 'レザークラフト作品', image: '/images/buildings/leather.svg' },
  { href: '/church', title: '教会', description: '宗教施設訪問等', image: '/images/buildings/church.svg' },
]

function StandardHome() {
  const { locale } = useI18n()

  const lead =
    locale === 'en'
      ? 'Choose a place and jump directly to its page.'
      : locale === 'ru'
        ? 'Выберите место и сразу перейдите на нужную страницу.'
        : '行きたい場所を選ぶだけで、各ページにすぐ移動できます。'

  const tip =
    locale === 'en'
      ? 'You can switch to the city map from Menu > Top view.'
      : locale === 'ru'
        ? 'Карту города можно включить через Меню > Вид главной.'
        : '街マップ表示は「メニュー > トップ表示」で切り替えできます。'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Portfolio City</h1>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{lead}</p>
          <p className="mt-3 inline-flex rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {tip}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative h-36 bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-800 dark:to-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute bottom-0 right-2 h-32 w-32 object-contain drop-shadow"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
                  <span className="text-sm text-sky-700 transition group-hover:translate-x-0.5 dark:text-sky-300">→</span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function CityMapHome() {
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
    <div className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto py-10 px-6">
        {/* === 背景（HTML/CSS）：SVGの<image>埋め込みで黒くなる問題を回避 === */}
        {/* モバイルでは 1200px の地図を縮小して表示（ピンチズーム不要・ヘッダは縮小しない） */}
        <div
          className="relative mx-auto"
          style={{
            width: '100%',
            height: MAP_H * scale,
          }}
        >
          {/* transform はレイアウト幅(1200px)を縮めないので、absolute + translate で中央寄せして余白ズレを防ぐ */}
          <div
            className="absolute left-1/2 top-0"
            style={{
              width: MAP_W,
              height: MAP_H,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            <div
              className="relative rounded-xl shadow overflow-hidden bg-white dark:bg-slate-950"
              style={{
                width: MAP_W,
                height: MAP_H,
              }}
            >
              {/* 石畳 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ground/stone_1200x1000_1234.svg"
                alt=""
                width={1200}
                height={1200}
                style={{ position: 'absolute', left: 0, top: 0 }}
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
                style={{ position: 'absolute', left: 0, top: 990 }}
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
                style={{ position: 'absolute', left: 0, top: '2400px' }}
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
                style={{ position: 'absolute', left: 0, top: '3390px' }}
                loading="eager"
                decoding="sync"
              />

              {/* 夜用の暗幕（darkのみ表示） */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-60 transition-opacity"
                style={{ background: '#0b1020', mixBlendMode: 'multiply', zIndex: 50, pointerEvents: 'none' }}
              />

              {/* 本屋 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/buildings/bookstore.svg"
                alt="本屋"
                width={336}
                height={336}
                style={{ position: 'absolute', left: 25, top: 550, zIndex: 19, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/books')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/books')
                }}
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
                style={{ position: 'absolute', left: 325, top: 575, zIndex: 19, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/cinema')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/cinema')
                }}
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
                style={{ position: 'absolute', left: 850, top: 595, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/leather')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/leather')
                }}
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
                style={{ position: 'absolute', left: 0, top: 50, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              {/* 学校（クリック範囲） */}
              <div
                onClick={() => router.push('/school')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/school')
                }}
                className="absolute"
                style={{ left: 0, top: 270, width: 800, height: 230, cursor: 'pointer', zIndex: 20 }}
                aria-label="学校へ"
              />

              {/* 川（クリップ区域で横はみ出し防止） */}
              <div
                className="absolute"
                style={{
                  left: 0,
                  top: 1850,
                  width: 1200,
                  height: 1200,
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
                style={{ position: 'absolute', left: 700, top: 950, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/church')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/church')
                }}
                className="absolute"
                style={{ left: 750, top: 1200, width: 310, height: 300, cursor: 'pointer', zIndex: 20 }}
                aria-label="教会へ"
              />

              {/* 旅行 */}
              <Image
                src="/images/buildings/travel.svg"
                alt="旅行"
                width={400}
                height={400}
                style={{ position: 'absolute', left: 30, top: 1020, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/travel')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/travel')
                }}
                className="absolute"
                style={{ left: 90, top: 1070, width: 280, height: 400, cursor: 'pointer', zIndex: 20 }}
                aria-label="旅行へ"
              />

              {/* 3dプリント */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/buildings/3dprint.svg"
                alt="3Dプリント"
                width={300}
                height={290}
                style={{ position: 'absolute', left: 635, top: 3000, zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/print')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/print')
                }}
                className="absolute"
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
                style={{ position: 'absolute', left: 180, top: 2600, zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/coding')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/coding')
                }}
                className="absolute"
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
                style={{ position: 'absolute', left: 910, top: 2595, zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/soldering')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/soldering')
                }}
                className="absolute"
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
                style={{ position: 'absolute', left: 660, top: 2590, zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />
              <div
                onClick={() => router.push('/microcomputer')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') router.push('/microcomputer')
                }}
                className="absolute"
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
                style={{ position: 'absolute', left: 190, top: 1815, zIndex: 10, pointerEvents: 'none', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.3))' }}
              />

              {/* 街灯（ダークモードで点灯） */}
              <StreetLight left={-85} top={680} />
              <StreetLight left={200} top={680} z={30} />
              <StreetLight left={560} top={680} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { mode } = useHomeMode()

  if (mode === 'city') return <CityMapHome />
  return <StandardHome />
}

/*// ON: 当たり判定（クリック領域）を可視化
(() => {
  const id = "hitbox-debug-style";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    div[role="button"][aria-label$="へ"]{
      outline: 2px solid #ff2d55 !important;
      background: rgba(255,45,85,.18) !important;
    }
  `;
  document.head.appendChild(style);
})();
 */