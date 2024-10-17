import { useEffect, useRef } from "react";

/**
 *
 * Хук позволяющий отслеживать элемент в поле видимости, используется для динамической пагинации
 * Создает IntersectionObserver, который вызывает callback,
 * когда элемент пересекается с viewport.
 *
 * @param {React.MutableRefObject<HTMLElement | null>} ref - Элемент, который
 *   будет отслеживаться
 * @param {boolean} canLoad - Может ли observer вызывать callback
 * @param {boolean} isLoading - статус загрузки
 * @param {() => void | Promise<void>} callback - Callback, который будет вызван,
 *   когда элемент пересечется с наблюдаемым элементом
 */
export const useObserver = (
  ref: React.MutableRefObject<HTMLElement | null>,
  canLoad: boolean,
  isLoading: boolean,
  callback: () => void | Promise<void>
): void => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    const cb = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current as HTMLElement);
  }, [callback, canLoad, isLoading, ref]);
};
