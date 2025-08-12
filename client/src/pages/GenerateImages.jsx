import { Image, Sparkles, SparklesIcon } from "lucide-react";
import React, { useState } from "react";

const GenerateImages = () => {
  const imageCategories = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];
  const [isSelected, setIsSelected] = useState(imageCategories[0]);
  const [input, setInput] = useState("");

  const [publish, setPublish] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input, isSelected);
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-indigo-500" />
          <h1 className="text-xl font-semibold">AI image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-purple-600 resize-none"
          placeholder="The future of artificial intelligence is..."
          required
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}></textarea>
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageCategories.map((item) => (
            <span
              key={item}
              className={`text-xs px-4 py-1 border ${
                isSelected === item
                  ? "border-purple-400 bg-purple-50 text-purple-600"
                  : "border-zinc-500/30"
              }  rounded-full cursor-pointer`}
              onClick={() => setIsSelected(item)}>
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              name=""
              className="sr-only peer"
              onChange={(e) => setPublish(e.target.value)}
              checked={publish}
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button className="w-full flex justify-center items-center gap-2 bg-gradient text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <SparklesIcon className="w-4 h-4" />
          Generate Image
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Generated image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <p>Enter a topic and click “Generated image” to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;
