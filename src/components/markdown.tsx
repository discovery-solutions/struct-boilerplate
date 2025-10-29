import { CodeBlock } from "@/components/code-block";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function Markdown({ className, children, value }: { children?: string, value?: string, className?: string }) {
  const raw = children || value;
  const content = typeof raw === "string" ? raw : JSON.stringify(raw);
  return (
    <div className={cn("prose prose-lg mx-auto", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

const COMPONENTS = {
  h1: withClass("h1", "text-3xl font-semibold mb-2 mt-6"),
  h2: withClass("h2", "font-semibold text-2xl mb-2 mt-6"),
  h3: withClass("h3", "font-semibold text-lg mb-2 mt-6"),
  h4: withClass("h4", "font-semibold text-base mb-2 mt-6"),
  h5: withClass("h5", "font-medium mb-2 mt-6"),
  p: withClass("p", "whitespace-pre-wrap mb-2"),
  a: withClass("a", "transition text-primary/80 hover:text-primary hover:underline underline-offset-2", { target: "_blank" }),
  strong: withClass("strong", "font-semibold"),
  blockquote: withClass("blockquote", "border-l-2 border-primary pl-4"),
  hr: withClass("hr", "my-6 border-foreground/20"),
  ol: withClass("ol", "list-decimal space-y-2 pl-6"),
  ul: withClass("ul", "list-disc space-y-2 pl-6"),
  li: withClass("li", "my-1.5"),
  tr: withClass("tr", "m-0 border-t p-0 even:bg-muted"),
  table: withClass(
    "table",
    "w-full border-collapse overflow-y-auto rounded-md border border-foreground/20"
  ),
  th: withClass(
    "th",
    "border border-foreground/20 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
  ),
  td: withClass(
    "td",
    "border border-foreground/20 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
  ),
  pre: ({ children }: any) => children,
  code: ({ children, className, ...rest }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    return match ? (
      <CodeBlock className={className} language={match[1]} {...rest}>
        {children}
      </CodeBlock>
    ) : (
      <code
        className={cn(
          "font-mono [:not(pre)>&]:rounded-md [:not(pre)>&]:bg-muted/50 [:not(pre)>&]:px-1 [:not(pre)>&]:py-0.5"
        )}
        {...rest}
      >
        {children}
      </code>
    )
  },
}

function withClass(Tag: any, classes: string, extraProps: any = {}) {
  const Component = (props: any) => (
    <Tag className={classes} {...props} {...extraProps} />
  )
  Component.displayName = Tag
  return Component
}