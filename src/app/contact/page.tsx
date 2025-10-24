"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "err"; msg: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name || !email || !message) {
      setStatus({ type: "err", msg: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send. Please try again.");
      }

      setStatus({ type: "ok", msg: "Thanks! Your message has been sent." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus({ type: "err", msg: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-start sm:items-center">
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 mt-10 sm:mt-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-700 text-center mb-2">
          Contact & Feedback
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Have questions or feedback about the CPC Salary Calculator? Send us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Message or Feedback</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Type your message here..."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit Feedback"}
          </button>

          {status && (
            <div
              className={`mt-2 text-sm rounded-md px-3 py-2 ${
                status.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {status.msg}
            </div>
          )}
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            For urgent queries, email us at{" "}
            <span className="font-semibold">cpcforgovtemployees@gmail.com</span>.
          </p>
          <p className="mt-2">
            We use your details only to respond to your message. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
