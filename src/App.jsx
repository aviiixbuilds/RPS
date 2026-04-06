import React, { useState } from 'react';

const CHOICES = [
  { id: 'rock', emoji: '🪨' },
  { id: 'paper', emoji: '📄' },
  { id: 'scissors', emoji: '✂️' }
];

const Header = () => (
  <div style={{ fontSize: '32px', marginBottom: '10px' }}>Computer : You</div>
);

const GameDisplay = ({ comp, user }) => (
  <div style={{ fontSize: '42px', margin: '15px 0' }}>
    {comp} : {user}
  </div>
);

const ScoreCounter = ({ compScore, userScore, streak }) => (
  <div style={{ fontSize: '42px', margin: '15px 0' }}>
    {compScore} : {userScore}
    <div style={{ fontSize: '18px', marginTop: '10px' }}>Winning Streak: {streak} 🔥</div>
  </div>
);

const ResultMessage = ({ message }) => (
  <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '15px 0', height: '1.5em' }}>
    {message}
  </div>
);

const GameStats = ({ rounds }) => (
  <div style={{ margin: '15px 0', fontSize: '18px' }}>
    Rounds Played: {rounds}
  </div>
);

const HistoryList = ({ history }) => (
  <div style={{ 
    margin: '20px 0', 
    textAlign: 'left', 
    maxHeight: '150px', 
    width: '240px',
    maxWidth: '100%',
    overflowY: 'auto', 
    border: '1px solid #ccc', 
    padding: '10px' 
  }}>
    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Move History:</div>
    {history.map((h, i) => (
      <div key={i} style={{ fontSize: '14px', borderBottom: '1px solid #eee' }}>
        {i+1}: {h.comp} vs {h.user} - {h.result}
      </div>
    )).reverse()}
  </div>
);

const GameButtons = ({ onPlay }) => (
  <div style={{ display: 'flex', gap: '5px' }}>
    {CHOICES.map(c => (
      <button
        key={c.id}
        onClick={() => onPlay(c)}
        style={{
          padding: '8px 12px',
          fontSize: '22px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          background: '#efefef'
        }}
      >
        {c.emoji}
      </button>
    ))}
  </div>
);

export default function App() {
  const [compScore, setCompScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState('Select your move!');
  const [history, setHistory] = useState([]);
  const [compEmoji, setCompEmoji] = useState('🪨');
  const [userEmoji, setUserEmoji] = useState('✂️');

  const handlePlay = (choice) => {
    const random = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    const compMove = random.id;
    const userMove = choice.id;
    
    setCompEmoji(random.emoji);
    setUserEmoji(choice.emoji);
    setRoundsPlayed(r => r + 1);

    let roundResult = '';
    if (userMove === compMove) {
      roundResult = 'Draw';
      setWinnerMessage("Result: It's a draw!");
      setStreak(0); // Sequence of wins is broken
    } else if (
      (userMove === 'rock' && compMove === 'scissors') ||
      (userMove === 'paper' && compMove === 'rock') ||
      (userMove === 'scissors' && compMove === 'paper')
    ) {
      roundResult = 'You Win';
      setUserScore(s => s + 1);
      setStreak(s => s + 1);
      setWinnerMessage("Result: You Win! 🎉");
    } else {
      roundResult = 'Comp Wins';
      setCompScore(s => s + 1);
      setStreak(0);
      setWinnerMessage("Result: Computer Wins! 🤖");
    }

    setHistory(prev => [...prev, { comp: random.emoji, user: choice.emoji, result: roundResult }]);
  };

  const handleReset = () => {
    setCompScore(0);
    setUserScore(0);
    setStreak(0);
    setRoundsPlayed(0);
    setWinnerMessage('Select your move!');
    setHistory([]);
    setCompEmoji('🪨');
    setUserEmoji('✂️');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: '0', textAlign: 'left' }}>
      <Header />
      <GameDisplay comp={compEmoji} user={userEmoji} />
      <ScoreCounter compScore={compScore} userScore={userScore} streak={streak} />
      <ResultMessage message={winnerMessage} />
      <GameStats rounds={roundsPlayed} />
      <GameButtons onPlay={handlePlay} />
      <HistoryList history={history} />
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleReset}
          style={{ 
            padding: '5px 10px', 
            fontSize: '14px', 
            cursor: 'pointer' 
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
