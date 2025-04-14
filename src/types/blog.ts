export interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  excerpt: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: Date;
  isApproved: boolean;
}

export interface BlogPostFormData {
  title: string;
  content: string;
  coverImage?: File;
  excerpt: string;
  tags: string[];
} 