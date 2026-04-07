import React, { useState, useEffect } from 'react';
import './index.css';

const CHOICES = [
  { id: 'rock', emoji: '🪨', color: '#ffb3ba' },
  { id: 'paper', emoji: '📄', color: '#baffc9' },
  { id: 'scissors', emoji: '✂️', color: '#bae1ff' }
];

export default function App() {
  const [compScore, setCompScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState('Select your move!');
  const [history, setHistory] = useState([]);
  const [compEmoji, setCompEmoji] = useState('❓');
  const [userEmoji, setUserEmoji] = useState('❓');
  const [isAnimating, setIsAnimating] = useState(false);
  const [resultClass, setResultClass] = useState('');

  const handlePlay = (choice) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setResultClass('');
    setUserEmoji('🤛'); 
    setCompEmoji('🤛'); 
    setWinnerMessage('Ready...');

    setTimeout(() => {
      const random = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      const compMove = random.id;
      const userMove = choice.id;
      
      setCompEmoji(random.emoji);
      setUserEmoji(choice.emoji);

      let roundResult = '';
      if (userMove === compMove) {
        roundResult = 'draw';
        setWinnerMessage("It's a Draw! 😅");
        setStreak(0);
        setResultClass('draw-text');
      } else if (
        (userMove === 'rock' && compMove === 'scissors') ||
        (userMove === 'paper' && compMove === 'rock') ||
        (userMove === 'scissors' && compMove === 'paper')
      ) {
        roundResult = 'win';
        setUserScore(s => s + 1);
        setStreak(s => s + 1);
        setWinnerMessage("You Win! 🎉");
        setResultClass('win-text');
      } else {
        roundResult = 'lose';
        setCompScore(s => s + 1);
        setStreak(0);
        setWinnerMessage("Computer Wins! 🤖");
        setResultClass('lose-text');
      }

      setHistory(prev => [{ comp: random.emoji, user: choice.emoji, result: roundResult, id: Date.now() }, ...prev]);
      setIsAnimating(false);
    }, 1200);
  };

  const handleReset = () => {
    setCompScore(0);
    setUserScore(0);
    setStreak(0);
    setWinnerMessage('Select your move!');
    setHistory([]);
    setCompEmoji('❓');
    setUserEmoji('❓');
    setResultClass('');
  };

  return (
    <div className="app-container">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>

      <div className="game-card">
        <h1 className="title">Rock Paper Scissors</h1>
        
        <div className="scoreboard">
          <div className="score-box user-score">
            <span className="player-label">You</span>
            <span className="score-value">{userScore}</span>
            {streak > 1 && <div className="streak-badge">🔥 {streak} Streak</div>}
          </div>
          <div className="score-divider">VS</div>
          <div className="score-box comp-score">
            <span className="player-label">Computer</span>
            <span className="score-value">{compScore}</span>
          </div>
        </div>

        <div className="battle-arena">
          <div className={`fighter user ${isAnimating ? 'anim-shake-user' : 'anim-pop'}`}>
            {userEmoji}
          </div>
          <div className="vs-text">⚔️</div>
          <div className={`fighter comp ${isAnimating ? 'anim-shake-comp' : 'anim-pop'}`}>
            {compEmoji}
          </div>
        </div>

        <div className={`result-message ${resultClass}`}>
          {winnerMessage}
        </div>

        <div className="controls">
          {CHOICES.map(c => (
            <button
              key={c.id}
              className="action-btn"
              onClick={() => handlePlay(c)}
              disabled={isAnimating}
              style={{ '--btn-color': c.color }}
            >
              <span className="btn-emoji">{c.emoji}</span>
              <span className="btn-label">{c.id}</span>
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="history-tray">
            <div className="history-title">Recent Matches</div>
            <div className="history-list">
              {history.slice(0, 5).map(h => (
                <div key={h.id} className={`history-item ${h.result}`}>
                  <span className="hist-player">{h.user}</span>
                  <span className="hist-vs">vs</span>
                  <span className="hist-comp">{h.comp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="reset-btn" onClick={handleReset}>
          ↻ Reset Game
        </button>
      </div>
    </div>
  );
}
