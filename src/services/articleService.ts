import axios from 'axios';

export type Article = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 8000,
});

// แนบ token อัตโนมัติทุก request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ถ้าได้ 401 กลับมา = token หมดอายุ → ล้าง localStorage แล้ว redirect login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/auth/');
      const isLikeRoute = error.config?.url?.includes('/likes/');
      // เฉพาะ like/comment route ถ้า 401 = token หมดอายุ ให้ล้างแล้ว reload
      if (isLikeRoute || (!isAuthRoute && error.config?.headers?.Authorization)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export function formatDate(isoDate: string): string {
  try {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

// helper แปลง raw DB row → Article
// ✅ ลบ getCategoryName ออกแล้ว — Backend ส่ง category ชื่อตรงๆ จาก JOIN categories มาเองอยู่แล้ว
function mapPost(item: any): Article {
  return {
    id: item.id,
    title: item.title,
    image: item.image || 'https://placehold.co/600x400',
    description: item.description || '',
    content: item.content || '',
    category: item.category || 'General',
    author: 'Apitarn P.',
    likes: item.likes_count || 0,
    date: formatDate(item.date),
  };
}

// GET /posts → { totalPosts, posts: [...] }
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await client.get('/posts');
    const rawData = response.data.posts || [];
    if (!Array.isArray(rawData)) return [];
    return rawData.map(mapPost);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// GET /posts/:id → row โดยตรง
export async function fetchArticleById(id: number): Promise<Article | undefined> {
  try {
    const response = await client.get(`/posts/${id}`);
    const item = response.data;
    if (!item) return undefined;
    return mapPost(item);
  } catch {
    return undefined;
  }
}

// POST /posts
export async function createPost(payload: {
  title: string;
  image: string;
  category_id: number;
  description: string;
  content: string;
  status_id: number;
}): Promise<void> {
  await client.post('/posts', payload);
}

// PUT /posts/:id
export async function updatePost(
  id: number,
  payload: {
    title: string;
    image: string;
    category_id: number;
    description: string;
    content: string;
    status_id: number;
  }
): Promise<void> {
  await client.put(`/posts/${id}`, payload);
}

// DELETE /posts/:id
export async function deletePost(id: number): Promise<void> {
  await client.delete(`/posts/${id}`);
}

// AUTH
export async function login(email: string, password: string): Promise<string> {
  const response = await client.post('/auth/login', { email, password });
  return response.data.access_token as string;
}

export async function register(data: {
  email: string;
  password: string;
  username: string;
  name: string;
}): Promise<void> {
  await client.post('/auth/register', data);
}

export async function getUser() {
  const response = await client.get('/auth/get-user');
  return response.data;
}

export async function resetPassword(oldPassword: string, newPassword: string): Promise<void> {
  await client.put('/auth/reset-password', { oldPassword, newPassword });
}

// ---- COMMENTS ----

export type Comment = {
  id: number;
  comment_text: string;
  created_at: string;
  username: string;
  name: string;
};

export async function fetchComments(postId: number): Promise<Comment[]> {
  try {
    const response = await client.get(`/comments/${postId}`);
    return response.data.comments || [];
  } catch {
    return [];
  }
}

export async function createComment(postId: number, comment_text: string): Promise<Comment> {
  const response = await client.post(`/comments/${postId}`, { comment_text });
  return response.data.comment;
}

export async function deleteComment(commentId: number): Promise<void> {
  await client.delete(`/comments/${commentId}`);
}

// ---- CATEGORIES ----
export type Category = {
  id: number;
  name: string;
};

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await client.get('/categories');
    return response.data.categories || response.data || [];
  } catch {
    return [];
  }
}

// ---- ADMIN: ALL POSTS (รวม draft) ----
export async function fetchAllPostsAdmin(): Promise<any[]> {
  try {
    const response = await client.get('/posts/admin/all');
    return response.data.posts || [];
  } catch {
    return [];
  }
}

// ---- LIKES ----
export async function fetchLikeStatus(postId: number): Promise<{ likes_count: number; is_liked: boolean }> {
  try {
    const response = await client.get(`/likes/${postId}`);
    return response.data;
  } catch {
    return { likes_count: 0, is_liked: false };
  }
}

export async function toggleLike(postId: number): Promise<{ likes_count: number; is_liked: boolean }> {
  const response = await client.post(`/likes/${postId}`);
  return response.data;
}
