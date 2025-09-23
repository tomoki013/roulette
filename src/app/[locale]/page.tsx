import { getAllArticles } from "@/lib/articles";
import HomePageClient from "./HomePageClient";

// This is a server component
const Page = async () => {
  const articles = getAllArticles().slice(0, 3);
  return <HomePageClient articles={articles} />;
};

export default Page;
