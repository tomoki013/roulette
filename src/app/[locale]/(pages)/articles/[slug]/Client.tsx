"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { ArticleData } from "@/lib/articles";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

interface ArticleDetailClientProps {
  article: ArticleData;
}

const ArticleDetailClient = ({ article }: ArticleDetailClientProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto text-white"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center text-sm text-white/60 space-x-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{article.author}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <article
          className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-yellow-300 prose-a:text-yellow-400 prose-strong:text-white
                            prose-blockquote:border-l-yellow-300 prose-blockquote:text-white/80
                            prose-hr:border-white/20"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkToc]}>
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </motion.div>
  );
};

export default ArticleDetailClient;
