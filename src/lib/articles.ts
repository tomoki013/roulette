import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "articles");

export interface ArticleData {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// 9月10日から今日までのランダムな日付を生成する関数
function getRandomDate() {
  const start = new Date("2025-09-10").getTime();
  const end = new Date().getTime();
  const randomTime = start + Math.random() * (end - start);
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split("T")[0]; // YYYY-MM-DD形式
}

export function getAllArticles(): Omit<ArticleData, "content">[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: getRandomDate(),
      author: "webでルーレット",
      excerpt: matterResult.data.excerpt,
      tags: matterResult.data.tags || [],
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleBySlug(slug: string): ArticleData {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title,
    date: getRandomDate(),
    author: "webでルーレット",
    excerpt: matterResult.data.excerpt,
    content: matterResult.content,
    tags: matterResult.data.tags || [],
  };
}

export function getAllArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ""),
    };
  });
}
