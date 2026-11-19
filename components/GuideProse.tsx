import { Fragment } from "react";

/** Guide copy is plain text with optional `code` and **emphasis**. Render
 * those two tokens as React elements; never interpret the source as HTML. */
export function GuideProse({ text }: { text: string }) {
  return text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*)/g).map((part, index) => {
    if (index % 2 === 0) return <Fragment key={index}>{part}</Fragment>;
    if (part.startsWith("`")) {
      return <code key={index} dir="ltr" className="rounded bg-panel2 px-1 text-chalk">{part.slice(1, -1)}</code>;
    }
    return <strong key={index} className="font-semibold text-chalk">{part.slice(2, -2)}</strong>;
  });
}
