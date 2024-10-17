import { useCallback, useRef, useState } from "react";

type CallbackFunction<Args extends unknown[], ReturnType = unknown> = (
  ...args: Args
) => Promise<ReturnType>;

type UseQueryResult<Args extends unknown[], ReturnType> = [
  (...args: Args) => Promise<ReturnType | undefined>,
  boolean,
  string | null
];

/**
 * Hook для упрощения работы с асинхронными запросами.
 *
 * @param callback - функция, которая будет вызвана при
 *   вызове возвращаемой функции. Она должна возвращать Promise
 *
 * @returns массив из трех элементов:
 *   1. функция, которая вызывает callback и обрабатывает
 *      ошибки
 *   2. флаг, который указывает, находится ли callback в
 *      состоянии загрузки
 *   3. текст ошибки, если callback выбросил ошибку
 */
export function useQuery<Args extends unknown[], ReturnType = void>(
  callback: CallbackFunction<Args, ReturnType>
): UseQueryResult<Args, ReturnType> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Используем useRef для хранения последней версии callback
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const queryFunction = useCallback(
    async (...args: Args): Promise<ReturnType | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await callbackRef.current(...args);
        return result;
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    []
  ); // Пустой массив зависимостей, так как мы используем ref

  return [queryFunction, isLoading, error];
}
