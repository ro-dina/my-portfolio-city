export type Locale = "ja" | "en" | "ru";

export const messages = {
  ja: {
    common: {
      top: "トップ",
      back: "戻る",
      menu: "メニュー",
      language: "言語",
      japanese: "日本語",
      english: "English",
      russian: "Русский",
      close: "閉じる",
      settings: "設定",
      settingsPage: "設定ページ",
      themeToggle: "テーマ切り替え",
      themeLight: "☀️ ライト",
      themeDark: "🌙 ダーク",
      commercial: "商業施設",
      bookstore: "本屋",
    },
    home: {
      title: "街を探索する",
      // 例：施設名もキー化すると楽
      bookstore: "本屋",
      cinema: "映画館",
      school: "学校",
    },
  },
  en: {
    common: {
      top: "Top",
      back: "Back",
      menu: "Menu",
      language: "Language",
      japanese: "日本語",
      english: "English",
      russian: "Русский",
      close: "Close",
      settings: "Settings",
      settingsPage: "Settings",
      themeToggle: "Toggle theme",
      themeLight: "☀️ Light",
      themeDark: "🌙 Dark",
      commercial: "Commercial",
      bookstore: "Bookstore",
    },
    home: {
      title: "Explore the city",
      bookstore: "Bookstore",
      cinema: "Cinema",
      school: "School",
    },
  },
  ru: {
    common: {
      top: "Главная",
      back: "Назад",
      menu: "Меню",
      language: "Язык",
      japanese: "日本語",
      english: "English",
      russian: "Русский",
      close: "Закрыть",
      settings: "Настройки",
      settingsPage: "Настройки",
      themeToggle: "Тема",
      themeLight: "☀️ Светлая",
      themeDark: "🌙 Тёмная",
      commercial: "Коммерческий",
      bookstore: "Книжный магазин",
    },
    home: {
      title: "街を探索する",
      // 例：施設名もキー化すると楽
      bookstore: "Книжный магазин",
      cinema: "映画館",
      school: "学校",
    },
  }
} as const;