import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const members = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/members" }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    filters: z.array(z.string()),
    joined: z.string(),
    isNew: z.boolean(),
    listed: z.boolean(),
    logo: z.string(),
    logoOnDark: z.boolean(),
    order: z.number(),
    sourceUrl: z.string().url(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    image: z.string(),
    sourceUrl: z.string().url(),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/documents" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    file: z.string(),
    sourceUrl: z.string().url(),
    order: z.number(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { members, articles, documents, pages };
