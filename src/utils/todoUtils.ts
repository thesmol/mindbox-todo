import { Theme } from "../types.ts/todo";

export const getBatchCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

/** Функция для получения начальной темы */
export const getInitialTheme = (): Theme => {
  // Сначала проверяем localStorage
  const storedTheme = localStorage.getItem("theme") as Theme;
  if (storedTheme) {
    return storedTheme;
  }

  // Если в localStorage ничего нет, проверяем системные настройки
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  // По умолчанию возвращаем светлую тему
  return "light";
};
