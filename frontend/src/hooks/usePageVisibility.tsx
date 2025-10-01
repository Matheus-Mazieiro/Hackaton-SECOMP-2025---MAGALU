import { useState, useEffect } from 'react';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [leaveCount, setLeaveCount] = useState(0);
  
  useEffect(() => {
    // Recuperar contador do localStorage ao inicializar
    const savedCount = localStorage.getItem('pageLeaveCount');
    if (savedCount) {
      setLeaveCount(parseInt(savedCount));
    }

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      if (visible) {
        console.log('✅ Usuário voltou para a aba');
      } else {
        console.log('🚪 Usuário saiu da aba');
        const newCount = leaveCount + 1;
        setLeaveCount(newCount);
        // Salvar no localStorage para persistência
        localStorage.setItem('pageLeaveCount', newCount.toString());
        console.log(`Número de vezes que o usuário saiu da aba: ${newCount}`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [leaveCount]);

  return { isVisible, leaveCount };
};