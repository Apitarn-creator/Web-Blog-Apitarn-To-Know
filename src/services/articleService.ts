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

// URL Backend (ถ้าในเครื่องใช้ localhost:4001, ถ้าขึ้น Cloud ใช้ Link Vercel)
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001',
  timeout: 5000,
});

function getCategoryName(id: number): string {
  const categories: Record<number, string> = {
    1: "Highlight",
    2: "Technology",
    3: "Life Style",
    4: "Programming"
  };
  return categories[id] || "General";
}

export function formatDate(isoDate: string): string {
  try {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (error) {
    return isoDate;
  }
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    // ดึงมาทั้งหมดเลย (แก้ปัญหา Backend กรองผิด)
    const response = await client.get('/posts');
    const rawData = response.data.data || [];

    if (!Array.isArray(rawData)) return [];

    return rawData.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image || "https://placehold.co/600x400",
      description: item.description || "",
      content: item.content || "",
      category: getCategoryName(item.category_id), // แปลงเลข 1 เป็น Highlight
      author: "Apitarn P.", 
      likes: item.likes_count || 0,
      date: formatDate(item.created_at)
    }));

  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleById(id: number): Promise<Article | undefined> {
  try {
    const response = await client.get(`/posts/${id}`);
    const item = response.data.data;
    if (!item) return undefined;
    
    return {
      id: item.id,
      title: item.title,
      image: item.image || "https://placehold.co/600x400",
      description: item.description || "",
      content: item.content || "",
      category: getCategoryName(item.category_id),
      author: "Apitarn P.",
      likes: item.likes_count || 0,
      date: formatDate(item.created_at)
    };
  } catch (error) {
    return undefined;
  }
}