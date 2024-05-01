"use client";
import { useState } from "react";
import { useCompletion } from "ai/react";
import { LuSendHorizonal } from "react-icons/lu";
type Chat = {
  user: string;
  model: string;
};

const Bookish = () => {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();
  const [query, setQuery] = useState("");
  const [Messages, setMessages] = useState<Chat[]>([]);
  const handleClick = () => {
    setQuery(input);
    //e.preventDefault(); // Prevent the default form submission
    if (query.trim() !== "") {
      const newMessage = { user: query, model: completion };
      setMessages([...Messages, newMessage]); // Update the Messages array
      setQuery("");
    }
  };
  console.log(completion);
  return (
    <section className="max-w-4xl mx-auto bg-slate-400 h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-center p-8">Heading here</h1>
      </div>
      {/* for the content here */}
      <div className="flex flex-col justify-between bg-pink-500 h-[85%]">
        <div className="w-full p-8">
          {Messages.length > 0 ? (
            Messages.map((message, index) => (
              <div key={index} className="flex flex-col items-start space-y-2">
                <p className="ml-10">user:{message.user}</p>
                <p className="ml-10">model:{message.model}</p>
                <p className="ml-10">user:{query}</p>
                <p className="ml-10">model:{completion}</p>
              </div>
            ))
          ) : (
            <p className="text-zinc-800 ml-28">Start a conversation now!</p>
          )}
          {/* <p className="ml-10">user:{query}</p>
          <p className="ml-10">{completion}</p> */}
        </div>

        {/* for the form */}
        <div className="bg-zinc-700 p-8 ">
          <form className="ml-24" onSubmit={handleSubmit}>
            <input
              className="w-[80%] p-4 rounded-md relative border focus:border-zinc-200"
              value={input}
              onChange={handleInputChange}
              placeholder="say something"
            />
            <button
              className="rounded-md -ml-8 mr-2 fixed"
              disabled={isLoading}
              onClick={handleClick}>
              <LuSendHorizonal className="text-zinc-500 text-3xl mt-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Bookish;
