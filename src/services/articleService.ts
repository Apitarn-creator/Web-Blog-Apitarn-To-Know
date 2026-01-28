import axios from 'axios';

export type Article = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string; // เปลี่ยนจาก summary เป็น description
  author: string;
  date: string;
  likes: number;       // ข้อมูลที่เพิ่มมาใหม่
  content: string;     // เปลี่ยนจาก array เป็น string
};

export type FetchArticlesParams = {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
};

// เพิ่ม type สำหรับ API response
type ApiResponse = {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  posts: Article[];
  nextPage?: number;
};

const client = axios.create({
  baseURL: 'https://blog-post-project-api.vercel.app',
  timeout: 5000,
});

/**
 * แปลงวันที่จาก ISO 8601 format เป็นรูปแบบที่อ่านง่าย
 * เช่น "2024-08-21T00:00:00.000Z" -> "21 August 2024"
 */
export function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    
    // ตรวจสอบว่า date ถูกต้องหรือไม่
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', isoDate);
      return isoDate; // คืนค่าเดิมถ้า date ไม่ถูกต้อง
    }
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return isoDate; // คืนค่าเดิมถ้ามี error
  }
}

/**
 * ดึงข้อมูลบทความจาก API พร้อม Query Parameters
 */
export async function fetchArticles(params?: FetchArticlesParams): Promise<Article[]> {
  try {
    // เปลี่ยน type จาก Article[] เป็น ApiResponse
    const { data } = await client.get<ApiResponse>('/posts', {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 6,
        // แก้ไข: เพิ่มเงื่อนไข 'Highlight' ด้วย
        ...(params?.category && params.category !== 'All' && params.category !== 'Highlight' && { category: params.category }),
        ...(params?.keyword && { keyword: params.keyword }),
      },
    });
    
    // API response มี structure เป็น { posts: [...], totalPosts, ... }
    // ดังนั้นต้องเข้าถึง data.posts แทน data โดยตรง
    if (!data.posts || !Array.isArray(data.posts)) {
      console.warn('Unexpected API response structure:', data);
      return [];
    }
    
    // แปลงวันที่ให้อยู่ในรูปแบบที่อ่านง่าย
    return data.posts.map(article => ({
      ...article,
      date: formatDate(article.date),
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    // แสดง error message ที่ละเอียดขึ้น
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

/**
 * ดึงข้อมูลบทความตาม ID
 */
export async function fetchArticleById(id: number): Promise<Article | undefined> {
  try {
    // เนื่องจาก API อาจไม่มี endpoint สำหรับดึงบทความเดียว
    // เราจะดึงทั้งหมดแล้วกรองตาม ID
    // หรือถ้า API มี endpoint /posts/:id ก็สามารถใช้ได้
    const articles = await fetchArticles({ limit: 1000 });
    return articles.find((article) => article.id === id);
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
}
