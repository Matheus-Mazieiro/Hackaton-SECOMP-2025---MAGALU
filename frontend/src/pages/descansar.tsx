import Navigation from "@/components/Navigation";
import { useTimer } from "@/components/timerContext";
import { TimerPopup } from "@/components/TimerPopup";
import { Wind } from "lucide-react";

const Descanse = () => {
  const { timeLeft, isRunning, setIsRunning, resetTimer } = useTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 mb-4 shadow-lg">
              <Wind className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Momento de Descanso</h1>
            <p className="text-muted-foreground">
              Relaxe e aproveite este momento para descansar
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-card rounded-lg p-8 shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Instruções</h2>
              <p className="text-muted-foreground mb-6">
                Encontre uma posição confortável e aproveite este momento para descansar. 
                O timer continuará rodando mesmo se você navegar para outras páginas.
              </p>
              
              {/* Timer local para esta página */}
              <div className="mt-8 p-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg">
                <div className="text-6xl font-bold text-foreground mb-4">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xl font-semibold text-foreground uppercase">
                  {isRunning ? "⏰ Contando..." : "⏸️ Pausado"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pop-up global do Timer */}
      <TimerPopup />
    </div>
  );
};

export default Descanse;