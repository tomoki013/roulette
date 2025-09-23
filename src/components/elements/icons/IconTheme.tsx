import Link from "next/link";

interface IconThemeProps {
  href: string;
  children: React.ReactNode;
}

const IconTheme = ({ href, children }: IconThemeProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl hover:text-yellow-300 transition-colors"
    >
      {children}
    </Link>
  );
};

export default IconTheme;
