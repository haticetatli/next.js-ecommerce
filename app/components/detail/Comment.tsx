"use client";

import { Rating } from "@mui/material";
import { Review } from "@/types";
import { MdVerified } from "react-icons/md";

interface CommentProps {
  prd: Review;
}

const Comment = ({ prd }: CommentProps) => {
  const authorName = prd.user?.name || "Ziyaretçi";
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs md:text-sm text-gray-900">
                {authorName}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                <MdVerified size={12} />
                Doğrulanmış
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              {prd.createdDate ? new Date(prd.createdDate).toLocaleDateString("tr-TR") : "Yakın zamanda"}
            </span>
          </div>
        </div>

        <Rating
          name="read-only"
          value={Number(prd.rating || 5)}
          readOnly
          size="small"
          precision={0.5}
        />
      </div>

      <p className="text-xs md:text-sm text-gray-600 leading-relaxed pl-13">
        {prd.comment}
      </p>
    </div>
  );
};

export default Comment;