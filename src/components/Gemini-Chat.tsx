"use client";

import { useCompletion } from "ai/react";
import { useState } from "react";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();
  const [query, setQuery] = useState("");
  const [Input, setInput] = useState(input);
  const [chatRecord, setChatRecord] = useState([]);

  console.log(completion);
  const handleClick = () => {
    setQuery(input);
  };
  return (
    <div className="w-full h-screen bg-slate-50 ">
      <div className="max-w-4xl mx-auto p-10 mb-4">
        <h1 className="text-center text-2xl font-semibold">
          this place for heading
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-yellow-500 p-8">
        <div className="p-2 mb-4 max-w-4xl mx-auto bg-pink-500">
          <p>user:{query}</p>
        </div>
        <output className="p-2 bg-green-400">AI: {completion}</output>
      </div>
      <div className="w-full bg-purple-500 grid place-content-center">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300
            rounded mb-20 shadow-xl p-2 "
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
          />

          <div className="flex items-center space-x-2">
            {" "}
            <button type="button" onClick={stop}>
              Stop
            </button>
            <button disabled={isLoading} onClick={handleClick}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
