import { HashIcon, Sparkle, Sparkles } from "lucide-react";
import React, { useState } from "react";

import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import Loader from "../components/ui/Loader";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "Technology",
    "Business",
    "Health",
    "Politics",
    "Sports",
    "Education",
    "Entertainment",
    "Travel",
    "Food",
  ];
  const [isSelected, setIsSelected] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write a blog title about ${input} in ${isSelected}.`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <HashIcon className="w-5 h-5 text-indigo-500" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-pink-600"
          placeholder="The future of artificial intelligence is..."
          required
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              key={item}
              className={`text-xs px-4 py-1 border ${
                isSelected === item
                  ? "border-pink-400 bg-pink-50 text-pink-600"
                  : "border-zinc-500/30"
              }  rounded-full cursor-pointer`}
              onClick={() => setIsSelected(item)}>
              {item}
            </span>
          ))}
        </div>
        <button className="w-full flex justify-center items-center gap-2 bg-gradient text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          {loading ? <Loader /> : <Sparkles className="w-4 h-4" />}
          Generate Title
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Sparkles className="w-8 h-8 text-pink-500" />
              <p>Enter a topic and click “Generated title” to get started</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="reset-tw">
              <Markdown> {content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
