export const facilities = {
  books: false,   // 本屋: true=公開 / false=準備中
  cinema: false, // 映画館
  school: false, // 学校
  leather: false, // 革細工屋 など増やしてOK
  church: false, //教会
  print: false, //3Dプリンタ
  coding: true, //プログラミング
  soldering: false, //半田付け
} as const;

export type FacilityKey = keyof typeof facilities;