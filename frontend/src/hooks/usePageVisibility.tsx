import { useState, useEffect } from 'react';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  let cont = 0;
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      // Aqui está o print no terminal
      if (visible) {
        console.log('✅ Usuário voltou para a aba');
      } else {
        console.log('🚪 Usuário saiu da aba');
        cont += 1;
        console.log(`Número de vezes que o usuário saiu da aba: ${cont}`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};