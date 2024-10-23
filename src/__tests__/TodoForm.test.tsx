import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoForm from "../components/TodoForm";
import { Todo } from "../types.ts/todo";
import TodoLocalService from "../api/TodoLocalService";
import TodoFakeService from "../api/TodoFakeService";

// Мокаем весь модуль TodoLocalService
jest.mock("../api/TodoLocalService", () => ({
  getAll: jest.fn(),
  createByTitles: jest.fn(),
  getActiveCount: jest.fn(),
  getDoneTodos: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createByEntities: jest.fn(),
}));

// Мокаем getBatch из TodoFakeService
jest.mock("../api/TodoFakeService", () => ({
  getBatch: jest.fn(),
}));

describe("TodoForm Component", () => {
  // Очищаем моки перед каждым тестом
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTodos: Todo[] = [
    { userId: 1, id: "1", title: "Test Todo 1", completed: false },
    { userId: 1, id: "2", title: "Test Todo 2", completed: true },
  ];

  it("renders the component and loads todos from localStorage", () => {
    // Настраиваем моки для всех используемых методов
    (TodoLocalService.getAll as jest.Mock).mockReturnValue(mockTodos);
    (TodoLocalService.getActiveCount as jest.Mock).mockReturnValue(1);

    render(<TodoForm />);

    // Проверяем, что туду отрендерились
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();

    // Проверяем, что getAll был вызван
    expect(TodoLocalService.getAll).toHaveBeenCalled();
    // Проверяем, что getActiveCount был вызван
    expect(TodoLocalService.getActiveCount).toHaveBeenCalled();
  });

  it("adds a new todo when enter is pressed", () => {
    // Настраиваем моки
    (TodoLocalService.getAll as jest.Mock).mockReturnValue(mockTodos);
    (TodoLocalService.getActiveCount as jest.Mock).mockReturnValue(1);
    (TodoLocalService.createByTitles as jest.Mock).mockReturnValue([
      ...mockTodos,
      { userId: 1, id: "3", title: "New Todo", completed: false },
    ]);

    const { getByPlaceholderText } = render(<TodoForm />);

    const input = getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Проверяем, что createByTitles был вызван с правильными параметрами
    expect(TodoLocalService.createByTitles).toHaveBeenCalledWith(["New Todo"]);
  });

  it("updates todo completion status", () => {
    const updatedTodos = mockTodos.map((todo) =>
      todo.id === "1" ? { ...todo, completed: true } : todo
    );

    // Настраиваем моки
    (TodoLocalService.getAll as jest.Mock).mockReturnValue(mockTodos);
    (TodoLocalService.getActiveCount as jest.Mock).mockReturnValue(1);
    (TodoLocalService.update as jest.Mock).mockReturnValue(updatedTodos);

    render(<TodoForm />);

    // Находим чекбокс первого туду и кликаем по нему
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // Проверяем, что update был вызван с правильными параметрами
    expect(TodoLocalService.update).toHaveBeenCalledWith({
      ...mockTodos[0],
      completed: true,
    });
  });

  it("deletes completed todos", () => {
    // Настраиваем моки
    (TodoLocalService.getAll as jest.Mock).mockReturnValue(mockTodos);
    (TodoLocalService.getActiveCount as jest.Mock).mockReturnValue(1);
    (TodoLocalService.getDoneTodos as jest.Mock).mockReturnValue(["2"]);
    (TodoLocalService.delete as jest.Mock).mockReturnValue([mockTodos[0]]);

    render(<TodoForm />);

    // Находим кнопку удаления завершенных задач и кликаем по ней
    const clearButton = screen.getByText(/Clear completed/i);
    fireEvent.click(clearButton);

    // Проверяем, что delete был вызван с правильными параметрами
    expect(TodoLocalService.delete).toHaveBeenCalledWith(["2"]);
  });

  it("loads additional todos when getBatch is called", async () => {
    // Начальное состояние - 2 туду
    (TodoLocalService.getAll as jest.Mock).mockReturnValue(mockTodos);
    (TodoLocalService.getActiveCount as jest.Mock).mockReturnValue(1);

    // Подготавливаем данные для getBatch
    const batchTodos = Array.from({ length: 10 }, (_, i) => ({
      userId: 1,
      title: `Batch Todo ${i + 1}`,
      completed: false,
    }));

    // Мокаем ответ от сервера
    (TodoFakeService.getBatch as jest.Mock).mockResolvedValue({
      data: batchTodos,
      total: batchTodos.length,
    });

    // Мокаем createByEntities, чтобы он добавлял id к новым туду
    const batchTodosWithIds = batchTodos.map((todo, index) => ({
      ...todo,
      id: `batch${index + 1}`,
    }));

    // При создании новых туду через createByEntities, возвращаем старые + новые
    (TodoLocalService.createByEntities as jest.Mock).mockReturnValue([
      ...mockTodos,
      ...batchTodosWithIds,
    ]);

    render(<TodoForm />);

    // Находим кнопку загрузки и кликаем по ней
    const loadButton = screen.getByText(/Fetch/i);
    fireEvent.click(loadButton);

    // Проверяем, что getBatch был вызван с правильными параметрами
    expect(TodoFakeService.getBatch).toHaveBeenCalledWith(20, undefined);

    // Ждем асинхронных операций
    await waitFor(() => {
      // Проверяем, что createByEntities был вызван с данными из getBatch
      expect(TodoLocalService.createByEntities).toHaveBeenCalledWith(
        batchTodos
      );
    });

    // Проверяем, что в итоге у нас отображается 12 туду (2 начальных + 10 новых)
    const allTodos = screen.getAllByRole("checkbox");
    expect(allTodos).toHaveLength(12);

    // Проверяем, что новые туду отображаются
    batchTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });

    // Проверяем, что старые туду также остались
    mockTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });
});
