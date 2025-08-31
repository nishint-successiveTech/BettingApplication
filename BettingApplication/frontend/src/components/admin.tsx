
"use client";

import { useState } from "react";

const AdminPage = () => {
  const [matchId, setMatchId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const handleDeclareWinner = async () => {
    if (!matchId || !teamId) {
      setMessage("Please enter both Match ID and Team ID");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("info");

    try {
      const res = await fetch("http://localhost:8787/api/confirmBet/winner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId, teamId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to declare winner");

      setMessage("🎉 Winner declared successfully!");
      setMessageType("success");
      console.log("API response:", data);
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Declare the winner for a cricket match
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Match ID</label>
            <input
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Match ID"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Team ID</label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Team ID"
            />
          </div>

          <button
            onClick={handleDeclareWinner}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Declaring..." : "Declare Winner"}
          </button>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
