"use client";
import { Search } from "lucide-react";
import ListArticles from "../components/listArticles";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        const data = await res.json();
        setCategories(data.data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="font-archivo">
      <div
        style={{
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative z-10 w-full min-h-[560] mt-16 sm:mt-0 sm:min-h-[500] flex items-center justify-center opacity-[86%]"
      >
        <div className="absolute w-full h-full bg-primary opacity-[86%] z-20"></div>
        <div className="z-30 text-white text-center space-y-4 p-4 sm:p-0">
          <h5 className="font-bold text-sm">Blog genzet</h5>
          <h1
            style={{ fontFamily: "" }}
            className="font-semibold text-[36px] sm:text-[48px] leading-10 sm:leading-[56px]"
          >
            The Journal : Design Resources, <br />
            Interviews, and Industry News
          </h1>
          <h3 className="sm:text-2xl text-xl font-extralight">
            Your daily dose of design insights!
          </h3>
          <div className="bg-blue-500 sm:flex p-3 space-y-4 sm:space-y-0 gap-4 rounded-xl max-w-2xl mx-auto mt-8">
            <select
              className="rounded-md w-full sm:w-auto px-4 py-2 bg-white text-gray-900 focus:outline-none sm:min-w-[170px] shadow-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">
                All category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="flex items-center bg-white rounded-md px-4 py-2 flex-1 shadow-sm">
              <Search className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search articles"
                className="bg-transparent outline-none text-gray-900 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 sm:px-16 sm:py-8">
        <ListArticles categoryId={selectedCategory} search={search} />
      </div>
    </div>
  );
}
