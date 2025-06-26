"use client";

import { useEffect, useState } from "react";
import ArticleCard, { Article } from "./ArticleCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListArticlesProps {
  categoryId?: string;
  search?: string;
}

export default function ListArticles({
  categoryId,
  search,
}: ListArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      try {
        let url = `https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`;
        if (categoryId) url += `&category=${categoryId}`;
        if (search) url += `&title=${encodeURIComponent(search)}`;
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.data);
        setTotal(data.total);
      } catch {
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page, limit, categoryId, search]);

  return (
    <div>
      <p className="mb-4 text-gray-600 text-sm">
        Showing: {articles.length} of {total} articles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
        {loading ? (
          Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 animate-pulse rounded-xl h-[340px] flex flex-col p-4 shadow border border-gray-200"
            >
              <div className="rounded-xl bg-gray-200 h-40 mb-4 w-full" />
              <div className="h-3 w-1/2 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
              <div className="h-3 w-full bg-gray-200 rounded mb-2" />
              <div className="flex gap-2 mt-auto">
                <div className="bg-blue-100 h-6 w-16 rounded-full" />
                <div className="bg-gray-100 h-6 w-16 rounded-full" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-3 text-center text-red-500">{error}</div>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 flex items-center gap-2 bg-white disabled:opacity-50"
        >
          <ChevronLeft /> Previous
        </button>
        <span className="px-2">{page}</span>
        <button
          onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
          disabled={page * limit >= total}
          className="px-3 py-1 flex items-center gap-2 bg-white disabled:opacity-50"
        >
          Next
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
