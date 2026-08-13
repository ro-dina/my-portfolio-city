export const profile = {
  name: "Isao",
  eyebrow: "Portfolio / Activity Log",
  headline: "ソフトウェアを軸に、AI・ロボティクス・セキュリティを横断して学び、つくる。",
  introduction:
    "Webアプリ、画像処理、アルゴリズム可視化などの制作と、コンピュータサイエンス・語学の学習過程を記録しています。完成品だけでなく、設計判断や失敗、検証から得た学びまで残します。",
  interests: ["Software", "AI", "Robotics", "Security", "Languages"],
  links: [
    { label: "GitHub", href: "https://github.com/ro-dina", external: true },
    { label: "Projects", href: "/projects", external: false },
  ],
} as const;

export const skillFields = [
  {
    title: "Software Engineering",
    description: "Webアプリとデスクトップツールを、設計・実装・検証まで一貫して制作。",
    items: ["Next.js", "React", "TypeScript", "Python", "C#"],
  },
  {
    title: "AI / Computer Vision",
    description: "予測モデル、探索、画像処理を題材に、入力から評価までの流れを実践。",
    items: ["Machine Learning", "OpenCV", "Data Analysis", "Validation"],
  },
  {
    title: "Graphics / Robotics",
    description: "3D表示、医療画像、Unity連携、センサーを扱う試作に取り組んでいます。",
    items: ["Unity", "VTK", "WebGL", "Raspberry Pi", "Hardware"],
  },
  {
    title: "Computer Science",
    description: "アルゴリズム、DB、OS、ネットワーク、セキュリティを実験とノートで理解。",
    items: ["Algorithms", "PostgreSQL", "Architecture", "Security"],
  },
] as const;
