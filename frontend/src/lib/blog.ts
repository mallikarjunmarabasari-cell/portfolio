const markdownPosts = import.meta.glob("../content/blog/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export type BlogPost = Omit<BlogFrontmatter, "tags"> & {
  tags: string[];
  slug: string;
  content: string;
};

function stripQuotes(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(rawContent: string) {
  const frontmatterMatch = rawContent.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);

  if (!frontmatterMatch) {
    return { data: {} as Partial<BlogFrontmatter>, content: rawContent };
  }

  const frontmatterLines = frontmatterMatch[1].split(/\r?\n/);
  const data: Partial<BlogFrontmatter> = {};
  const tags: string[] = [];
  let currentKey: keyof BlogFrontmatter | null = null;

  for (const line of frontmatterLines) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const arrayItem = /^-\s*(.+)$/.exec(trimmed);
    if (currentKey === "tags" && arrayItem) {
      tags.push(stripQuotes(arrayItem[1]));
      continue;
    }

    const keyValue = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(trimmed);
    if (!keyValue) {
      continue;
    }

    const key = keyValue[1] as keyof BlogFrontmatter;
    const value = keyValue[2].trim();
    currentKey = value === "" ? key : null;

    if (key === "tags") {
      continue;
    }

    if (key === "title" || key === "date" || key === "description") {
      data[key] = stripQuotes(value) as never;
    }
  }

  if (tags.length > 0) {
    data.tags = tags;
  }

  return {
    data,
    content: rawContent.slice(frontmatterMatch[0].length),
  };
}

function parsePost(path: string, rawContent: string): BlogPost {
  const { data, content } = parseFrontmatter(rawContent);
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? path;
  const frontmatter = data as Partial<BlogFrontmatter>;

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "",
    description: frontmatter.description ?? "",
    tags: frontmatter.tags ?? [],
    content,
  };
}

export const blogPosts = Object.entries(markdownPosts)
  .map(([path, rawContent]) => parsePost(path, rawContent))
  .sort((left, right) => {
    const leftTime = new Date(left.date).getTime();
    const rightTime = new Date(right.date).getTime();
    return rightTime - leftTime;
  });

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}