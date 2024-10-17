import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Theme } from "../../types.ts/todo";
import { getInitialTheme } from "../../utils/todoUtils";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Создаем начальное значение для контекста
const defaultContext: ThemeContextProps = {
  theme: "light",
  toggleTheme: () => {}, // Пустая функция как значение по умолчанию
};

// Создаём контекст
export const ThemeContext = createContext<ThemeContextProps>(defaultContext);

// Провайдер для хранения и управления темой
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Устанавливает тему по умолчанию: предыдущую если есть, тему устройства если нет
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  // Проверка и установка сохранённой темы в localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Сохранение выбранной темы и установка класса на root элемент
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
