import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Wind } from "lucide-react";

const Respiracao = () => {
  const [phase, setPhase] = useState<"inspire" | "expire">("inspire");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "inspire" ? "expire" : "inspire"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "inspire") {
      setScale(1.5);
    } else {
      setScale(1);
    }
  }, [phase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 mb-4 shadow-lg">
              <Wind className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Exercício de Respiração</h1>
            <p className="text-muted-foreground">
              Relaxe e acompanhe o ritmo da respiração
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "300px",
                height: "300px",
              }}
            >
              <div
                className="absolute rounded-full bg-gradient-to-br from-accent to-accent/60 shadow-2xl flex items-center justify-center transition-all duration-[5000ms] ease-in-out"
                style={{
                  width: "300px",
                  height: "300px",
                  transform: `scale(${scale})`,
                }}
              >
                <span className="text-3xl font-bold text-accent-foreground uppercase tracking-wider">
                  {phase === "inspire" ? "Inspire" : "Expire"}
                </span>
              </div>
            </div>

            <p className="mt-12 text-muted-foreground text-lg">
              {phase === "inspire" 
                ? "Inspire profundamente pelo nariz..." 
                : "Expire lentamente pela boca..."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Respiracao;
