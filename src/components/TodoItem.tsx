import { Box } from "@mui/material";
import CustomCheckbox from "./ui/CustomCheckBox";
import { Todo } from "../types.ts/todo";

interface TodoItemProps {
  todo: Todo;
  handleChange: () => void;
}

/**
 * Компонент отображения одного Todo
 * @param {TodoItemProps} props - props
 * @param {Todo} props.todo - Todo
 * @param {() => void} props.handleChange - функция, которая
 *   обрабатывает изменение состояния Todo
 * @returns {JSX.Element}
 */

const TodoItem = ({ todo, handleChange }: TodoItemProps): JSX.Element => {
  return (
    <Box className="flex items-center gap-4 w-full py-2">
      <CustomCheckbox checked={todo.completed} onChange={handleChange} />
      <p
        className={`text-2xl transition-all duration-300 ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.title}
      </p>
    </Box>
  );
};

export default TodoItem;
