import { ScissorsIcon, Sparkles } from "lucide-react";
import React, { useState } from "react";

import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState({
    file: null,
    object: "",
  });

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!input.file) {
        toast.error("Please upload an image");
        return;
      }
      if (input.object.trim() === "") {
        toast.error("Please enter object name");
        return;
      }
      if (input.object.trim().split(" ").length > 1) {
        toast.error("Please enter a single object name");
        return;
      }

      const formData = new FormData();
      formData.append("image", input.file);
      formData.append("object", input.object);
      console.log(formData);
      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
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
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>
        <input
          type="file"
          name=""
          id=""
          required
          onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
          accept="image/png, image/jpeg, image/webp"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-green-600"
        />
        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>
        <textarea
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-green-600 resize-none"
          placeholder="The future of artificial intelligence is..."
          required
          name="object"
          type="text"
          value={input.object}
          onChange={(e) =>
            setInput({ ...input, object: e.target.value })
          }></textarea>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          {loading ? <Loader /> : <ScissorsIcon className="w-4 h-4" />}
          Remove Object
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <ScissorsIcon className="w-8 h-8 text-green-500" />
              <p>Enter a topic and click “Remove Object to get started</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <img
              src={content}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
