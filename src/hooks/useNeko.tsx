import { useEffect, useRef, useState } from "react";
import { Neko } from "neko-ts";

interface UseNekoOptions {
  initialX?: number;
  initialY?: number;
  speed?: number;
}

/**
 * Хук, который создает экземпляр Neko, который может
 * спать или быть бодрым.
 *
 * @param {UseNekoOptions} [options] - опции:
 *   - {number} [initialX=500] - координата X для
 *     инициализации Neko;
 *   - {number} [initialY=100] - координата Y для
 *     инициализации Neko;
 *   - {number} [speed=10] - скорость Neko.
 *
 * @returns {Object} - объект, содержащий:
 *   - {boolean} isNekoSleeping - состояние сна Neko;
 *   - {() => void} toggleNekoSleep - функция, которая
 *     изменяет состояние сна Neko.
 */
export function useNeko({
  initialX = 500,
  initialY = 100,
  speed = 10,
}: UseNekoOptions = {}): {
  isNekoSleeping: boolean;
  toggleNekoSleep: () => void;
} {
  const neko = useRef<Neko>();
  const [isNekoSleeping, setIsNekoSleeping] = useState<boolean>(false);

  useEffect(() => {
    if (!neko.current) {
      neko.current = new Neko({
        origin: {
          x: initialX,
          y: initialY,
        },
        speed,
      });
    }
  }, [initialX, initialY, speed]);

  useEffect(() => {
    if (isNekoSleeping) neko.current?.sleep();
    else neko.current?.wake();
  }, [isNekoSleeping]);

  const toggleNekoSleep = () => setIsNekoSleeping(!isNekoSleeping);

  return { isNekoSleeping, toggleNekoSleep };
}
