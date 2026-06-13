import { useState } from "react";
import type { PrioritizedCommentator } from "../../../types/Fixture";

interface CommentatorLabelProps {
  commentators: PrioritizedCommentator[];
}

export default function CommentatorLabel({ commentators }: CommentatorLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!commentators || commentators.length === 0) return null;
  commentators.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const main = commentators[0];
  const others = commentators.slice(1);

  return (
    <div className="replace:flex-1 pr-4 w-fit flex items-center space-x-1 relative bg-blue-500 rounded-full">
      {/* Avatars */}
      <div className="flex-shrink-0 flex items-center relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <div className="flex items-end -space-x-3">
          {[main, ...others.slice(0, 3)].map((pc, i) => (
            <img
              key={i}
              src={pc.commentator.avatarUrl ?? "https://avatar.iran.liara.run/public/boy?username=A"}
              alt={pc.commentator.nickname}
              className={`rounded-full border-2 border-white ${i === 0 ? "w-8 h-8 z-10" : "w-6 h-6"} relative`}
              style={{ zIndex: 10 - i }}
            />
          ))}
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full mb-2 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
            {commentators.map((pc) => pc.commentator.nickname).join(", ")}
          </div>
        )}
      </div>

      {/* Name */}
      <span className="block text-xs truncate">
        <span className="font-medium">{main.commentator.nickname}</span>
        <span className="font-light">{others.length > 0 && ` và ${others.length} blv khác`}</span>
      </span>
    </div>
  );
}
