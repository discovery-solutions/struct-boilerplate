// lib/getMarkdown.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMarkdown(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, data };
}
