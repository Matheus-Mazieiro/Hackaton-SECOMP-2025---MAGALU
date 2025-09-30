import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const salas = [
    {
      id: "estrela",
      emoji: "🌟",
      title: "Sala Estrela",
      description: "3 estudantes focados",
    },
    {
      id: "lua",
      emoji: "🌙",
      title: "Sala Lua",
      description: "5 estudantes focados",
    },
    {
      id: "arco-iris",
      emoji: "🌈",
      title: "Sala Arco-íris",
      description: "2 estudantes focados",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-4xl">🍎</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            FocoEstudo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Potencialize seus estudos com o método Pomodoro em grupo. 
            Foque, descanse e conquiste suas metas educacionais.
          </p>
        </section>

        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Salas Disponíveis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {salas.map((sala, index) => (
              <Link key={index} to={`/sala/${sala.id}`}>
                <Card className="shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                  <CardHeader>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 mx-auto">
                      <span className="text-5xl">{sala.emoji}</span>
                    </div>
                    <CardTitle className="text-center">{sala.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{sala.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mt-16 text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle>Estude em Grupo</CardTitle>
              </div>
              <CardDescription className="text-base">
                Junte-se a salas públicas de estudo e compartilhe seu progresso com outros estudantes. 
                Juntos somos mais fortes! 🚀
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
