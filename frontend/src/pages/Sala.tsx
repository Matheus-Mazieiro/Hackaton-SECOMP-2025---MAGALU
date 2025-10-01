import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Sala = () => {
  const { id } = useParams();
  
  // Mock data for rooms
  const salas = {
    "demon_slayer_22": { emoji: "🌟", title: "Sala Demon Slayer", pessoas: 3, tempoFoco: 25, tempoDescanso: 5 },
    "lua": { emoji: "🌙", title: "Sala Lua", pessoas: 5, tempoFoco: 25, tempoDescanso: 5 },
    "pipoca": { emoji: "🍿", title: "Sala Pipoca", pessoas: 2, tempoFoco: 25, tempoDescanso: 5 },
    "magalu": { emoji: "🧩", title: "Sala Magalu", pessoas: 2, tempoFoco: 25, tempoDescanso: 5 },
  };

  const sala = salas[id as keyof typeof salas];
  
  const [tempoRestante, setTempoRestante] = useState(sala?.tempoFoco * 60 || 1500);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 0) return prev;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  if (!sala) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sala não encontrada</h1>
          <Button asChild>
            <Link to="/">Voltar para início</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Cabeçalho da sala */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-4xl">{sala.emoji}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{sala.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Users className="w-4 h-4" />
                <span>{sala.pessoas} estudantes focados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cronômetro centralizado */}
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="p-12 shadow-2xl max-w-md w-full">
            <div className="text-center">
              <div className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatarTempo(tempoRestante)}
              </div>
              <div className="text-muted-foreground text-lg">
                {tempoRestante > sala.tempoDescanso * 60 
                  ? `Foco de ${sala.tempoFoco} minutos`
                  : `Descanso de ${sala.tempoDescanso} minutos`
                }
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="fixed bottom-6 left-6">
        <Card className="p-4 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <p className="text-lg font-medium">Bem-vindo! 👋</p>
        </Card>
      </footer>
    </div>
  );
};

export default Sala;