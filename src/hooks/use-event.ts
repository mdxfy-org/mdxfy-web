import { useEffect, useRef } from "react";

/**
 * Executa um callback em intervalos definidos, mantendo a referência mais recente.
 * @param callback Função a ser executada a cada intervalo.
 * @param delay Tempo em ms. Se null ou <= 0, o intervalo é desativado.
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // Atualiza a referência do callback a cada renderização
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura o intervalo
  useEffect(() => {
    if (delay === null || delay <= 0) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};
