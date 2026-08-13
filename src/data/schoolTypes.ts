export type Lang = "ja" | "en" | "ru";
export type I18nText = string | { ja: string; en?: string; ru?: string };
export type SchoolImageFile = {
  src: string;
  alt?: I18nText;
  caption?: I18nText;
  width?: number;
  height?: number;
  tabLabel?: I18nText;
};
export type SchoolTableFile = {
  headers?: I18nText[];
  rows?: I18nText[][];
  rawText?: string;
  caption?: I18nText;
  tabLabel?: I18nText;
  showRowNumbers?: boolean;
  rowNumberStart?: number;
  preserveCellWhitespace?: boolean;
  monospace?: boolean;
};

export type SchoolListItem =
  | I18nText
  | {
      title: I18nText;
      description?: I18nText;
    };

export type SchoolExerciseContentBlock =
  | {
      type: "paragraph";
      body: I18nText;
    }
  | {
      type: "list";
      items: SchoolListItem[];
    }
  | {
      type: "image";
      src: string;
      alt?: I18nText;
      caption?: I18nText;
      width?: number;
      height?: number;
      files?: SchoolImageFile[];
    }
  | {
      type: "image";
      files: SchoolImageFile[];
      src?: string;
      alt?: I18nText;
      caption?: I18nText;
      width?: number;
      height?: number;
    }
  | {
      type: "table";
      headers?: I18nText[];
      rows?: I18nText[][];
      rawText?: string;
      caption?: I18nText;
      showRowNumbers?: boolean;
      rowNumberStart?: number;
      preserveCellWhitespace?: boolean;
      monospace?: boolean;
      files?: SchoolTableFile[];
    }
  | {
      type: "table";
      files: SchoolTableFile[];
      headers?: I18nText[];
      rows?: I18nText[][];
      caption?: I18nText;
      showRowNumbers?: boolean;
      rowNumberStart?: number;
    }
  | {
      type: "code";
      lang?: string;
      filename?: string;
      code: string;
      files?: { code: string; lang?: string; filename?: string; tabLabel?: string }[];
    }
  | {
      type: "code";
      files: { code: string; lang?: string; filename?: string; tabLabel?: string }[];
      code?: string;
      lang?: string;
      filename?: string;
    };

/** I18nText または string を受けて、言語に応じて取り出す（無ければ ja にフォールバック） */
export function pickText(v: I18nText, lang: Lang) {
  if (typeof v === "string") return v;
  return v[lang] ?? v.ja;
}

export type SchoolBlock =
  | {
      type: "lead";
      text: I18nText;
    }
  | {
      type: "section";
      title: I18nText;
      body: I18nText;
      anchor?: string;
    }
  | {
      type: "list";
      title: I18nText;
      items: SchoolListItem[];
      anchor?: string;
    }
  | {
      type: "toc";
      title?: I18nText;
      items: { title: I18nText; anchor?: string }[];
    }
  | {
      type: "paragraph";
      title?: I18nText;
      body: I18nText;
      anchor?: string;
    }
  | {
      type: "image";
      title?: I18nText;
      src: string;
      alt?: I18nText;
      caption?: I18nText;
      width?: number;
      height?: number;
      files?: SchoolImageFile[];
    }
  | {
      type: "image";
      title?: I18nText;
      files: SchoolImageFile[];
      src?: string;
      alt?: I18nText;
      caption?: I18nText;
      width?: number;
      height?: number;
    }
  | {
      type: "table";
      title?: I18nText;
      headers?: I18nText[];
      rows?: I18nText[][];
      rawText?: string;
      caption?: I18nText;
      showRowNumbers?: boolean;
      rowNumberStart?: number;
      preserveCellWhitespace?: boolean;
      monospace?: boolean;
      files?: SchoolTableFile[];
    }
  | {
      type: "table";
      title?: I18nText;
      files: SchoolTableFile[];
      headers?: I18nText[];
      rows?: I18nText[][];
      caption?: I18nText;
      showRowNumbers?: boolean;
      rowNumberStart?: number;
    }
  | {
      type: "code";
      title?: I18nText;
      lang?: string;
      filename?: string;
      code: string;
      files?: { code: string; lang?: string; filename?: string; tabLabel?: string }[];
    }
  | {
      type: "code";
      title?: I18nText;
      files: { code: string; lang?: string; filename?: string; tabLabel?: string }[];
      code?: string;
      lang?: string;
      filename?: string;
    }
  | {
      type: "exercise";
      title: I18nText;
      anchor?: string;
      question: I18nText;
      questionBlocks?: SchoolExerciseContentBlock[];
      answer?: I18nText;
      answerBlocks?: SchoolExerciseContentBlock[];
      initiallyOpen?: boolean;
    };

export type SchoolArticleCard = {
  slug: string;
  title: I18nText;
  summary: I18nText;
  category?: string;
  tags: string[];
  updatedAt: string; // とりあえず string に固定（Date 混在事故を防ぐ）
};

export type SchoolArticleContent = {
  slug: string;
  blocks: SchoolBlock[];
};

export type SchoolArticle = SchoolArticleCard & SchoolArticleContent;
