"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard, { Article } from "../../../components/ArticleCard";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Page() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [otherArticles, setOtherArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/articles/${params.id}`);
        const article: Article = res.data;
        setTitle(article.title);
        setContent(article.content);
        setImageUrl(article.imageUrl || "/background.jpg");
        setCreatedAt(article.createdAt);
        setUsername(article.user?.username || "");
        fetchOtherArticles(article.category.id, article.id);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text:
            err instanceof Error ? err.message : "Failed to fetch article data",
          icon: "error",
        });
        return err;
      }
    };

    fetchArticle();
  }, [params.id]);

  const fetchOtherArticles = async (categoryId: string, currentId: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/articles?category=${categoryId}&limit=4`
      );
      const data = res.data.data
        .filter((a: Article) => a.id !== currentId)
        .slice(0, 3);
      setOtherArticles(data);
    } catch {
      setOtherArticles([]);
    }
  };

  return (
    <div className="max-w-3xl mt-20 md:max-w-6xl mx-auto py-6 px-2 sm:px-4 md:px-8 font-archivo">
      <div className="text-center mb-2 text-xs text-gray-500">
        {createdAt && new Date(createdAt).toLocaleDateString()} &nbsp;•&nbsp;
        Created by {username}
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight sm:leading-snug">
        {title}
      </h1>
      <div className="flex justify-center mb-6 sm:mb-8">
        <img
          src={imageUrl || "/background.jpg"}
          alt={title}
          className="rounded-xl w-full max-w-[700px] aspect-video object-cover shadow border border-gray-200"
        />
      </div>
      <div
        className="prose prose-sm sm:prose lg:prose-lg mx-auto text-justify break-words"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {otherArticles.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Other articles
          </h2>
          <div className="flex flex-col sm:grid grid-cols-3 gap-4 sm:gap-6">
            {otherArticles.map((a: Article) => (
              <div key={a.id} className="flex-1 min-w-0">
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
