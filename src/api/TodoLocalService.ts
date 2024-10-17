// Сервис по работе с locale storage

import { Todo } from "../types.ts/todo";
import { uid } from "uid";

export default class TodoLocalService {
  private static readonly STORAGE_KEY = "todos";

  /**
   * Возвращает весь массив Todo из localStorage
   * @returns Массив Todo
   */
  static getAll(): Todo[] {
    const todos = localStorage.getItem(this.STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  }

  /**
   * Возвращает количество активных (незавершенных) Todo
   * @returns Количество активных Todo
   */
  static getActiveCount(): number {
    const todos = this.getTodosFromStorage();
    return todos.filter((todo) => !todo.completed).length;
  }

  /**
   * Возвращает все id тодо с completed=true
   * @returns Массив завершенных Todo
   */
  static getDoneTodos(): string[] {
    const todos = this.getTodosFromStorage();
    return todos.filter((todo) => todo.completed).map((todo) => todo.id);
  }

  /**
   * Создает несколько todo в localStorage из массива строк
   * @param titles - массив строк для создания todo
   * Возвращает обновленный массив Todo
   */
  static createByTitles(titles: string[]): Todo[] {
    const currentTodos = this.getTodosFromStorage();

    const newTodos: Todo[] = titles.map((title) => ({
      userId: 1,
      id: uid(6),
      title,
      completed: false,
    }));

    this.setTodosToStorage([...newTodos, ...currentTodos]);

    return this.getTodosFromStorage();
  }

  /**
   * Создает несколько todo в localStorage из массива строк
   * @param titles - массив строк для создания todo
   * Возвращает обновленный массив Todo
   */
  static createByEntities(todos: Omit<Todo, "id">[]): Todo[] {
    const currentTodos = this.getTodosFromStorage();

    const newTodos: Todo[] = todos.map((todo) => ({
      userId: todo.userId,
      id: uid(6),
      title: todo.title,
      completed: todo.completed,
    }));

    this.setTodosToStorage([...newTodos, ...currentTodos]);

    return this.getTodosFromStorage();
  }

  /**
   * Обновляет несколько Todo в localStorage
   * @param todos - массив объектов Todo с обновленными полями (должны содержать id)
   */
  static update(todo: Todo): Todo[] {
    const currentTodos = this.getTodosFromStorage();

    const updatedTodos = currentTodos.map((currentTodo) =>
      currentTodo.id === todo.id ? { ...currentTodo, ...todo } : currentTodo
    );

    this.setTodosToStorage(updatedTodos);

    return updatedTodos;
  }

  /**
   * Удаляет несколько Todo по их id и возвращает обновленный список todo
   * @param ids - массив id удаляемых Todo
   * @returns Обновленный массив Todo
   */
  static delete(ids: string[]): Todo[] {
    let todos = this.getTodosFromStorage();
    todos = todos.filter((todo) => !ids.includes(todo.id));
    this.setTodosToStorage(todos);
    return todos;
  }

  /**
   * Вспомогательный метод для получения всех Todo из localStorage
   * @returns Массив Todo
   */
  private static getTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem(this.STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  }

  /**
   * Вспомогательный метод для записи массива Todo в localStorage
   * @param todos - массив Todo
   */
  private static setTodosToStorage(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }
}
