"use client";

import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface CricketMatchData {
  cricketMatch: {
    matchType: string;
    id: string;
    dateTimeGMT: string;
    ms: string;
    series: string;
    status: string;
    t1: string;
    t1img: string;
    t1s: string;
    t2: string;
    t2img: string;
    t2s: string;
  };
}

interface CricketMatchVars {
  cricketMatchId: string;
}

const GET_CRICKET_MATCH = gql`
  query CricketMatches($cricketMatchId: String!) {
    cricketMatch(id: $cricketMatchId) {
      matchType
      id
      dateTimeGMT
      ms
      series
      status
      t1
      t1img
      t1s
      t2
      t2img
      t2s
    }
  }
`;

interface NishineProps {
  cricketMatchId: string;
}

const Nishine: React.FC<NishineProps> = ({ cricketMatchId }) => {
  const { loading, error, data } = useQuery<CricketMatchData, CricketMatchVars>(
    GET_CRICKET_MATCH,
    { variables: { cricketMatchId } }
  );

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setShowBetModal(true);
  };

  const handleBetSubmit = () => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      alert("Please enter a valid bet amount");
      return;
    }

    // Here you would typically send the bet to your backend
    console.log(`Bet placed: ${betAmount} on ${selectedTeam}`);

    // Set bet as placed and reset after a delay
    setBetPlaced(true);
    setTimeout(() => {
      setSelectedTeam(null);
      setBetAmount("");
      setShowBetModal(false);
      setBetPlaced(false);
    }, 3000);
  };

  const handleCancelBet = () => {
    setSelectedTeam(null);
    setBetAmount("");
    setShowBetModal(false);
  };

  if (loading) return <div className="loading">Loading match data...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data?.cricketMatch) return <div className="error">No match found.</div>;

  const match = data.cricketMatch;

  return (
    <div className="match-container">
      {betPlaced ? (
        <div className="bet-confirmation">
          <h2>Bet Placed Successfully!</h2>
          <p>
            Your bet of ${betAmount} on {selectedTeam} has been confirmed.
          </p>
        </div>
      ) : (
        <>
          <div className="match-header">
            <h2>{match.series}</h2>
            <div className="match-info">
              <span className="match-type">{match.matchType}</span>
              <span className="match-status">{match.status}</span>
            </div>
          </div>

          <div className="teams-buttons-container">
            <button
              className="team-button"
              onClick={() => handleTeamSelect(match.t1)}
            >
              <div className="team-image">
                <img src={match.t1img} alt={match.t1} />
              </div>
              <span className="team-name">{match.t1}</span>
            </button>

            <div className="vs-text">VS</div>

            <button
              className="team-button"
              onClick={() => handleTeamSelect(match.t2)}
            >
              <div className="team-image">
                <img src={match.t2img} alt={match.t2} />
              </div>
              <span className="team-name">{match.t2}</span>
            </button>
          </div>
        </>
      )}

      {showBetModal && (
        <div className="modal-overlay">
          <div className="bet-modal">
            <div className="modal-header">
              <h3>Place Your Bet</h3>
              <button className="close-button" onClick={handleCancelBet}>
                ×
              </button>
            </div>

            <div className="selected-team">
              <img
                src={selectedTeam === match.t1 ? match.t1img : match.t2img}
                alt={selectedTeam || ""}
              />
              <p>
                You're betting on <strong>{selectedTeam}</strong>
              </p>
            </div>

            <div className="bet-input">
              <label htmlFor="betAmount">Enter Bet Amount ($):</label>
              <input
                type="number"
                id="betAmount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelBet}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleBetSubmit}>
                Confirm Bet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nishine;

// Styles
const styles = `
<style>
  .match-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .match-header {
    text-align: center;
    margin-bottom: 30px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
  }
  
  .match-header h2 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .match-info {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .match-info span {
    background: #e0e0e0;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    color: #666;
  }
  
  .teams-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  
  .team-button {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
    min-height: 180px;
  }
  
  .team-button:hover {
    transform: translateY(-5px);
    border-color: #4CAF50;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .team-image {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #f0f0f0;
    background: white;
  }
  
  .team-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .team-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .vs-text {
    font-size: 20px;
    font-weight: bold;
    color: #888;
    padding: 0 10px;
  }
  
  .bet-confirmation {
    text-align: center;
    padding: 40px 20px;
    background: #4CAF50;
    color: white;
    border-radius: 10px;
  }
  
  .bet-confirmation h2 {
    margin: 0 0 15px 0;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .bet-modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    padding: 0;
    overflow: hidden;
    color: #333;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: #1a2a6c;
    color: white;
  }
  
  .modal-header h3 {
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
  
  .selected-team {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  
  .selected-team img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  
  .bet-input {
    padding: 20px;
  }
  
  .bet-input label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .bet-input input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .modal-actions {
    display: flex;
    padding: 0 20px 20px;
    gap: 10px;
  }
  
  .modal-actions button {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .cancel-btn {
    background: #e0e0e0;
  }
  
  .cancel-btn:hover {
    background: #d0d0d0;
  }
  
  .confirm-btn {
    background: #4CAF50;
    color: white;
  }
  
  .confirm-btn:hover {
    background: #45a049;
  }
  
  .loading, .error {
    text-align: center;
    padding: 40px;
    font-size: 18px;
  }
  
  @media (max-width: 600px) {
    .teams-buttons-container {
      flex-direction: column;
    }
    
    .vs-text {
      margin: 10px 0;
    }
  }
</style>
`;

// Add the styles to the document
// if (typeof document !== 'undefined') {
//   document.head.innerHTML += styles;
// }

if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}
