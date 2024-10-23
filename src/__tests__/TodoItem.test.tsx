import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { Todo } from "../types.ts/todo";

describe("TodoItem Component", () => {
  it("renders a todo item and toggles its completed status", () => {
    const todo: Todo = {
      userId: 1,
      id: "1",
      title: "Test Todo",
      completed: false,
    };
    const handleChange = jest.fn();

    render(<TodoItem todo={todo} handleChange={handleChange} />);

    // Проверяем что текст туду отображается
    expect(screen.getByText("Test Todo")).toBeInTheDocument();

    // Нажимаем на чекбокс выполнения задачи
    fireEvent.click(screen.getByRole("checkbox"));

    // Ожидаем что handleChange был вызван с правильными параметрами
    expect(handleChange).toHaveBeenCalledWith({ ...todo, completed: true });
  });
});
