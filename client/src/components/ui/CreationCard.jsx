import React, { useState } from "react";

import Markdown from "react-markdown";

const CreationCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer">
      <div className="flex justify-between items-center gap-4 ">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} -{" "}
            {new Date(item.created_at).toLocaleDateString(
              "en-US",
              item.created_at
            )}
          </p>
        </div>
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>
      {open && (
        <div>
          {item.type === "image" ? (
            <div>
              <img src={item.content} alt="image" className="w-full max-w-md" />
              <p className="mt-3 text-sm text-slate-700">{item.prompt}</p>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown children={item.content}></Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationCard;
