import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
  timeLeft: number;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Recupera do localStorage ou usa 300 segundos (5 minutos)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timer-timeLeft');
      return saved ? parseInt(saved) : 300;
    }
    return 300;
  });

  const [isRunning, setIsRunning] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('timer-isRunning');
      return saved === 'true';
    }
    return false;
  });

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timer-timeLeft', timeLeft.toString());
    }
  }, [timeLeft]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timer-isRunning', isRunning.toString());
    }
  }, [isRunning]);

  // Efeito para o timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('timer-timeLeft');
            localStorage.removeItem('timer-isRunning');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(300);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('timer-timeLeft');
      localStorage.removeItem('timer-isRunning');
    }
  };

  return (
    <TimerContext.Provider value={{ timeLeft, isRunning, setIsRunning, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};