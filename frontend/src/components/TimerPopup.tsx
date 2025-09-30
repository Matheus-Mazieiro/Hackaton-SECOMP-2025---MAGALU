import { useState } from "react";
import { useTimer } from "./timerContext";
import { X, Minus } from "lucide-react";

export const TimerPopup: React.FC = () => {
  const { timeLeft, isRunning, setIsRunning, resetTimer } = useTimer();
  const [isMinimized, setIsMinimized] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // Não mostra o pop-up quando o timer termina ou não está ativo
  if (timeLeft <= 0 || timeLeft === 300) {
    return null;
  }

  return (
    <div className={`
      fixed bottom-6 right-6 transition-all duration-300 z-50
      ${isMinimized ? 'w-20 h-20' : 'w-64'}
    `}>
      <div className={`
        bg-card border rounded-2xl shadow-2xl overflow-hidden
        transition-all duration-300
        ${isMinimized 
          ? 'w-20 h-20 rounded-full' 
          : 'w-64 h-64'
        }
      `}>
        {/* Header do pop-up */}
        <div className={`
          bg-gradient-to-r from-accent to-accent/80 p-3 flex justify-between items-center
          ${isMinimized ? 'hidden' : 'flex'}
        `}>
          <span className="text-accent-foreground font-semibold text-sm">
            Timer de Descanso
          </span>
          <div className="flex gap-1">
            <button
              onClick={toggleMinimize}
              className="p-1 hover:bg-accent/20 rounded transition-colors"
            >
              <Minus className="w-4 h-4 text-accent-foreground" />
            </button>
            <button
              onClick={stopTimer}
              className="p-1 hover:bg-accent/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </div>

        {/* Conteúdo do pop-up */}
        <div className={`
          flex items-center justify-center h-full bg-gradient-to-br from-accent/20 to-accent/10
          ${isMinimized ? 'rounded-full' : ''}
        `}>
          {isMinimized ? (
            // Versão minimizada
            <button
              onClick={toggleMinimize}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {formatTime(timeLeft).split(':')[0]}
                </div>
                <div className="text-xs text-muted-foreground">min</div>
              </div>
            </button>
          ) : (
            // Versão expandida
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-foreground mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="text-lg font-semibold text-foreground uppercase mb-6">
                Descanse
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};