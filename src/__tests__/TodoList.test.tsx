import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import { Todo } from "../types.ts/todo";

describe("TodoList Component", () => {
  it("renders a list of todos", () => {
    const todos: Todo[] = [
      { userId: 1, id: "1", title: "Todo 1", completed: false },
      { userId: 1, id: "2", title: "Todo 2", completed: true },
    ];

    render(
      <TodoList todos={todos} handleTodoChange={jest.fn()} loading={false} />
    );

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });
});
