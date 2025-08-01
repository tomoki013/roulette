// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  	images: {
  	  	remotePatterns: [
  	  	  	{
  	  	  	  	protocol: 'https',
  	  	  	  	hostname: 'flagcdn.com',
  	  	  	  	port: '',
  	  	  	  	pathname: '/**',
  	  	  	},
  	  	],
  	},
};

export default nextConfig;
