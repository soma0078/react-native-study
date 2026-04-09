import { Profile, Highlight, GridPost, Post } from '../types';

export const MOCK_PROFILE: Profile = {
  id: 'me',
  name: '소마',
  username: 'soma0078',
  profileImage: 'https://picsum.photos/seed/me/200',
  bio: 'React Native 학습 중 📱\nFrontend Developer',
  postCount: 12,
  followerCount: 348,
  followingCount: 212,
};

export const MOCK_HIGHLIGHTS: Highlight[] = [
  { id: 'h1', title: '여행', coverImage: 'https://picsum.photos/seed/h1/100' },
  { id: 'h2', title: '일상', coverImage: 'https://picsum.photos/seed/h2/100' },
  { id: 'h3', title: '맛집', coverImage: 'https://picsum.photos/seed/h3/100' },
  { id: 'h4', title: '코딩', coverImage: 'https://picsum.photos/seed/h4/100' },
  { id: 'h5', title: '운동', coverImage: 'https://picsum.photos/seed/h5/100' },
];

const ME = { id: 'me', name: '소마', profileImage: 'https://picsum.photos/seed/me/200' };

const CAPTIONS = [
  '오늘의 일상 📷 #daily',
  'React Native 공부 중 ⚛️ #reactnative',
  '좋은 하루 ☀️ #daily',
  '코딩 타임 💻 #dev',
  '산책 중 🌿 #walk',
  '오늘 점심 🍱 #food',
  '카페 작업 ☕ #cafe',
  '주말 나들이 🌸 #weekend',
  '야경 📸 #night',
  '운동 완료 💪 #workout',
  '독서 중 📚 #book',
  '새로운 시작 🚀 #challenge',
];

// 그리드에서 상세 화면까지 연결되는 전체 Post 데이터
export const MOCK_PROFILE_POSTS: Post[] = Array.from({ length: 12 }, (_, i) => ({
  id: `g${i + 1}`,
  user: ME,
  imageUrl: `https://picsum.photos/seed/grid${i + 1}/300`,
  likes: [128, 342, 89, 512, 203, 77, 410, 156, 298, 64, 188, 321][i],
  isLiked: false,
  caption: CAPTIONS[i],
  commentCount: [12, 27, 5, 41, 18, 3, 34, 9, 22, 1, 15, 28][i],
  createdAt: `${i + 1}일 전`,
}));

// PostGrid 컴포넌트용 (id + imageUrl만 필요)
export const MOCK_GRID_POSTS: GridPost[] = MOCK_PROFILE_POSTS.map((p) => ({
  id: p.id,
  imageUrl: p.imageUrl,
}));
