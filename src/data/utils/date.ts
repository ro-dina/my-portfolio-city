export const formatDate = (iso: string, locale = "ja-JP") =>
    new Date(iso).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });