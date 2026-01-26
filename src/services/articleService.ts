import axios from 'axios';

export type Article = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  summary: string;
  content: string[];
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

