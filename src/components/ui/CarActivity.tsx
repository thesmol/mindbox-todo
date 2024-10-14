import { useNeko } from "../../hooks/useNeko";

const CarActivity = () => {
  const { isNekoSleeping, toggleNekoSleep } = useNeko({
    initialX: 50,
    initialY: 20,
    speed: 10,
  });

  return (
    <div>
      <img
        src="cat-bed.png"
        alt="Neko"
        className={`absolute top-[18px] w-[80px] h-[50px] z-1 transition-all duration-500 ${
          isNekoSleeping ? "left-[20px]" : "left-[-100px]"
        }`}
      />
      <button
        onClick={toggleNekoSleep}
        className={`absolute top-[10px] border-2 border-gray-300 p-2 m-2 rounded-3xl transition-all duration-300 ${
          isNekoSleeping ? "bg-slate-900 left-[100px]" : "bg-white left-[10px]"
        }`}
      >
        <p className={`${!isNekoSleeping ? "text-slate-900" : "text-white"}`}>
          {isNekoSleeping ? "sleepin 🐈‍⬛💤" : "runnin 🐈💣"}
        </p>
      </button>
    </div>
  );
};

export default CarActivity;
