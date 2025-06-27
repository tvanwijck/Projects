import React from 'react';

const TimerDisplay = ({ elapsedTime, isRunning }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    
    return (
      <>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        {isRunning && <span className="milliseconds">.{String(ms).padStart(2, '0')}</span>}
      </>
    );
  };

  return (
    <div className="timer-display">
      <h1>{formatTime(elapsedTime)}</h1>
    </div>
  );
};

export default TimerDisplay; 