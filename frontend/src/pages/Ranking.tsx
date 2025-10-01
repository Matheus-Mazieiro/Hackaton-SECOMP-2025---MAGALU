import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { TimerPopup } from "@/components/TimerPopup";
import { usePageVisibility } from "@/hooks/usePageVisibility"; // ajuste o caminho

const Ranking = () => {
  const [userName, setUserName] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Maria Silva", score: 50, position: 1 },
    { id: 2, name: "João Santos", score: 50, position: 2 },
    { id: 3, name: "Ana Oliveira", score: 50, position: 3 },
    { id: 4, name: "Pedro Costa", score: 50, position: 4 },
    { id: 5, name: "Carla Souza", score: 50, position: 5 },
    { id: 6, name: "Lucas Ferreira", score: 50, position: 6 },
    { id: 7, name: "Julia Lima", score: 50, position: 7 },
    { id: 8, name: "Rafael Alves", score: 50, position: 8 },
    { id: 9, name: "Beatriz Rocha", score: 50, position: 9 },
  ]);

  // Usar o hook de visibilidade
  const { leaveCount } = usePageVisibility();

  useEffect(() => {
    // Recuperar o nome do usuário do localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      
      // Calcular score baseado no número de vezes que saiu da aba
      const userScore = Math.max(0, 50 - (leaveCount * 10)); // Diminui 10 pontos por vez que saiu
      
      const userAlreadyInList = students.some(student => 
        student.name.toLowerCase() === storedName.toLowerCase()
      );
      
      if (!userAlreadyInList) {
        const newStudent = {
          id: students.length + 1,
          name: storedName,
          score: userScore,
          position: students.length + 1
        };
        
        setStudents(prevStudents => [...prevStudents, newStudent]);
      } else {
        // Atualizar score do usuário existente
        setStudents(prevStudents => 
          prevStudents.map(student => 
            student.name.toLowerCase() === storedName.toLowerCase() 
              ? { ...student, score: userScore }
              : student
          )
        );
      }
    }
  }, [leaveCount, students.length]);

  // Ordenar estudantes por score (maior para menor)
  const sortedStudents = [...students].sort((a, b) => b.score - a.score)
    .map((student, index) => ({
      ...student,
      position: index + 1
    }));

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return position;
    }
  };

  const isCurrentUser = (studentName: string) => {
    return userName && studentName.toLowerCase() === userName.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <TimerPopup />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/80 mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Ranking de Estudantes</h1>
            <p className="text-muted-foreground">
              Conquiste maçãs douradas e suba no ranking!
            </p>
            
            {/* Mostrar estatísticas do usuário */}
            {userName && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>{userName}</strong>, você saiu da aba <strong>{leaveCount} vez(es)</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Sua pontuação: <strong>{Math.max(0, 50 - (leaveCount * 5))} maçãs</strong>
                </p>
              </div>
            )}
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Top Estudantes</CardTitle>
              <CardDescription>
                Os estudantes mais dedicados da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">Posição</th>
                      <th className="text-left py-4 px-4 font-semibold">Estudante</th>
                      <th className="text-right py-4 px-4 font-semibold">Maçãs Douradas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className={`
                          border-b border-border/50 transition-colors
                          ${isCurrentUser(student.name) 
                            ? 'bg-primary/10 border-l-4 border-l-primary' 
                            : 'hover:bg-muted/50'
                          }
                        `}
                      >
                        <td className="py-4 px-4">
                          <div className={`
                            flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold
                            ${isCurrentUser(student.name) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                            }
                          `}>
                            {getMedalEmoji(student.position)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`
                            font-medium
                            ${isCurrentUser(student.name) && 'text-primary font-semibold'}
                          `}>
                            {student.name}
                            {isCurrentUser(student.name) && " (Você)"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-2xl">🍎</span>
                            <span className={`
                              font-bold text-lg
                              ${isCurrentUser(student.name) 
                                ? 'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent' 
                                : 'bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent'
                              }
                            `}>
                              {student.score}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Ranking;