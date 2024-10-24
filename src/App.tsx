import React from "react";
import ThemeProvider from "./components/providers/ThemeProvider";
import TodoPage from "./pages/TodoPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-full min-h-[100vh] flex justify-center items-start bg-bg dark:bg-bgDark">
        <TodoPage />
      </div>
    </ThemeProvider>
  );
};

export default App;
