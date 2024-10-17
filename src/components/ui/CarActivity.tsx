import { useNeko } from "../../hooks/useNeko";
import { useTheme } from "../../hooks/useTheme";

type ThemeToggleProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Компонент, отображающий спящую или бегающую за курсором кошатину
 * Нажатие на кнопку меняет настроение кошатины: спящее или игривое.
 * Если кошка спит, ради ее комфорта выключается свет и наоборот - бегать в при свете
 */
const CarActivity: React.FC<ThemeToggleProps> = ({
  ...props
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const { isNekoSleeping, toggleNekoSleep } = useNeko({
    initialX: 50,
    initialY: 20,
    speed: 10,
    theme,
  });

  const handleButtonClick = () => {
    toggleTheme();
    toggleNekoSleep();
  };

  return (
    <div {...props}>
      <img
        src="cat-bed.png"
        alt="Neko"
        className={`absolute top-[18px] w-[80px] h-[50px] z-1 transition-all duration-500 ${
          isNekoSleeping ? "left-[20px]" : "left-[-100px]"
        }`}
      />
      <button
        onClick={handleButtonClick}
        className={`absolute dark:bg-bg bg-bgDark top-[12px] border-1 p-2 m-2 rounded-3xl transition-all duration-300 ${
          isNekoSleeping ? "left-[100px]" : "left-[10px]"
        }`}
      >
        {isNekoSleeping ? "💤🐈‍⬛🌑" : "💥🐈☀️"}
      </button>
    </div>
  );
};

export default CarActivity;
