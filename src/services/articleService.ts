import axios from 'axios';

export type Article = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string; // ข้อมูลใหม่แทนที่ summary
  author: string;
  date: string;
  likes: number;       // ข้อมูลใหม่
  content: string;     // ข้อมูลใหม่เป็น String ยาวที่มีเครื่องหมาย \n
};

const client = axios.create({
  baseURL: '/',
  timeout: 5000,
});

export async function fetchArticles(): Promise<Article[]> {
  const { data } = await client.get<Article[]>('/articles.json');
  return data;
}

export async function fetchArticleById(id: number): Promise<Article | undefined> {
  const articles = await fetchArticles();
  return articles.find((article) => article.id === id);
}

