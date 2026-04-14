import { Activity } from "@/types/activity";

export function getScoreColor(score: number): string {
  if (score >= 80) return "#4caf50";
  if (score >= 60) return "#ff9800";
  return "#f44336";
}

export const ALL_ACTIVITIES: Activity[] = [
  {
    id: "1",
    name: "한강 자전거",
    emoji: "🚴",
    description: "한강변을 따라 시원하게 자전거를 타요",
    suitabilityScore: 90,
    duration: "1-2시간",
    category: "outdoor",
    minTemp: 10,
    maxTemp: 28,
    maxPrecipitation: 20,
    items: [
      { id: "1-1", label: "자전거 또는 따릉이 앱", checked: false },
      { id: "1-2", label: "헬멧", checked: false },
      { id: "1-3", label: "물", checked: false },
      { id: "1-4", label: "선크림", checked: false },
    ],
  },
  {
    id: "2",
    name: "한강 피크닉",
    emoji: "🧺",
    description: "돗자리 펴고 여유롭게 한강을 즐겨요",
    suitabilityScore: 85,
    duration: "2-3시간",
    category: "leisure",
    minTemp: 15,
    maxTemp: 30,
    maxPrecipitation: 10,
    items: [
      { id: "2-1", label: "돗자리", checked: false },
      { id: "2-2", label: "간식과 음료", checked: false },
      { id: "2-3", label: "선글라스", checked: false },
      { id: "2-4", label: "선크림", checked: false },
      { id: "2-5", label: "쓰레기봉투", checked: false },
    ],
  },
  {
    id: "3",
    name: "카페 독서",
    emoji: "📚",
    description: "아늑한 카페에서 책 한 권 읽어요",
    suitabilityScore: 80,
    duration: "1-2시간",
    category: "indoor",
    items: [
      { id: "3-1", label: "읽을 책", checked: false },
      { id: "3-2", label: "이어폰", checked: false },
      { id: "3-3", label: "카드/현금", checked: false },
    ],
  },
  {
    id: "4",
    name: "수영",
    emoji: "🏊",
    description: "수영장에서 시원하게 수영해요",
    suitabilityScore: 92,
    duration: "1시간",
    category: "water",
    minTemp: 25,
    items: [
      { id: "4-1", label: "수영복", checked: false },
      { id: "4-2", label: "수영모", checked: false },
      { id: "4-3", label: "물안경", checked: false },
      { id: "4-4", label: "수건", checked: false },
    ],
  },
  {
    id: "5",
    name: "조깅",
    emoji: "🏃",
    description: "상쾌한 공기 마시며 가볍게 달려요",
    suitabilityScore: 88,
    duration: "30-60분",
    category: "exercise",
    minTemp: 5,
    maxTemp: 25,
    maxPrecipitation: 20,
    items: [
      { id: "5-1", label: "운동화", checked: false },
      { id: "5-2", label: "물", checked: false },
      { id: "5-3", label: "이어폰", checked: false },
    ],
  },
  {
    id: "6",
    name: "실내 클라이밍",
    emoji: "🧗",
    description: "암벽 등반으로 짜릿한 도전을 해요",
    suitabilityScore: 75,
    duration: "1-2시간",
    category: "indoor",
    items: [
      { id: "6-1", label: "운동복", checked: false },
      { id: "6-2", label: "등반화 (대여 가능)", checked: false },
      { id: "6-3", label: "초크백 (선택)", checked: false },
      { id: "6-4", label: "물", checked: false },
    ],
  },
];

export function getRecommendedActivities(
  temperature: number,
  precipitationProbability: number,
): Activity[] {
  return ALL_ACTIVITIES.map((activity) => {
    let score = activity.suitabilityScore;

    if (activity.minTemp !== undefined && temperature < activity.minTemp) {
      score -= 30;
    }
    if (activity.maxTemp !== undefined && temperature > activity.maxTemp) {
      score -= 30;
    }
    if (
      activity.maxPrecipitation !== undefined &&
      precipitationProbability > activity.maxPrecipitation
    ) {
      score -= 40;
    }

    return { ...activity, suitabilityScore: Math.max(0, score) };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
