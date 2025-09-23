import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { ArticleData } from "@/lib/articles";
import { CustomLink } from "./CustomMarkdown";

interface ArticleProps {
  article: ArticleData;
  locale: string;
}

const Article = ({ article, locale }: ArticleProps) => {
  const markdownComponents: Components = {
    a: (props: React.ComponentProps<"a">) => (
      <CustomLink {...props} locale={locale} href={props.href ?? ""}>
        {props.children}
      </CustomLink>
    ),
  };
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
      <article
        className="prose prose-invert prose-lg max-w-none
                                prose-headings:text-yellow-300 prose-a:text-yellow-400 prose-strong:text-white
                                prose-blockquote:border-l-yellow-300 prose-blockquote:text-white/80
                                prose-hr:border-white/20"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkToc]}
          components={markdownComponents}
        >
          {article.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default Article;
