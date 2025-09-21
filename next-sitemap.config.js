/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://webroulette.netlify.app", // あなたのサイトのURL
  generateRobotsTxt: true, // robots.txtも自動生成する場合
  sitemapSize: 7000, // 1つのサイトマップファイルに含めるURLの最大数
  outDir: "./public", // App Routerのルートに出力
  exclude: ["/mypage/*", "/auth", "/profile/*"],
};
