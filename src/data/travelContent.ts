import { Locale } from "@/i18n/messages"

export type LocalizedText = {
  ja: string
  en: string
  ru?: string
}

export type TravelArticleSection = {
  id: string
  title: LocalizedText
  body: LocalizedText[]
}

export type TravelPlace = {
  slug: string
  name: LocalizedText
  position: [number, number]
  zoom: number
  summary: LocalizedText
  articleLead: LocalizedText
  articleSections: TravelArticleSection[]
}

export type TravelCity = {
  slug: string
  name: LocalizedText
  position: [number, number]
  zoom: number
  summary: LocalizedText
  places: TravelPlace[]
}

export type TravelCountry = {
  slug: string
  name: LocalizedText
  region: LocalizedText
  position: [number, number]
  zoom: number
  summary: LocalizedText
  cities: TravelCity[]
}

export const travelUiText = {
  worldTitle: { ja: "Travel Map", en: "Travel Map", ru: "Карта путешествий" },
  worldSubtitle: {
    ja: "まずは国単位で整理して、そこから都市・建物へ絞り込みます。",
    en: "Start at country level, then drill down to cities and landmarks.",
    ru: "Сначала уровень стран, затем городов и достопримечательностей.",
  },
  worldHint: {
    ja: "タイトルをクリックすると次の階層へ進みます。",
    en: "Click a title to move to the next level.",
    ru: "Нажмите заголовок, чтобы перейти на следующий уровень.",
  },
  countryListTitle: { ja: "国一覧", en: "Countries", ru: "Страны" },
  cityListTitle: { ja: "都市一覧", en: "Cities", ru: "Города" },
  placeListTitle: { ja: "建物・スポット一覧", en: "Landmarks", ru: "Достопримечательности" },
  zoomButton: { ja: "地図で見る", en: "Focus on map", ru: "Показать на карте" },
  openPage: { ja: "ページを開く", en: "Open page", ru: "Открыть страницу" },
  articleTitle: { ja: "旅の記事", en: "Travel Article", ru: "Статья о поездке" },
  articleSectionTitle: { ja: "本文", en: "Article", ru: "Содержание" },
  backToWorld: { ja: "国一覧へ戻る", en: "Back to countries", ru: "Назад к странам" },
  backToCountry: { ja: "都市一覧へ戻る", en: "Back to cities", ru: "Назад к городам" },
  backToCity: { ja: "スポット一覧へ戻る", en: "Back to landmarks", ru: "Назад к достопримечательностям" },
} as const

export const travelCountries: TravelCountry[] = [
  { //日本
    slug: "japan",
    name: { ja: "日本", en: "Japan", ru: "Япония" },
    region: { ja: "東アジア", en: "East Asia", ru: "Восточная Азия" },
    position: [36.2048, 138.2529],
    zoom: 5,
    summary: {
      ja: "都市の密度や交通結節点の観察を中心に記録。",
      en: "Notes focused on urban density and transport nodes.",
      ru: "Заметки о плотности города и транспортных узлах.",
    },
    cities: [
      {
        slug: "tokyo",
        name: { ja: "東京", en: "Tokyo", ru: "Токио" },
        position: [35.6764, 139.65],
        zoom: 10,
        summary: {
          ja: "駅周辺の動線と、昼夜の街の変化を記録。",
          en: "Observations of station-centered flows and day-night changes.",
          ru: "Наблюдения за потоками у станций и сменой ритма днем и ночью.",
        },
        places: [
          {
            slug: "tokyo-tower",
            name: { ja: "東京タワー", en: "Tokyo Tower", ru: "Токийская башня" },
            position: [35.6586, 139.7454],
            zoom: 15,
            summary: {
              ja: "都心の視界と周辺の高低差が分かりやすい地点。",
              en: "A point that clearly shows downtown skyline and elevation contrast.",
              ru: "Точка, где хорошо видны панорама центра и перепады высот.",
            },
            articleLead: {
              ja: "展望台から見える範囲だけでなく、足元の回遊ルートも記録対象にしています。",
              en: "I also track walking routes around the base, not just the observatory view.",
              ru: "Я фиксирую не только вид с обзорной площадки, но и маршруты у подножия.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "観光地でも生活動線が交差していて、時間帯ごとの歩行者の層が違いました。",
                    en: "Even as a tourist area, local flows overlap and change by time of day.",
                    ru: "Даже в туристической зоне местные потоки пересекаются и меняются по времени.",
                  },
                ],
              },
            ],
          },
          {
            slug: "asakusa-sensoji",
            name: { ja: "浅草寺", en: "Senso-ji", ru: "Сэнсо-дзи" },
            position: [35.7148, 139.7967],
            zoom: 15,
            summary: {
              ja: "歴史エリアと商業通りが連続する代表地点。",
              en: "A representative area where historical district meets retail streets.",
              ru: "Показательное место, где исторический район переходит в торговую улицу.",
            },
            articleLead: {
              ja: "参道の混雑と周辺路地の静けさの差が印象的でした。",
              en: "The contrast between crowded approach roads and quiet alleys stood out.",
              ru: "Сильный контраст между оживленным подходом и тихими переулками.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "主動線を外れた瞬間に滞留の仕方が大きく変わる点が面白かったです。",
                    en: "Crowd behavior changed sharply once off the main pedestrian corridor.",
                    ru: "Поведение толпы резко менялось при уходе с главной пешеходной оси.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { //韓国
    slug: "South Koria",
    name: { ja: "韓国", en: "South Koria", ru:""},
    region: { ja: "東アジア", en: "East Asia", ru: "Восточная Азия" },
    position: [35.9077, 127.7669],
    zoom: 5,
    summary: {
      ja: "",
      en: "",
      ru: "",
    },
    cities: []
  },
  { //台湾
    slug: "Taiwan",
    name: { ja: "台湾", en: "Taiwan", ru:""},
    region: { ja: "東アジア", en: "East Asia", ru: "Восточная Азия" },
    position: [23.69781, 120.9605],
    zoom: 5,
    summary: {
      ja: "",
      en: "",
      ru: "",
    },
    cities: []
  },
  { //ドイツ
    slug: "germany",
    name: { ja: "ドイツ", en: "Germany", ru: "Германия" },
    region: { ja: "ヨーロッパ", en: "Europe", ru: "Европа" },
    position: [51.1657, 10.4515],
    zoom: 6,
    summary: {
      ja: "歴史遺構と現代交通の重なり方を中心に記録。",
      en: "Notes on how historical layers overlap with modern mobility.",
      ru: "Заметки о том, как исторические слои пересекаются с современной мобильностью.",
    },
    cities: [
      {
        slug: "berlin",
        name: { ja: "ベルリン", en: "Berlin", ru: "Берлин" },
        position: [52.52, 13.4049],
        zoom: 11,
        summary: {
          ja: "再開発エリアと歴史地点の距離感を見たい都市。",
          en: "A city ideal for comparing redevelopment and historical sites.",
          ru: "Город, удобный для сравнения новых районов и исторических мест.",
        },
        places: [
          {
            slug: "brandenburg-gate",
            name: { ja: "ブランデンブルク門", en: "Brandenburg Gate", ru: "Бранденбургские ворота" },
            position: [52.5163, 13.3777],
            zoom: 16,
            summary: {
              ja: "象徴性が高く、広場の使われ方が観察しやすい場所。",
              en: "Highly symbolic site where plaza usage is easy to observe.",
              ru: "Символическое место, где удобно наблюдать использование площади.",
            },
            articleLead: {
              ja: "観光客の滞在行動と、通過交通の関係をメモしました。",
              en: "I recorded relationships between tourist stay behavior and pass-through traffic.",
              ru: "Я отметил связь между поведением туристов и транзитными потоками.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "イベント有無で空間の重心が大きく変わる印象でした。",
                    en: "The spatial center of activity shifts significantly depending on events.",
                    ru: "Центр активности заметно смещается в зависимости от мероприятий.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "munich",
        name: { ja: "ミュンヘン", en: "Munich", ru: "Мюнхен" },
        position: [48.1351, 11.582],
        zoom: 11,
        summary: {
          ja: "広場文化と鉄道アクセスの両立が見える都市。",
          en: "A city where plaza culture and rail accessibility coexist.",
          ru: "Город, где сочетаются культура площадей и железнодорожная доступность.",
        },
        places: [
          {
            slug: "marienplatz",
            name: { ja: "マリエン広場", en: "Marienplatz", ru: "Мариенплац" },
            position: [48.1374, 11.5755],
            zoom: 16,
            summary: {
              ja: "観光・買い物・通過が同居する中心地。",
              en: "A central zone where tourism, shopping, and transit overlap.",
              ru: "Центральная зона, где пересекаются туризм, покупки и транзит.",
            },
            articleLead: {
              ja: "徒歩圏の連続性と、駅からの視認性を重点的に見ました。",
              en: "I focused on walkable continuity and visibility from stations.",
              ru: "Я сосредоточился на непрерывности пеших маршрутов и видимости от станций.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "建物ファサードの密度が歩行速度に影響しているように感じました。",
                    en: "Facade density seemed to affect pedestrian pace.",
                    ru: "Плотность фасадов, похоже, влияет на скорость пешеходов.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "Friedrichshafen",
        name: { ja: "フリードリヒスハーフェン", en: "Friedrichshafen", ru: "Фридрихсхафен"},
        position: [47.6567, 9.4649],
        zoom: 10,
        summary:{
          ja: "",
          en: "",
          ru: ""
        },
        places:[]
      },
    ],
  },
  { //フランス
    slug: "france",
    name: { ja: "フランス", en: "France", ru: "Франция" },
    region: { ja: "ヨーロッパ", en: "Europe", ru: "Европа" },
    position: [46.2276, 2.2137],
    zoom: 6,
    summary: {
      ja: "歴史景観と観光動線を比較しやすい国。",
      en: "A country suitable for comparing heritage scenery and tourist flow.",
      ru: "Страна, удобная для сравнения исторического ландшафта и туристических потоков.",
    },
    cities: [
      {
        slug: "paris",
        name: { ja: "パリ", en: "Paris", ru: "Париж" },
        position: [48.8566, 2.3522],
        zoom: 11,
        summary: {
          ja: "河川沿いの回遊と主要観光地点の接続が特徴。",
          en: "Known for river-side circulation and connected major landmarks.",
          ru: "Характерна набережная структура и связность ключевых достопримечательностей.",
        },
        places: [
          {
            slug: "eiffel-tower",
            name: { ja: "エッフェル塔", en: "Eiffel Tower", ru: "Эйфелева башня" },
            position: [48.8584, 2.2945],
            zoom: 16,
            summary: {
              ja: "広場・公園・河岸の連続性を観察しやすい地点。",
              en: "Good location to observe continuity of plaza, park, and riverfront.",
              ru: "Удобная точка для наблюдения связности площади, парка и набережной.",
            },
            articleLead: {
              ja: "視界の抜け方と、人の滞留ポイントを中心に見ました。",
              en: "I focused on view corridors and where people tend to stay.",
              ru: "Я сосредоточился на видовых коридорах и точках скопления людей.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "河川側と市街地側で歩行テンポが異なるのが印象的でした。",
                    en: "Pedestrian tempo differed between river side and dense urban side.",
                    ru: "Темп пешеходного движения отличался у реки и в плотной городской части.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { //フィンランド
    slug: "finland",
    name: { ja: "フィンランド", en: "Finland", ru: "Финляндия" },
    region: { ja: "北ヨーロッパ", en: "Northern Europe", ru: "Северная Европа" },
    position: [61.9241, 25.7482],
    zoom: 5,
    summary: {
      ja: "水辺と都市機能の距離感を観察しやすい国。",
      en: "A country where waterfront and urban functions are closely connected.",
      ru: "Страна, где наглядно видна связь набережных и городских функций.",
    },
    cities: [
      {
        slug: "helsinki",
        name: { ja: "ヘルシンキ", en: "Helsinki", ru: "Хельсинки" },
        position: [60.1699, 24.9384],
        zoom: 11,
        summary: {
          ja: "港湾エリアと中心市街地の接続が分かりやすい都市。",
          en: "A city with clear linkage between harbor area and downtown.",
          ru: "Город с понятной связью между портовой зоной и центром.",
        },
        places: [
          {
            slug: "senate-square",
            name: { ja: "元老院広場", en: "Senate Square", ru: "Сенатская площадь" },
            position: [60.1695, 24.9525],
            zoom: 16,
            summary: {
              ja: "広場の見通しと周辺回遊を記録しやすい地点。",
              en: "A good point to document open-square visibility and nearby circulation.",
              ru: "Удобная точка для фиксации обзора площади и соседних маршрутов.",
            },
            articleLead: {
              ja: "広場の滞在行動と、海側への動線の分岐を中心に見ました。",
              en: "I observed staying behavior in the square and route branching toward the sea.",
              ru: "Я наблюдал за поведением на площади и развилками маршрутов к морю.",
            },
            articleSections: [
              {
                id: "memo",
                title: { ja: "観察メモ", en: "Observation Notes", ru: "Наблюдения" },
                body: [
                  {
                    ja: "気候条件によって同じ広場でも滞在時間が変わると感じました。",
                    en: "I felt stay duration in the same square varied strongly by weather.",
                    ru: "Показалось, что время пребывания на одной площади сильно зависит от погоды.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export function pickLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en ?? text.ja
}

export function getTravelCountry(countrySlug: string) {
  return travelCountries.find((country) => country.slug === countrySlug)
}

export function getTravelCity(countrySlug: string, citySlug: string) {
  return getTravelCountry(countrySlug)?.cities.find((city) => city.slug === citySlug)
}

export function getTravelPlace(countrySlug: string, citySlug: string, placeSlug: string) {
  return getTravelCity(countrySlug, citySlug)?.places.find((place) => place.slug === placeSlug)
}
