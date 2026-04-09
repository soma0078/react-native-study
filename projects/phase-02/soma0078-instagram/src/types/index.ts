export type User = {
  id: string;
  name: string;
  profileImage: string;
};

export type Post = {
  id: string;
  user: User;
  imageUrl: string;
  likes: number;
  isLiked: boolean;
  caption: string;
  commentCount: number;
  createdAt: string;
};

export type Story = {
  id: string;
  user: User;
  isMe?: boolean;
};

export type Profile = {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
};

export type Highlight = {
  id: string;
  title: string;
  coverImage: string;
};

export type GridPost = {
  id: string;
  imageUrl: string;
};
