import ArticleCard, { Article } from "../../../components/ArticleCard";
// import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getArticle(id: string): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}

async function getOtherArticles(
  categoryId: string,
  currentId: string
): Promise<Article[]> {
  const res = await fetch(
    `${BASE_URL}/articles?category=${categoryId}&limit=4`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  // Filter out the current article and take 3 others
  return data.data.filter((a: Article) => a.id !== currentId).slice(0, 3);
}

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function DetailArticlePage({ params }: PageProps) {
  const article = await getArticle(params.id);
  const otherArticles = await getOtherArticles(article.category.id, params.id);
  return (
    <div className="max-w-3xl mt-20 md:max-w-6xl mx-auto py-6 px-2 sm:px-4 md:px-8 font-archivo">
      <div className="text-center mb-2 text-xs text-gray-500">
        {new Date(article.createdAt).toLocaleDateString()} &nbsp;•&nbsp; Created
        by {article.user?.username}
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight sm:leading-snug">
        {article.title}
      </h1>
      <div className="flex justify-center mb-6 sm:mb-8">
        <img
          src={article.imageUrl || "/background.jpg"}
          alt={article.title}
          className="rounded-xl w-full max-w-[700px] aspect-video object-cover shadow border border-gray-200"
        />
      </div>
      <div
        className="prose prose-sm sm:prose lg:prose-lg mx-auto text-justify break-words"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      {/* Other Articles Section */}
      {otherArticles.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Other articles
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
