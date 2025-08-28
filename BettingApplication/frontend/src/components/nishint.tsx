"use client";

import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react"
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Trophy, 
  AlertCircle, 
  X, 
  Check, 
  Coins, 
  TrendingUp, 
  Loader,
  Wallet
} from "lucide-react";

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

interface UserMoneyData {
  getUserMoney: {
    email: string;
    money: number;
  };
}

interface UserMoneyVars {
  email: string;
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

const GET_USER_MONEY = gql`
  query GetUserMoney($email: String!) {
    getUserMoney(email: $email) {
      email
      money
    }
  }
`;

const WITHDRAW_MONEY = gql`
  mutation WithdrawMoney($email: String!, $amount: Int!) {
    withdrawMoney(email: $email, amount: $amount) {
      email
      balance
      withdrawn
    }
  }
`;

interface NishineProps {
  cricketMatchId: string;
  userEmail: string;
}

const Nishine: React.FC<NishineProps> = ({ cricketMatchId, userEmail }) => {
  const { loading, error, data } = useQuery<CricketMatchData, CricketMatchVars>(
    GET_CRICKET_MATCH,
    { variables: { cricketMatchId } }
  );

  const { data: userMoneyData, loading: userMoneyLoading, refetch: refetchUserMoney } = 
    useQuery<UserMoneyData, UserMoneyVars>(GET_USER_MONEY, {
      variables: { email: userEmail },
      skip: !userEmail
    });

  const [withdrawMoney, { loading: withdrawalLoading }] = useMutation(WITHDRAW_MONEY);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [quickBetAmounts] = useState<number[]>([100, 500, 1000, 2000]);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (data?.cricketMatch?.dateTimeGMT) {
      const updateCountdown = () => {
        const matchTime = new Date(data.cricketMatch.dateTimeGMT).getTime();
        const now = new Date().getTime();
        const distance = matchTime - now;
        
        if (distance < 0) {
          setCountdown("LIVE");
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000);
      
      return () => clearInterval(interval);
    }
  }, [data]);

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setShowBetModal(true);
  };

  const handleQuickSelect = (amount: number) => {
    setBetAmount(amount.toString());
  };

  const handleBetSubmit = async () => {
    const amount = parseInt(betAmount);
    
    if (!amount || amount <= 0) {
      alert("Please enter a valid bet amount");
      return;
    }
    
    if (userMoneyData?.getUserMoney?.money && amount > userMoneyData.getUserMoney.money) {
      alert("Insufficient balance");
      return;
    }

    try {
      await withdrawMoney({
        variables: {
          email: userEmail,
          amount: amount,
        },
      });

      // Refetch user money data to update the balance
      refetchUserMoney();
      
      setBetPlaced(true);
      setTimeout(() => {
        setSelectedTeam(null);
        setBetAmount("");
        setShowBetModal(false);
        setBetPlaced(false);
      }, 3000);
    } catch (err: any) {
      console.error("Bet Error:", err);
      alert(err.message || "Failed to place bet");
    }
  };

  const handleCancelBet = () => {
    setSelectedTeam(null);
    setBetAmount("");
    setShowBetModal(false);
  };

  if (loading || userMoneyLoading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading match data...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <AlertCircle size={48} />
      <h3>Error Loading Match</h3>
      <p>{error.message}</p>
      <button className="retry-button" onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
  
  if (!data?.cricketMatch) return (
    <div className="error-container">
      <AlertCircle size={48} />
      <h3>No Match Found</h3>
      <p>Please check the match ID and try again.</p>
    </div>
  );

  const match = data.cricketMatch;
  const userBalance = userMoneyData?.getUserMoney?.money || 0;

  return (
    <div className="nishine-container">
      {/* User Balance Bar */}
      <div className="user-balance-bar">
        <div className="balance-info">
          <Wallet size={16} />
          <span>Balance: ₹{userBalance.toLocaleString()}</span>
        </div>
        <div className="match-countdown">
          <Clock size={16} />
          <span>{countdown}</span>
        </div>
      </div>

      {betPlaced ? (
        <motion.div 
          className="bet-confirmation"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>Bet Placed Successfully!</h2>
          <p>
            Your bet of ₹{betAmount} on {selectedTeam} has been confirmed.
          </p>
          <p className="new-balance">New Balance: ₹{(userBalance).toLocaleString()}</p>
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="match-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="series-info">
              <Trophy size={18} />
              <h2>{match.series}</h2>
            </div>
            <div className="match-details">
              <div className="match-type">{match.matchType}</div>
              <div className="match-status">{match.status}</div>
            </div>
          </motion.div>

          <div className="teams-container">
            <motion.button
              className="team-card"
              onClick={() => handleTeamSelect(match.t1)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="team-image">
                <img src={match.t1img} alt={match.t1} />
              </div>
              <span className="team-name">{match.t1}</span>
              <span className="team-score">{match.t1s || "0"}</span>
              <div className="bet-button">Bet Now</div>
            </motion.button>

            <div className="vs-divider">
              <span>VS</span>
            </div>

            <motion.button
              className="team-card"
              onClick={() => handleTeamSelect(match.t2)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="team-image">
                <img src={match.t2img} alt={match.t2} />
              </div>
              <span className="team-name">{match.t2}</span>
              <span className="team-score">{match.t2s || "0"}</span>
              <div className="bet-button">Bet Now</div>
            </motion.button>
          </div>
        </>
      )}

      <AnimatePresence>
        {showBetModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelBet}
          >
            <motion.div 
              className="bet-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Place Your Bet</h3>
                <button className="close-button" onClick={handleCancelBet}>
                  <X size={20} />
                </button>
              </div>

              <div className="selected-team-section">
                <div className="selected-team-image">
                  <img
                    src={selectedTeam === match.t1 ? match.t1img : match.t2img}
                    alt={selectedTeam || ""}
                  />
                </div>
                <p>
                  You're betting on <strong>{selectedTeam}</strong>
                </p>
              </div>

              <div className="balance-info">
                <span>Your Balance: ₹{userBalance.toLocaleString()}</span>
              </div>

              <div className="bet-input-section">
                <label htmlFor="betAmount">Enter Bet Amount (₹):</label>
                <div className="input-with-validation">
                  <input
                    type="number"
                    id="betAmount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    max={userBalance}
                  />
                  {betAmount && parseInt(betAmount) > userBalance && (
                    <span className="error-text">Exceeds your balance</span>
                  )}
                </div>
                
                <div className="quick-bet-options">
                  <span>Quick Select:</span>
                  <div className="quick-bet-buttons">
                    {quickBetAmounts.map(amount => (
                      <button
                        key={amount}
                        className={`quick-bet-btn ${betAmount === amount.toString() ? 'active' : ''}`}
                        onClick={() => handleQuickSelect(amount)}
                        disabled={amount > userBalance}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={handleCancelBet}>
                  Cancel
                </button>
                <button 
                  className="confirm-btn"
                  onClick={handleBetSubmit}
                  disabled={!betAmount || parseInt(betAmount) <= 0 || 
                    parseInt(betAmount) > userBalance || withdrawalLoading}
                >
                  {withdrawalLoading ? <Loader className="spinner" size={18} /> : "Confirm Bet"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nishine-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #333;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .user-balance-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 12px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .balance-info, .match-countdown {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .balance-info {
          color: #10b981;
        }

        .match-countdown {
          color: #6366f1;
          background: #f0f9ff;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-container {
          text-align: center;
          padding: 40px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .error-container h3 {
          margin: 16px 0 8px;
          color: #ef4444;
        }

        .retry-button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          margin-top: 16px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .retry-button:hover {
          background: #4f46e5;
          transform: translateY(-2px);
        }

        .match-header {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .series-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .series-info h2 {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .match-details {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .match-type, .match-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f1f5f9;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .teams-container {
          display: flex;
          gap: 24px;
          justify-content: space-between;
          position: relative;
        }

        .team-card {
          flex: 1;
          background: white;
          border: none;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .team-card:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .team-image {
          width: 80px;
          height: 80px;
          margin-bottom: 16px;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .team-name {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .team-score {
          font-size: 1.5rem;
          font-weight: 800;
          color: #6366f1;
          margin-bottom: 16px;
        }

        .bet-button {
          background: #6366f1;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          width: 100%;
          text-align: center;
        }

        .vs-divider {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .bet-confirmation {
          background: white;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .bet-confirmation h2 {
          margin: 0 0 12px;
          color: #10b981;
        }

        .new-balance {
          margin-top: 10px;
          font-weight: 600;
          color: #6366f1;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .bet-modal {
          background: white;
          border-radius: 20px;
          padding: 0;
          width: 100%;
          max-width: 500px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 4px;
        }

        .close-button:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .selected-team-section {
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .selected-team-image {
          width: 100px;
          height: 100px;
          margin: 0 auto 16px;
        }

        .selected-team-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .balance-info {
          padding: 16px 24px;
          background: #f0f9ff;
          text-align: center;
          font-weight: 600;
          color: #0369a1;
        }

        .bet-input-section {
          padding: 24px;
        }

        .bet-input-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .input-with-validation {
          margin-bottom: 16px;
        }

        .bet-input-section input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .bet-input-section input:focus {
          outline: none;
          border-color: #6366f1;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 4px;
          display: block;
        }

        .quick-bet-options {
          margin-top: 16px;
        }

        .quick-bet-options span {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .quick-bet-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .quick-bet-btn {
          padding: 8px 12px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .quick-bet-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .quick-bet-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quick-bet-btn.active {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }

        .modal-actions {
          padding: 16px 24px 24px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          border-top: 1px solid #e5e7eb;
        }

        .cancel-btn, .confirm-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #e5e7eb;
        }

        .cancel-btn:hover {
          background: #e5e7eb;
        }

        .confirm-btn {
          background: #6366f1;
          color: white;
          border: none;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #4f46e5;
        }

        .confirm-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .teams-container {
            flex-direction: column;
          }
          
          .vs-divider {
            position: relative;
            margin: 20px 0;
            align-self: center;
            top: 0;
            left: 0;
            transform: none;
          }
          
          .match-details {
            flex-direction: column;
            gap: 8px;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .quick-bet-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Nishine;



