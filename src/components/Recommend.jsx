import { useState } from "react";

const Recommend = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setReply("");

    try {
     const response = await fetch("https://cinephile-stream-backend-ooc9.vercel.app/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">
        AI Movie & Series Recommendations
      </h1>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        Tell me your mood, ask for comparisons, or what to watch next.
      </p>

      <div className="w-full max-w-2xl">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="I want something funny and short..."
            className="flex-1 p-3 rounded bg-gray-800 text-white outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-[#e50914] px-6 py-3 rounded font-bold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "..." : "Ask"}
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-400">Thinking...</p>
        )}

        {reply && (
          <div className="bg-gray-800 rounded-lg p-6 whitespace-pre-line">
            {reply}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;