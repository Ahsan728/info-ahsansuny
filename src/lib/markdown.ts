import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";

export type Heading = { depth: number; id: string; text: string };

/** Markdown → HTML, plus the h2/h3 list for a table of contents. */
export async function renderMarkdown(
  md: string,
  opts: { breaks?: boolean } = {},
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const collect = () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        headings.push({ depth: Number(node.tagName[1]), id: String(node.properties.id), text: toString(node) });
        // Hover "#" anchor after the heading text.
        node.children.push({
          type: "element",
          tagName: "a",
          properties: { href: `#${node.properties.id}`, className: ["heading-anchor"], ariaLabel: "Link to this section" },
          children: [{ type: "text", value: "#" }],
        });
      }
    });
  };
  const md2 = unified().use(remarkParse).use(remarkGfm);
  // Imported blog posts use single line breaks for dialogue: keep them.
  if (opts.breaks) md2.use(remarkBreaks);
  const file = await md2
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(collect)
    .use(rehypeStringify)
    .process(md);
  return { html: String(file), headings };
}
