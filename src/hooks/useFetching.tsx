import { useState } from "react";

type CallbackFunction<Args extends unknown[]> = (
  ...args: Args
) => Promise<void>;

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
export const useFetching = <Args extends unknown[]>(
  callback: CallbackFunction<Args>
): [(...args: Args) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Callback-функция, которая вызывает callback, отслеживает
   * состояние загрузки и ошибку.
   *
   * @param args - аргументы, которые будут переданы в callback
   * @returns промис, который разрешается, когда callback
   *   будет вызван
   */
  const fetching = async (...args: Args) => {
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
