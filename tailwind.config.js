/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Включение поддержки темной темы через класс 'dark'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentHeader: "#cd86b5",

        // Цветовая палитра для светлой темы
        todoActive: "#8e7e90",
        todoInactive: "#bba5bf",
        bg: "#f6e4fa",
        bgTodo: "#ffffff",
        divider: "#e5e5e5",

        // Цветовая палитра для темной темы
        todoActiveDark: "#e9c0f0",
        todoInactiveDark: "#C6A5C9",
        bgDark: "#433D43",
        bgTodoDark: "#665D67",
        dividerDark: "#5C4F5E",
      },
      boxShadow: {
        paper: `
          /* Тень вокруг элемента */ 0 1px 1px rgba(0, 0, 0, 0.15),
          /* Второй слой (снизу) */ 0 10px 0 -5px #ffffff,
          /* Тень второго слоя */ 0 10px 1px -4px rgba(0, 0, 0, 0.15),
          /* Третий слой (снизу) */ 0 20px 0 -10px #ffffff,
          /* Тень третьего слоя */ 0 20px 1px -9px rgba(0, 0, 0, 0.15),
          /* Нижняя тень вокруг */ 0 10px 20px rgba(0, 0, 0, 0.2)
        `,
        paperDark: `
          /* Тень вокруг элемента */ 0 1px 1px rgba(255, 255, 255, 0.30),
          /* Второй слой (снизу) */ 0 10px 0 -5px #665D67,
          /* Тень второго слоя */ 0 10px 1px -4px rgba(255, 255, 255, 0.30),
          /* Третий слой (снизу) */ 0 20px 0 -10px #665D67,
          /* Тень третьего слоя */ 0 20px 1px -9px rgba(255, 255, 255, 0.30),
          /* Нижняя тень вокруг */ 0 10px 20px rgba(255, 255, 255, 0.25)
        `,
      },
      screens: {
        sm: "640px",
        md: "1024px",
        lg: "1408px",
      },
    },
  },
  plugins: [],
};
