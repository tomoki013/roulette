import Link from "next/link";

interface CustomLinkProps {
  locale: string;
  href: string;
  children: React.ReactNode;
}

/**
 * @param {object} props
 * @param {string} props.href - リンク先のURL
 * @param {React.ReactNode} props.children - リンクのテキスト
 * @param {Post[]} props.allPosts - すべての投稿データの配列
 * @param {string} props.currentPostCategory - 現在表示している投稿のタイプ
 */
export const CustomLink = ({ locale, href, children }: CustomLinkProps) => {
  const hrefStr = href || "";

  // 外部リンクやその他のリンクの場合
  // hrefが"/"から始まる内部リンクはNext.jsのLinkコンポーネントを使用
  if (hrefStr.startsWith("/")) {
    return <Link href={`/${locale}${hrefStr}`}>{children}</Link>;
  }

  // それ以外の外部リンク
  return (
    <a href={hrefStr} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
