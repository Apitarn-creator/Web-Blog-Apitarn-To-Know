import axios from 'axios';

// 1. นิยามหน้าตาข้อมูลแบบที่ UI (ArticleSection) ต้องการ
export type Article = {
  id: number;
  image: string;
  category: string; // UI ต้องการชื่อหมวดหมู่ (String)
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
};

export type FetchArticlesParams = {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001',
  timeout: 5000,
});

// ฟังก์ชันแปลงวันที่ให้สวยงาม
export function formatDate(isoDate: string): string {
  try {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    // แปลงเป็นรูปแบบ: 21 August 2024
    return date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
  } catch (error) {
    return isoDate;
  }
}

// ฟังก์ชันจำลองชื่อหมวดหมู่ (เพราะ DB ส่งมาแค่ ID)
function getCategoryName(id: number): string {
  const categories: Record<number, string> = {
    1: "Highlight",
    2: "Technology",
    3: "Life Style",
    4: "Programming"
  };
  return categories[id] || "General";
}

export async function fetchArticles(params?: FetchArticlesParams): Promise<Article[]> {
  try {
    // 2. เรียกข้อมูลจาก Backend
    const response = await client.get('/posts', {
      params: {
        keyword: params?.keyword,
        category: params?.category === 'Highlight' || params?.category === 'All' ? undefined : params?.category,
        page: params?.page,
        limit: params?.limit || 100
      }
    });

    // 3. ดึงข้อมูลดิบจาก Response
    // (เช็คว่า Backend ส่งมาแบบ { data: [...] } หรือ { data: { data: [...] } })
    const rawData = response.data.data || []; 

    if (!Array.isArray(rawData)) {
      console.warn("API response format is not an array:", rawData);
      return [];
    }

    // 4. ✅ หัวใจสำคัญ: แปลงข้อมูล DB (Snake Case) -> UI (Camel Case)
    // เพื่อให้ ArticleSection ใช้งานได้โดยไม่พัง
    const mappedData: Article[] = rawData.map((item: any) => ({
      id: item.id,
      title: item.title,
      image: item.image || "https://placehold.co/600x400", // รูปสำรองกันพัง
      description: item.description || "",
      content: item.content || "",
      
      // แปลง ID เป็นชื่อหมวดหมู่ (เพื่อให้ Filter ใน ArticleSection ทำงานได้)
      category: getCategoryName(item.category_id),
      
      // ข้อมูลที่ DB ยังไม่มี ให้ใส่ค่า Default ไปก่อน กัน Error
      author: "Admin", 
      likes: item.likes_count || 0,
      
      // แปลงวันที่ created_at จาก DB ให้เป็น format ที่ UI ต้องการ
      date: formatDate(item.created_at)
    }));

    return mappedData;

  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // ส่งอาเรย์ว่างกลับไป กันหน้าเว็บขาว
  }
}

export async function fetchArticleById(id: number): Promise<Article | undefined> {
  try {
    const response = await client.get(`/posts/${id}`);
    const item = response.data.data;
    
    if (!item) return undefined;

    // ต้องแปลงข้อมูลเหมือนกัน
    return {
      id: item.id,
      title: item.title,
      image: item.image || "https://placehold.co/600x400",
      description: item.description || "",
      content: item.content || "",
      category: getCategoryName(item.category_id),
      author: "Admin",
      likes: item.likes_count || 0,
      date: formatDate(item.created_at)
    };
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return undefined;
  }
}