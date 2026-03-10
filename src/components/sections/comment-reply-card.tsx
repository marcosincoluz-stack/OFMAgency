"use client";

import { cn } from "@/lib/utils";

interface Comment {
  id: number;
  user: string;
  text: string[];
  time: string;
  avatarColor: string;
}

function CommentReplyCard({
  initialComments,
  className,
}: {
  initialComments: Comment[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-border/60 bg-card/95 p-4 shadow-lg",
        className
      )}
    >
      {initialComments.map((comment) => (
        <article key={comment.id} className="rounded-xl border border-border/50 bg-background/90 p-3">
          <header className="mb-2 flex items-center gap-2">
            <span
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: comment.avatarColor }}
            >
              {comment.user.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{comment.user}</p>
              <p className="text-xs text-muted-foreground">{comment.time}</p>
            </div>
          </header>

          <div className="space-y-1">
            {comment.text.map((line, idx) => (
              <p key={`${comment.id}-${idx}`} className="text-sm leading-relaxed text-foreground/90">
                {line}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default CommentReplyCard;
export { CommentReplyCard };
