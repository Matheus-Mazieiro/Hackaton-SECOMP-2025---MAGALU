import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Interface para tipar os dados da API
interface ServerData {
  name: string;
  host: string;
  port: number;
  members: Record<string, any>;
  start_time: number;
  tempoFoco: number;
  tempoDescanso: number;
}

interface ServersResponse {
  [key: string]: ServerData;
}

const Sala = () => {
  const { id } = useParams();
  const [servers, setServers] = useState<ServersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Buscar dados da API
  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://201.23.12.76:8000/list_servers');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados dos servidores');
        }
        
        const data: ServersResponse = await response.json();
        setServers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  // Calcular tempo restante baseado no start_time
  const calcularTempoRestante = (server: ServerData) => {
    if (!server) return 0;

    const agora = Date.now() / 1000; // Tempo atual em segundos
    const startTime = server.start_time; // Já está em segundos
    
    const tempoDecorrido = agora - startTime;
    
    const tempoFocoSegundos = server.tempoFoco * 60;
    const tempoDescansoSegundos = server.tempoDescanso * 60;
    const cicloTotal = tempoFocoSegundos + tempoDescansoSegundos;
    
    // Tempo decorrido no ciclo atual (usando módulo)
    const tempoNoCicloAtual = tempoDecorrido % cicloTotal;
    
    // Se está no tempo de foco
    if (tempoNoCicloAtual < tempoFocoSegundos) {
      return Math.max(0, Math.floor(tempoFocoSegundos - tempoNoCicloAtual));
    } 
    // Se está no tempo de descanso
    else {
      return Math.max(0, Math.floor(cicloTotal - tempoNoCicloAtual));
    }
  };

  const [tempoRestante, setTempoRestante] = useState(0);
  const [estaNoFoco, setEstaNoFoco] = useState(true);

  // Atualizar o timer a cada segundo
  useEffect(() => {
    if (!servers || !id || !servers[id]) return;

    const server = servers[id];
    const atualizarTimer = () => {
      const tempo = calcularTempoRestante(server);
      setTempoRestante(tempo);
      
      // Determinar se está no período de foco ou descanso
      const agora = Date.now() / 1000;
      const startTime = server.start_time;
      const tempoDecorrido = agora - startTime;
      
      const tempoFocoSegundos = server.tempoFoco * 60;
      const tempoDescansoSegundos = server.tempoDescanso * 60;
      const cicloTotal = tempoFocoSegundos + tempoDescansoSegundos;
      const tempoNoCicloAtual = tempoDecorrido % cicloTotal;
      
      setEstaNoFoco(tempoNoCicloAtual < tempoFocoSegundos);
    };

    // Atualizar imediatamente
    atualizarTimer();

    // Configurar intervalo para atualizações
    const interval = setInterval(atualizarTimer, 1000);
    return () => clearInterval(interval);
  }, [servers, id]);

  const formatarTempo = (segundos: number) => {
    // Garantir que é um número inteiro
    const segundosInteiro = Math.floor(segundos);
    const minutos = Math.floor(segundosInteiro / 60);
    const segs = segundosInteiro % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  // Emojis para cada sala
  const emojis: { [key: string]: string } = {
    "demon_slayer_22": "🌟",
    "lua": "🌙", 
    "pipoca": "🍿",
    "magalu": "🧩"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erro: {error}</h1>
          <Button asChild>
            <Link to="/">Voltar para início</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!servers || !id || !servers[id]) {
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

  const sala = servers[id];
  const emoji = emojis[id] || "🍅";

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
              <span className="text-4xl">{emoji}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{sala.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Users className="w-4 h-4" />
                <span>{Object.keys(sala.members).length} estudantes focados</span>
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
                {estaNoFoco 
                  ? `Foco de ${sala.tempoFoco} minutos`
                  : `Descanso de ${sala.tempoDescanso} minutos`
                }
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {estaNoFoco ? "⏰ Hora de focar!" : "☕ Hora do descanso!"}
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