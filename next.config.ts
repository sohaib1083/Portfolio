import type { NextConfig } from "next";
import { links } from "./src/data/profile";

// Short, shareable links: sohaib1083.tech/yt, /in, /gh
const shortLinks: Record<string, string> = {
  yt: links.youtube,
  youtube: links.youtube,
  in: links.linkedin,
  linkedin: links.linkedin,
  gh: links.github,
  github: links.github,
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return [
      { source: "/writing", destination: "/blog", permanent: true },
      ...Object.entries(shortLinks).map(([slug, destination]) => ({
        source: `/${slug}`,
        destination,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
