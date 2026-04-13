export type Post = {
  id: string;
  imageUrl: string;
};

export type Reel = {
  id: string;
  imageUrl: string;
  views: string;
};

// picsum.photos로 더미 이미지 - 고정 seed로 일관성 유지
export const POSTS: Post[] = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  imageUrl: `https://picsum.photos/seed/post${i + 1}/300/300`,
}));

export const REELS: Reel[] = Array.from({ length: 18 }, (_, i) => ({
  id: String(i + 1),
  imageUrl: `https://picsum.photos/seed/reel${i + 1}/300/500`,
  views: `${Math.floor(Math.random() * 90 + 10)}만`,
}));

export const TAGGED: Post[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  imageUrl: `https://picsum.photos/seed/tag${i + 1}/300/300`,
}));
