import { useState } from "react";
import API from "../api/axios";

function Chatbot() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hello 👋 I am Care Plus Assistant. Type 'help' to see available commands.",
      },
    ]);
const quickAsk = async (
  question
) => {

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: question,
    },
  ]);

  try {
    const response =
      await API.post("/chat", {
        message: question,
      });

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: response.data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          "❌ Error communicating with server",
      },
    ]);
  }
};
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {
      const response =
        await API.post("/chat", {
          message,
        });

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Error communicating with server",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-blue-600 to-indigo-800 text-white w-16 h-16 rounded-full shadow-2xl text-2xl z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[95vw] md:w-96 bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden z-50">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-4">

            <h2 className="font-bold text-lg">
              Care Plus Assistant 🤖
            </h2>

            <p className="text-sm text-blue-100">
              Pharmacy ERP Helper
            </p>

          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender ===
                    "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>
              )
            )}

          </div>

          {/* Quick Commands */}
         <div className="px-4 pb-3 flex flex-wrap gap-2">

  <button
  onClick={() =>
  quickAsk("total medicines")
}
    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200"
  >
    💊 Medicines
  </button>

  <button
  onClick={() =>
  quickAsk("low stock")
}
    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200"
  >
    ⚠️ Low Stock
  </button>

  <button
    onClick={() =>
      quickAsk("inventory value")
    }
    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200"
  >
    💰 Inventory
  </button>

  <button
 onClick={() =>
  quickAsk("today revenue")
}
    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200"
  >
    📅 Today Revenue
  </button>

  <button
  onClick={() =>
  quickAsk("monthly revenue")
}
    className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200"
  >
    📈 Monthly Revenue
  </button>

  <button
onClick={() =>
  quickAsk("expiring medicines")
}
    className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-200"
  >
    ⏰ Expiry
  </button>

  <button
    onClick={() =>
      quickAsk("help")
    }
    className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full hover:bg-slate-200"
  >
    ❓ Help
  </button>

</div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Ask something..."
              className="flex-1 border rounded-xl px-3 py-2 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-4 rounded-xl"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;