import { useState, useEffect } from "react";

export const useTimer = (initialTime: number = 5 * 60) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: number;

    if (timerActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining <= 0) {
      setTimerActive(false);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    setTimeRemaining(initialTime);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimeRemaining(initialTime);
    setTimerActive(false);
  };

  return {
    timeRemaining,
    timerActive,
    formatTime: () => formatTime(timeRemaining),
    startTimer,
    stopTimer,
    resetTimer,
    isExpired: timeRemaining <= 0,
  };
};
