import ThemeProvider from "./components/providers/ThemeProvider";
import TodoPage from "./pages/TodoPage";
function App() {
  return (
    <ThemeProvider>
      <div className="w-full h-[100vh] display flex justify-center items-start bg-bg dark:bg-bgDark">
        <TodoPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
