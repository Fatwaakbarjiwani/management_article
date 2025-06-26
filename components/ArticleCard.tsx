"use client";
import React from "react";
import { useRouter } from "next/navigation";

export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  category: { id: string; name: string };
  user: { username: string };
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col font-archovo cursor-pointer transition-shadow h-full"
      onClick={() => router.push(`/detailArticles/${article.id}`)}
    >
      <img
        src={article.imageUrl || "/background.jpg"}
        alt={article.title}
        className="rounded-xl h-[240] shadow border border-gray-200 object-cover mb-4"
        loading="lazy"
      />
      <div className="text-xs text-gray-500 mb-1">
        {new Date(article.createdAt).toLocaleDateString()}
      </div>
      <h2 className="font-semibold text-lg mb-2 line-clamp-2">
        {article.title}
      </h2>
      <div
        className="text-sm text-gray-700 mb-2 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
          {article.category?.name}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {article.user?.username}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
