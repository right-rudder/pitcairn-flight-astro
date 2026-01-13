import type { APIRoute } from "astro";

/**
 * Robots.txt Generator for {COMPANY_NAME} (Mil2ATP)
 * Locked to PRODUCTION mode. May need to update to get enviroment like the RRM Astro project does
 * Optimized for a Flight School SEO, security, and AI scraping protection
 */

const getRobotsTxt = (baseURL: string) => {
  const sitemapURL = new URL("sitemap-index.xml", baseURL);

  // 1. HEADER & GLOBAL RULES
  let robotsContent = `# {COMPANY_NAME} - Robots.txt
# Generated: ${new Date().toISOString()}
# Mode: Production (Forced)
# Optimized for Flight School SEO

# Allow all well-behaved crawlers
User-agent: *
Allow: /

# Google-specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing crawler settings
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Social Media Crawlers (Crucial for sharing flight school content)
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

`;

  // 2. SECURITY & SYSTEM PROTECTION
  robotsContent += `# Security and Privacy Directives
# Block access to system files
Disallow: /admin/
Disallow: /private/
Disallow: /dashboard/
Disallow: /_astro/
Disallow: /.well-known/
Disallow: /tmp/

# Block access to raw data files
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*.txt$
Disallow: /*.config$
Disallow: /*.env$

# Block tracking parameters to prevent duplicate content issues
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /*?*fbclid=*

# Block confirmation and thank you pages (Conversion Goals)
# We don't want users landing here directly from Google
Disallow: /*-confirmation
Disallow: /*-confirmation/
Disallow: /thank-you*
Disallow: /thankyou*
Disallow: /success*

`;

  // 3. FLIGHT SCHOOL CONTENT PRIORITIZATION
  robotsContent += `# Explicitly allow High-Value Content
# Guiding bots to the core training products
Allow: /programs/
Allow: /programs/*
Allow: /aircraft/
Allow: /aircraft/*
Allow: /crew/
Allow: /crew/*
Allow: /blog/
Allow: /blog/*
Allow: /about/
Allow: /contact/
Allow: /enroll/
Allow: /financing/
Allow: /new-to-flying/
Allow: /faqs/

# Allow important static assets for rendering
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.svg$

`;

  // 4. PERFORMANCE & DISCOVERY
  robotsContent += `# Crawler Performance Optimization
Crawl-delay: 1

# Sitemap & RSS References
Sitemap: ${sitemapURL.href}
Sitemap: ${new URL("rss.xml", baseURL).href}

# SEO Directives
Host: mil2atp.com
`;

  // 5. BAD BOT & AI PROTECTION
  robotsContent += `# Bad Bot & AI Scraper Protection
# Block AI models from scraping content without permission
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

# Block Aggressive SEO Tools (Keeps competitor research harder)
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: PetalBot
Disallow: /
`;

  return robotsContent.trim();
};

export const GET: APIRoute = ({ site }) => {
  // Hardcoded base URL as requested for simplicity
  const baseURL = "https://mil2atp.com";

  const robotsContent = getRobotsTxt(baseURL);

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "X-Content-Type-Options": "nosniff",
    },
  });
};
