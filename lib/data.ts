export type Category =
  | "korean"
  | "chinese"
  | "japanese"
  | "western"
  | "asian"
  | "fastfood"

export type Mood = "haejang" | "light" | "hearty" | "spicy"

export type Price = "under10" | "10to20"

export const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "korean", label: "한식", emoji: "🍚" },
  { id: "chinese", label: "중식", emoji: "🥢" },
  { id: "japanese", label: "일식", emoji: "🍣" },
  { id: "western", label: "양식", emoji: "🍝" },
  { id: "asian", label: "아시안", emoji: "🍜" },
  { id: "fastfood", label: "패스트푸드", emoji: "🍔" },
]

export const MOODS: { id: Mood; label: string }[] = [
  { id: "haejang", label: "해장 필요" },
  { id: "light", label: "가볍게" },
  { id: "hearty", label: "든든하게" },
  { id: "spicy", label: "매콤한 것" },
]

export const PRICES: { id: Price; label: string }[] = [
  { id: "under10", label: "만 원 이하" },
  { id: "10to20", label: "1~2만 원" },
]

export const CATEGORY_LABEL: Record<Category, string> = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  fastfood: "패스트푸드",
}

export type Menu = {
  id: string
  name: string
  category: Category
  moods: Mood[]
  price: Price
  image: string
  tagline: string
  description: string
}

export const MENUS: Menu[] = [
  {
    id: "kimchi-jjigae",
    name: "김치찌개",
    category: "korean",
    moods: ["haejang", "hearty", "spicy"],
    price: "under10",
    image: "/menus/kimchi-jjigae.png",
    tagline: "오늘처럼 흐린 날엔 칼칼한 김치찌개 어떠세요?",
    description: "잘 익은 김치와 두툼한 돼지고기가 어우러진 국물 요리. 밥 한 공기 뚝딱이에요.",
  },
  {
    id: "jeyuk-bokkeum",
    name: "제육볶음",
    category: "korean",
    moods: ["hearty", "spicy"],
    price: "under10",
    image: "/menus/jeyuk-bokkeum.png",
    tagline: "매콤달콤, 밥도둑의 정석 제육볶음!",
    description: "고추장 양념에 볶은 돼지고기. 상추쌈에 싸 먹으면 든든함이 두 배.",
  },
  {
    id: "naengmyeon",
    name: "물냉면",
    category: "korean",
    moods: ["light", "haejang"],
    price: "under10",
    image: "/menus/naengmyeon.png",
    tagline: "속이 더부룩할 땐 시원한 물냉면 한 그릇!",
    description: "살얼음 육수에 쫄깃한 면발. 가볍고 개운하게 즐기기 좋아요.",
  },
  {
    id: "jjajangmyeon",
    name: "짜장면",
    category: "chinese",
    moods: ["light", "hearty"],
    price: "under10",
    image: "/menus/jjajangmyeon.png",
    tagline: "고민될 땐 역시 국민 메뉴 짜장면이죠!",
    description: "달큰한 춘장 소스와 쫄깃한 면발의 완벽한 조합. 실패 없는 선택.",
  },
  {
    id: "jjamppong",
    name: "짬뽕",
    category: "chinese",
    moods: ["haejang", "spicy"],
    price: "under10",
    image: "/menus/jjamppong.png",
    tagline: "얼큰한 국물이 당길 땐 짬뽕이 답!",
    description: "해물과 채소를 듬뿍 넣은 매운 국물 요리. 해장으로도 최고예요.",
  },
  {
    id: "sushi",
    name: "초밥",
    category: "japanese",
    moods: ["light"],
    price: "10to20",
    image: "/menus/sushi.png",
    tagline: "특별한 날엔 신선한 초밥으로 기분 전환!",
    description: "제철 생선을 올린 한 입 크기의 초밥. 가볍지만 만족스러운 한 끼.",
  },
  {
    id: "tonkatsu",
    name: "돈카츠",
    category: "japanese",
    moods: ["hearty"],
    price: "under10",
    image: "/menus/tonkatsu.png",
    tagline: "바삭한 튀김옷이 그리울 땐 돈카츠!",
    description: "겉은 바삭, 속은 촉촉한 두툼한 돈카츠. 든든한 한 끼로 딱이에요.",
  },
  {
    id: "pasta",
    name: "로제 파스타",
    category: "western",
    moods: ["hearty"],
    price: "10to20",
    image: "/menus/pasta.png",
    tagline: "부드럽고 진한 로제 파스타로 힐링!",
    description: "토마토와 크림이 어우러진 로제 소스에 탱글한 새우까지. 기분 좋은 한 끼.",
  },
  {
    id: "steak",
    name: "스테이크",
    category: "western",
    moods: ["hearty"],
    price: "10to20",
    image: "/menus/steak.png",
    tagline: "제대로 든든하게, 육즙 가득 스테이크!",
    description: "겉은 노릇, 속은 육즙 가득한 스테이크. 오늘 하루 나에게 주는 보상.",
  },
  {
    id: "pho",
    name: "쌀국수",
    category: "asian",
    moods: ["haejang", "light"],
    price: "under10",
    image: "/menus/pho.png",
    tagline: "따뜻하고 개운한 쌀국수로 속 달래기!",
    description: "깊은 육수에 부드러운 쌀면과 고기. 가볍고 든든한 해장 메뉴.",
  },
  {
    id: "padthai",
    name: "팟타이",
    category: "asian",
    moods: ["spicy", "light"],
    price: "10to20",
    image: "/menus/padthai.png",
    tagline: "새콤달콤 이국적인 맛, 팟타이 어때요?",
    description: "볶은 쌀국수에 새우와 땅콩의 조화. 색다른 점심이 필요할 때.",
  },
  {
    id: "burger",
    name: "수제버거",
    category: "fastfood",
    moods: ["hearty"],
    price: "under10",
    image: "/menus/burger.png",
    tagline: "빠르고 든든하게! 육즙 가득 수제버거!",
    description: "두툼한 패티와 신선한 채소가 가득. 바쁜 날 손쉽게 즐기는 한 끼.",
  },
]

export function getMenuById(id: string): Menu | undefined {
  return MENUS.find((m) => m.id === id)
}

export type FilterState = {
  categories: Category[]
  moods: Mood[]
  price: Price | "any"
}

export function filterMenus(filters: FilterState): Menu[] {
  return MENUS.filter((menu) => {
    if (filters.categories.length > 0 && !filters.categories.includes(menu.category)) {
      return false
    }
    if (filters.moods.length > 0 && !filters.moods.some((m) => menu.moods.includes(m))) {
      return false
    }
    if (filters.price !== "any" && menu.price !== filters.price) {
      return false
    }
    return true
  })
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export type Restaurant = {
  id: string
  name: string
  rating: number
  reviews: number
  distance: number // meters
  price: string
  address: string
  lat: number
  lng: number
}

// Restaurants keyed by menu id. Coordinates are around a mock "current location"
// near Gangnam Station, Seoul for demo purposes.
export const BASE_LAT = 37.4979
export const BASE_LNG = 127.0276

export const RESTAURANTS_BY_MENU: Record<string, Restaurant[]> = {
  "kimchi-jjigae": buildRestaurants("김치찌개", [
    "이모네 김치찌개",
    "화통삼 김치찜",
    "한솥집 백반",
    "청기와 찌개마을",
  ]),
  "jeyuk-bokkeum": buildRestaurants("제육볶음", [
    "장터 제육볶음",
    "고기굽는 백반집",
    "엄마손 제육",
    "밥심 식당",
  ]),
  naengmyeon: buildRestaurants("냉면", [
    "평양면옥",
    "봉피양 냉면",
    "을밀대 강남점",
    "시원 물냉면",
  ]),
  jjajangmyeon: buildRestaurants("짜장면", [
    "홍콩반점 0410",
    "차이나린 강남",
    "북경장",
    "만리장성",
  ]),
  jjamppong: buildRestaurants("짬뽕", [
    "짬뽕지존",
    "초마짬뽕",
    "홍짬뽕 강남",
    "불짬뽕 명가",
  ]),
  sushi: buildRestaurants("초밥", [
    "스시노밸리",
    "오마카세 하루",
    "회전초밥 스시로",
    "긴자 초밥",
  ]),
  tonkatsu: buildRestaurants("돈카츠", [
    "긴자바이린",
    "카츠앤",
    "수사식당",
    "온기 돈카츠",
  ]),
  pasta: buildRestaurants("파스타", [
    "라비타 파스타",
    "봉골레 키친",
    "마마리아",
    "일 카페",
  ]),
  steak: buildRestaurants("스테이크", [
    "울프강 스테이크",
    "브라운스톤",
    "더 스테이크 하우스",
    "미트존",
  ]),
  pho: buildRestaurants("쌀국수", [
    "포메인 강남",
    "미스사이공",
    "포유 베트남",
    "하노이 별빛",
  ]),
  padthai: buildRestaurants("팟타이", [
    "타이거리",
    "방콕키친",
    "쏨땀 스타",
    "코끼리 타이",
  ]),
  burger: buildRestaurants("버거", [
    "브루클린 버거",
    "다운타우너",
    "버거보이",
    "패티스미스",
  ]),
}

function buildRestaurants(menuName: string, names: string[]): Restaurant[] {
  const seeds = [
    { dLat: 0.0012, dLng: 0.0009, rating: 4.6, reviews: 842, dist: 180, price: "8,000원~" },
    { dLat: -0.0018, dLng: 0.0021, rating: 4.4, reviews: 513, dist: 310, price: "9,500원~" },
    { dLat: 0.0025, dLng: -0.0016, rating: 4.7, reviews: 1204, dist: 350, price: "11,000원~" },
    { dLat: -0.0009, dLng: -0.0028, rating: 4.2, reviews: 288, dist: 470, price: "7,500원~" },
  ]
  return names.map((name, i) => {
    const s = seeds[i % seeds.length]
    return {
      id: `${menuName}-${i}`,
      name,
      rating: s.rating,
      reviews: s.reviews,
      distance: s.dist,
      price: s.price,
      address: `서울 강남구 테헤란로 ${(i + 1) * 12}길 ${(i + 3) * 4}`,
      lat: BASE_LAT + s.dLat,
      lng: BASE_LNG + s.dLng,
    }
  })
}

export function getRestaurantsForMenu(menuId: string): Restaurant[] {
  return RESTAURANTS_BY_MENU[menuId] ?? RESTAURANTS_BY_MENU["kimchi-jjigae"]
}
