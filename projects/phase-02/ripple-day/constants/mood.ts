export interface MoodConfig {
  emoji: string;
  message: string;
  subMessage: string;
}

export function getMoodByTemperature(temp: number): MoodConfig {
  if (temp <= 0) {
    return {
      emoji: "🥶",
      message: "너무 추워요",
      subMessage: "따뜻하게 입고 핫초코 한 잔 어때요?",
    };
  } else if (temp <= 10) {
    return {
      emoji: "🧥",
      message: "쌀쌀한 날씨예요",
      subMessage: "가벼운 산책도 괜찮은 날이에요",
    };
  } else if (temp <= 20) {
    return {
      emoji: "😊",
      message: "딱 좋은 날씨예요",
      subMessage: "야외 활동하기 완벽한 온도예요",
    };
  } else if (temp <= 28) {
    return {
      emoji: "☀️",
      message: "따뜻하고 화창해요",
      subMessage: "한강에서 피크닉은 어때요?",
    };
  } else if (temp <= 33) {
    return {
      emoji: "🌊",
      message: "더운 날이에요",
      subMessage: "수분 보충 잊지 마세요!",
    };
  } else {
    return {
      emoji: "🔥",
      message: "폭염 주의보",
      subMessage: "실내 활동을 추천드려요",
    };
  }
}
