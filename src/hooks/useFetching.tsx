import { useState } from "react";

type CallbackFunction = (...args: unknown[]) => Promise<void>;

/**
 * Хук, который помогает отслеживать состояние загрузки
 * и ошибку, возникшую при вызове callback-функции.
 *
 * @param callback - callback-функция, которая может
 *                   возвращать промис.
 *
 * @returns Массив, содержащий:
 *   - callback-функцию, которая вызывает callback,
 *     отслеживает состояние загрузки и ошибку;
 *   - состояние загрузки (boolean);
 *   - ошибку (string).
 */
export const useFetching = (
  callback: CallbackFunction
): [
  (...args: Parameters<CallbackFunction>) => Promise<void>,
  boolean,
  string
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetching = async (...args: Parameters<CallbackFunction>) => {
    try {
      setIsLoading(true);
      setError("");
      await callback(...args);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
