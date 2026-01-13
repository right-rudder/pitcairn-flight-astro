import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  // Fetch the blog collection defined in your config
  const posts = await getCollection("blog");

  return rss({
    // Basic feed metadata
    title: "{COMPANY_NAME} | Mil2ATP Blog",
    description:
      "Expert flight training advice, aircraft insights, and career guides for aspiring pilots.",
    site: context.site || "https://mil2atp.com",

    // Process each post into an RSS item
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Generates the URL based on the slug: /blog/your-post-slug
      link: `/blog/${post.slug}/`,
    })),

    // Optional: add custom XSL stylesheet if you have one, or simple language tag
    customData: `<language>en-us</language>`,
  });
};
