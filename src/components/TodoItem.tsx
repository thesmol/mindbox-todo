import { Box } from "@mui/material";
import CustomCheckbox from "./ui/CustomCheckBox";
import { Todo } from "../types.ts/todo";

interface TodoItemProps {
  todo: Todo;
  handleChange: (todo: Todo) => void;
}

/**
 * Компонент отображения одного Todo
 * @param {TodoItemProps} props - props
 * @param {Todo} props.todo - Todo
 * @param {(todo: Todo) => void} props.handleChange - функция, которая
 *   обрабатывает изменение состояния Todo
 * @returns {JSX.Element}
 */

const TodoItem = ({ todo, handleChange }: TodoItemProps): JSX.Element => {
  return (
    <Box className="flex items-center gap-4 w-full p-2">
      <CustomCheckbox
        checked={todo.completed}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange({ ...todo, completed: event.target.checked })
        }
      />
      <p
        className={`text-2xl transition-all duration-300 break-words w-full ${
          todo.completed
            ? "line-through text-todoInactive dark:text-todoInactiveDark"
            : "text-todoActive dark:text-todoActiveDark"
        }`}
      >
        {todo.title}
      </p>
    </Box>
  );
};

export default TodoItem;
