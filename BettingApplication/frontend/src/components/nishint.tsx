"use client";

import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Trophy,
  AlertCircle,
  X,
  Check,
  Wallet,
  History,
} from "lucide-react";
import { SportsCricket, AccountBalanceWallet } from "@mui/icons-material";

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

interface Bet {
  id: string;
  team: string;
  amount: number;
  date: string;
  matchId: string;
  matchType: string;
  teamLogo: string;
  status: "pending" | "won" | "lost";
  timestamp: number;
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
  // ... (your existing state and logic remains the same until the return statement)
  const { loading, error, data } = useQuery<CricketMatchData, CricketMatchVars>(
    GET_CRICKET_MATCH,
    { variables: { cricketMatchId } }
  );

  const {
    data: userMoneyData,
    loading: userMoneyLoading,
    refetch: refetchUserMoney,
  } = useQuery<UserMoneyData, UserMoneyVars>(GET_USER_MONEY, {
    variables: { email: userEmail },
    skip: !userEmail,
  });

  const [withdrawMoney, { loading: withdrawalLoading }] =
    useMutation(WITHDRAW_MONEY);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [quickBetAmounts] = useState<number[]>([100, 500, 1000, 2000]);
  const [countdown, setCountdown] = useState<string>("");
  const [myBets, setMyBets] = useState<Bet[]>([]);
  const [showMyBets, setShowMyBets] = useState<boolean>(false);

  // Load bets from localStorage on component mount
  useEffect(() => {
    const savedBets = localStorage.getItem(`userBets_${userEmail}`);
    if (savedBets) {
      try {
        const parsedBets = JSON.parse(savedBets);
        // Only keep bets from the last 30 days
        const filteredBets = parsedBets.filter((bet: Bet) => {
          const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
          return bet.timestamp > thirtyDaysAgo;
        });
        setMyBets(filteredBets);

        // Update localStorage with filtered bets
        if (filteredBets.length !== parsedBets.length) {
          localStorage.setItem(
            `userBets_${userEmail}`,
            JSON.stringify(filteredBets)
          );
        }
      } catch (e) {
        console.error("Failed to parse saved bets:", e);
        setMyBets([]);
      }
    }
  }, [userEmail]);

  // Save bets to localStorage whenever myBets changes
  useEffect(() => {
    if (userEmail && myBets.length > 0) {
      localStorage.setItem(`userBets_${userEmail}`, JSON.stringify(myBets));
    }
  }, [myBets, userEmail]);

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
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
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

    if (
      userMoneyData?.getUserMoney?.money &&
      amount > userMoneyData.getUserMoney.money
    ) {
      alert("Insufficient balance");
      return;
    }

    try {
      // Withdraw money first
      await withdrawMoney({
        variables: {
          email: userEmail,
          amount: amount,
        },
      });

      // Create the new bet object for local UI
      const newBet: Bet = {
        id: Date.now().toString(),
        team: selectedTeam!,
        amount: amount,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        matchId: cricketMatchId,
        matchType: match.matchType,
        teamLogo: selectedTeam === match.t1 ? match.t1img : match.t2img,
        status: "pending",
        timestamp: Date.now(),
      };

      setMyBets((prevBets) => [newBet, ...prevBets]);

      // Confirm bet via API
      const response = await fetch(
        "http://localhost:8787/api/confirmBet/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: cricketMatchId,
            teamId: selectedTeam, // Use the numeric team ID, not the name
            userEmail: userEmail,
            betAmount: amount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to confirm bet");
      }

      console.log("Bet confirmed:", data.data);

      // Refetch user balance
      refetchUserMoney();

      // Reset form and UI
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

  const clearAllBets = () => {
    if (confirm("Are you sure you want to clear all your bet history?")) {
      setMyBets([]);
      localStorage.removeItem(`userBets_${userEmail}`);
    }
  };

  if (loading || userMoneyLoading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading match data...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <h3>Error Loading Match</h3>
        <p>{error.message}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

  if (!data?.cricketMatch)
    return (
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
      {/* App Header */}
      <div className="app-header">
        <div className="logo">
          <i className="fas fa-cricket logo-icon"></i>
          <span>Betting Baazi</span>
        </div>
        <div className="header-actions">
          <button className="notifications-btn">
            <i className="fas fa-bell"></i>
          </button>
          <div className="user-profile">
            <span>{userEmail.split("@")[0]}</span>
            <div className="avatar">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>

      {/* User Balance Bar */}
      <div className="user-balance-bar">
        <div className="balance-info">
          <Wallet size={16} />
          <span>Balance: ₹{userBalance.toLocaleString()}</span>
        </div>

        {/* My Bets Button */}
        <button className="my-bets-button" onClick={() => setShowMyBets(true)}>
          <AccountBalanceWallet />
          <span>My Bets ({myBets.length})</span>
        </button>

        <div className="match-countdown">
          <Clock size={16} />
          <span>{countdown}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
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
            <p className="new-balance">
              New Balance: ₹{userBalance.toLocaleString()}
            </p>
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
      </div>

      {/* My Bets Modal */}
      <AnimatePresence>
        {showMyBets && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMyBets(false)}
          >
            <motion.div
              className="mybets-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  <History size={24} />
                  My Bets
                </h3>
                <button
                  className="close-button"
                  onClick={() => setShowMyBets(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bets-list">
                {myBets.length === 0 ? (
                  <div className="no-bets">
                    <SportsCricket style={{ fontSize: 48 }} />
                    <p>No bets placed yet</p>
                    <small>Place your first bet on a team to see it here</small>
                  </div>
                ) : (
                  <>
                    <div className="bets-header">
                      <span>Your Bet History</span>
                      <button className="clear-bets" onClick={clearAllBets}>
                        Clear All
                      </button>
                    </div>
                    {myBets.map((bet) => (
                      <div key={bet.id} className="bet-item">
                        <div className="bet-team">
                          <img src={bet.teamLogo} alt={bet.team} />
                          <span>{bet.team}</span>
                        </div>
                        <div className="bet-details">
                          <div className="bet-amount">
                            ₹{bet.amount.toLocaleString()}
                          </div>
                          <div className="bet-date">{bet.date}</div>
                          <div className={`bet-status ${bet.status}`}>
                            {bet.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="close-btn"
                  onClick={() => setShowMyBets(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bet Modal */}
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
                    {quickBetAmounts.map((amount) => (
                      <button
                        key={amount}
                        className={`quick-bet-btn ${
                          betAmount === amount.toString() ? "active" : ""
                        }`}
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
                  disabled={
                    !betAmount ||
                    parseInt(betAmount) <= 0 ||
                    parseInt(betAmount) > userBalance ||
                    withdrawalLoading
                  }
                >
                  {withdrawalLoading ? "Processing..." : "Confirm Bet"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nishine-container {
          width: 100%;
          min-height: 100vh;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #0f111a 0%, #1a1c2d 100%);
          color: #f5f5f7;
          padding: 0;
          overflow-x: hidden;
        }

        /* App Header */
        .app-header {
          background: rgba(15, 16, 28, 0.8);
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.5rem;
          color: #fff;
        }

        .logo-icon {
          color: #7a6fed;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notifications-btn {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.07);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1a1b5;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notifications-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-profile span {
          font-weight: 500;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7a6fed 0%, #5d8afd 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* User Balance Bar */
        .user-balance-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(20, 22, 37, 0.95);
          padding: 14px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .balance-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          background: rgba(72, 219, 153, 0.15);
          color: #48db99;
          padding: 8px 16px;
          border-radius: 12px;
        }

        .match-countdown {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5d8afd;
          background: rgba(93, 138, 253, 0.15);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
        }

        .my-bets-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #7a6fed 0%, #5d8afd 100%);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(122, 111, 237, 0.3);
        }

        .my-bets-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122, 111, 237, 0.4);
        }

        /* Main Content */
        .main-content {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #7a6fed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-container {
          text-align: center;
          padding: 60px 20px;
          background: rgba(20, 22, 37, 0.8);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          margin: 40px auto;
        }

        .error-container h3 {
          margin: 20px 0 12px;
          color: #ff4757;
        }

        .retry-button {
          background: linear-gradient(135deg, #7a6fed 0%, #5d8afd 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          margin-top: 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .retry-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122, 111, 237, 0.4);
        }

        .match-header {
          background: rgba(20, 22, 37, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .series-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .series-info h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .match-details {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .match-type,
        .match-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #a1a1b5;
        }

        .teams-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
          margin-bottom: 32px;
        }

        .team-card {
          background: rgba(20, 22, 37, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          color: #fff;
        }

        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(122, 111, 237, 0.3);
        }

        .team-image {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }

        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .team-name {
          font-weight: 700;
          font-size: 1.3rem;
          margin-bottom: 12px;
          text-align: center;
        }

        .team-score {
          font-size: 1.8rem;
          font-weight: 800;
          color: #7a6fed;
          margin-bottom: 20px;
        }

        .bet-button {
          background: linear-gradient(135deg, #7a6fed 0%, #5d8afd 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          width: 100%;
          text-align: center;
          transition: all 0.2s;
        }

        .bet-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122, 111, 237, 0.4);
        }

        .vs-divider {
          background: rgba(20, 22, 37, 0.8);
          backdrop-filter: blur(10px);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bet-confirmation {
          background: rgba(20, 22, 37, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.06);
          max-width: 600px;
          margin: 40px auto;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: rgba(72, 219, 153, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #48db99;
        }

        .bet-confirmation h2 {
          margin: 0 0 16px;
          color: #48db99;
          font-size: 1.8rem;
        }

        .bet-confirmation p {
          color: #a1a1b5;
          margin-bottom: 12px;
        }

        .new-balance {
          margin-top: 20px;
          font-weight: 600;
          color: #7a6fed;
          font-size: 1.2rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .bet-modal,
        .mybets-modal {
          background: rgba(20, 22, 37, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 0;
          width: 100%;
          max-width: 500px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fff;
        }

        .close-button {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.07);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1a1b5;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .selected-team-section {
          padding: 24px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

        .selected-team-section p {
          color: #a1a1b5;
        }

        .selected-team-section strong {
          color: #fff;
        }

        .balance-info {
          padding: 16px 24px;
          background: rgba(93, 138, 253, 0.1);
          text-align: center;
          font-weight: 600;
          color: #5d8afd;
        }

        .bet-input-section {
          padding: 24px;
        }

        .bet-input-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #fff;
        }

        .input-with-validation {
          margin-bottom: 16px;
        }

        .bet-input-section input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          font-size: 1rem;
          box-sizing: border-box;
          color: #fff;
        }

        .bet-input-section input:focus {
          outline: none;
          border-color: #7a6fed;
        }

        .bet-input-section input::placeholder {
          color: #6b7280;
        }

        .error-text {
          color: #ff4757;
          font-size: 0.875rem;
          margin-top: 4px;
          display: block;
        }

        .quick-bet-options {
          margin-top: 20px;
        }

        .quick-bet-options span {
          display: block;
          margin-bottom: 12px;
          font-weight: 500;
          color: #a1a1b5;
        }

        .quick-bet-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .quick-bet-btn {
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          font-size: 0.9rem;
          color: #a1a1b5;
        }

        .quick-bet-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .quick-bet-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quick-bet-btn.active {
          background: rgba(122, 111, 237, 0.2);
          color: #7a6fed;
          border-color: rgba(122, 111, 237, 0.3);
        }

        .modal-actions {
          padding: 20px 24px 24px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .cancel-btn,
        .confirm-btn,
        .close-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        } // const handleBetSubmit = async () => {
        //   const amount = parseInt(betAmount);

        //   if (!amount || amount <= 0) {
        //     alert("Please enter a valid bet amount");
        //     return;
        //   }

        //   if (userMoneyData?.getUserMoney?.money && amount > userMoneyData.getUserMoney.money) {
        //     alert("Insufficient balance");
        //     return;
        //   }

        .cancel-btn,
        .close-btn {
          background: rgba(255, 255, 255, 0.07);
          color: #a1a1b5;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cancel-btn:hover,
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #7a6fed 0%, #5d8afd 100%);
          color: white;
          border: none;
        }

        .confirm-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122, 111, 237, 0.4);
        }

        .confirm-btn:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* My Bets Styles */
        .bets-list {
          padding: 0 24px;
          max-height: 400px;
          overflow-y: auto;
        }

        .bets-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bets-header span {
          font-weight: 600;
          color: #fff;
        }

        .clear-bets {
          background: rgba(255, 71, 87, 0.1);
          color: #ff4757;
          border: 1px solid rgba(255, 71, 87, 0.2);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-bets:hover {
          background: rgba(255, 71, 87, 0.2);
        }

        .bet-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bet-item:last-child {
          border-bottom: none;
        }

        .bet-team {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bet-team img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .bet-team span {
          font-weight: 500;
          color: #fff;
        }

        .bet-details {
          text-align: right;
        }

        .bet-amount {
          font-weight: 700;
          color: #48db99;
          margin-bottom: 4px;
        }

        .bet-date {
          font-size: 0.8rem;
          color: #a1a1b5;
          margin-bottom: 4px;
        }

        .bet-status {
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 12px;
          display: inline-block;
        }

        .bet-status.pending {
          background: rgba(217, 119, 6, 0.15);
          color: #d97706;
        }

        .bet-status.won {
          background: rgba(6, 95, 70, 0.15);
          color: #065f46;
        }

        .bet-status.lost {
          background: rgba(185, 28, 28, 0.15);
          color: #b91c1c;
        }

        .no-bets {
          text-align: center;
          padding: 40px 20px;
          color: #a1a1b5;
        }

        .no-bets p {
          margin: 16px 0 8px;
          font-weight: 600;
          color: #fff;
        }

        .no-bets small {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .app-header {
            padding: 14px 16px;
          }

          .logo {
            font-size: 1.2rem;
          }

          .user-profile span {
            display: none;
          }

          .user-balance-bar {
            flex-direction: column;
            gap: 12px;
            padding: 16px;
          }

          .main-content {
            padding: 16px;
          }

          .teams-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .vs-divider {
            margin: 10px 0;
            width: 50px;
            height: 50px;
            align-self: center;
          }

          .team-card {
            padding: 24px 16px;
          }

          .team-image {
            width: 80px;
            height: 80px;
          }

          .match-header {
            padding: 20px;
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

          .bet-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .bet-details {
            text-align: left;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Nishine;
