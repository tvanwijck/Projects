import React from 'react';

const TimerControls = ({ isRunning, isPaused, onStart, onPause, onStop, loading }) => {
  return (
    <div className="controls">
      {!isRunning ? (
        <button 
          className="btn btn-start" 
          onClick={onStart}
          disabled={loading}
        >
          Start
        </button>
      ) : (
        <>
          {!isPaused ? (
            <button 
              className="btn btn-pause" 
              onClick={onPause}
              disabled={loading}
            >
              Pause
            </button>
          ) : (
            <button 
              className="btn btn-start" 
              onClick={onStart}
              disabled={loading}
            >
              Continue
            </button>
          )}
          <button 
            className="btn btn-stop" 
            onClick={onStop}
            disabled={loading}
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default TimerControls; 