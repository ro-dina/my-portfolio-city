import Image from "next/image"

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        この施設は準備中です
      </h1>

      <Image
        src="images/furniture/closed.svg" // public/closed.png に配置してください
        alt="Closed sign"
        width={300}
        height={300}
        className="mb-6"
      />

      <p className="text-lg text-gray-600">
        ページが公開されるまでしばらくお待ちください。
      </p>
    </div>
  )
}