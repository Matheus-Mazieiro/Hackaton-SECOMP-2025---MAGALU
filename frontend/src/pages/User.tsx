import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { User } from "lucide-react";

const NomeUsuario = () => {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (nome.trim()) {
      // Guardar o nome (pode ser em localStorage, context, state global, etc.)
      localStorage.setItem("userName", nome.trim());
      
      // Redirecionar para a página inicial
      navigate("/inicial");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 mb-4 shadow-lg">
              <User className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Seu Nome</h1>
            <p className="text-muted-foreground">
              Digite seu nome para personalizar sua experiência
            </p>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-6">
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full px-6 py-4 text-lg bg-background border border-border rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                disabled={!nome.trim()}
                className="w-full py-4 px-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              >
                Confirmar Nome
              </button>
            </form>

            {nome && (
              <div className="mt-8 p-6 bg-background/50 rounded-2xl border border-border shadow-lg">
                <p className="text-muted-foreground mb-2">Pré-visualização:</p>
                <p className="text-2xl font-semibold text-foreground">
                  Olá, {nome}!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NomeUsuario;