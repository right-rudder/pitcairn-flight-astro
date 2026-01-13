// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://pitcairnflightacademy.com",
  integrations: [
    react(),
    sitemap({
      entryLimit: 45000,

      // 1. Filter out technical and system pages
      filter: (page) => {
        const isErrorPage = page.includes("/404") || page.includes("/500");
        const isDynamicParam = page.includes("?") || page.includes("#");
        // Returns false to exclude, true to include in the sitemap
        return !isErrorPage && !isDynamicParam;
      },

      // 2. Map priorities based on your folder structure
      serialize: (item) => {
        const { pathname } = new URL(item.url);
        const today = new Date().toISOString().split("T")[0];

        /**
         * TRAILING SLASH FIX:
         * To ensure comparisons work regardless of build settings,
         * we create a 'cleanPath' that removes the trailing slash.
         * Example: "/contact/" becomes "/contact"
         */
        const cleanPath =
          pathname.endsWith("/") && pathname !== "/"
            ? pathname.slice(0, -1)
            : pathname;

        // Homepage (Root is always just "/")
        if (pathname === "/") {
          return {
            ...item,
            priority: 1.0,
            changefreq: "daily",
            lastmod: today,
          };
        }

        // Educational/Core Programs (High Priority)
        if (cleanPath.startsWith("/programs")) {
          return {
            ...item,
            priority: 0.9,
            changefreq: "monthly",
            lastmod: today,
          };
        }

        // Inventory/Aircraft Pages
        if (cleanPath.startsWith("/aircraft")) {
          return {
            ...item,
            priority: 0.8,
            changefreq: "monthly",
            lastmod: today,
          };
        }

        // Dynamic Content (Blog)
        if (cleanPath.startsWith("/blog")) {
          return {
            ...item,
            priority: 0.7,
            changefreq: "weekly",
            lastmod: today,
          };
        }

        // Team and Staff
        if (cleanPath.startsWith("/crew")) {
          return {
            ...item,
            priority: 0.6,
            changefreq: "monthly",
            lastmod: today,
          };
        }

        // Conversion Pages (High Priority for Business)
        const conversionPages = [
          "/enroll",
          "/contact",
          "/financing",
          "/new-to-flying",
        ];
        if (conversionPages.includes(cleanPath)) {
          return {
            ...item,
            priority: 0.8,
            changefreq: "monthly",
            lastmod: today,
          };
        }

        // Legal and Static info (Lower Priority)
        const legalPages = [
          "/privacy-policy",
          "/terms-of-service",
          "/faqs",
          "/about",
        ];
        if (legalPages.includes(cleanPath)) {
          return {
            ...item,
            priority: 0.4,
            changefreq: "yearly",
            lastmod: today,
          };
        }

        // Default fallback for any other page not caught above
        return {
          ...item,
          priority: 0.5,
          changefreq: "monthly",
          lastmod: today,
        };
      },
    }),
  ],
  // 'static' is the default, ensures all routes are pre-rendered for the sitemap
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
