// Сервис по работе с фейковыми rest api от jsonplaceholder

import axios, { AxiosResponse } from "axios";
import { Todo } from "../types.ts/todo";

export default class TodoFakeService {
  private static readonly BASE_URL =
    "https://jsonplaceholder.typicode.com/todos";

  /**
   * Возвращает массив Todo с сервера, ограниченный по количеству
   * @param {number} [limit=10] - количество Todo, которое нужно получить
   * @param {number} [page=1] - номер страницы
   * @returns Promise, который разрешается с массивом Todo
   */
  static async getBatch(
    limit: number = 10,
    page: number = 1
  ): Promise<AxiosResponse<Todo[]>> {
    const response = await axios.get(this.BASE_URL, {
      params: {
        _limit: limit,
        _page: page,
      },
    });
    return response;
  }

  /**
   * Возвращает количество активных (незавершенных) Todo
   * @returns Promise, который разрешается с количеством активных Todo
   */
  static async getActiveCount(): Promise<number> {
    const response = await axios.get(this.BASE_URL, {
      params: {
        completed: false,
      },
    });
    return response.data.length;
  }

  /**
   * Возвращает все Todo с completed=true
   * @returns Promise, который разрешается с массивом Todo
   */
  static async getDoneTodos(): Promise<Todo[]> {
    const response = await axios.get(this.BASE_URL, {
      params: {
        completed: true,
      },
    });

    return response.data;
  }

  /**
   * Создает несколько todo на сервере
   * @param todos - массив объектов Todo без id
   * @returns Promise, который разрешается с массивом ответов AxiosResponse
   */
  static async create(
    todos: Omit<Todo, "id">[]
  ): Promise<AxiosResponse<Todo>[]> {
    return await Promise.all(
      todos.map((todo) => axios.post<Todo>(this.BASE_URL, todo))
    );
  }

  /**
   * Обновляет несколько Todo на сервере
   * @param todos - массив объектов Todo с обновленными полями (должны содержать id)
   * @returns Promise, который разрешается с массивом ответов AxiosResponse
   */
  static async update(todos: Todo[]): Promise<AxiosResponse<Todo>[]> {
    return await Promise.all(
      todos.map((todo) => {
        if (!todo.id) {
          throw new Error("Todo id is required");
        }
        return axios.put<Todo>(`${this.BASE_URL}/${todo.id}`, todo);
      })
    );
  }

  /**
   * Удаляет несколько Todo по их id и возвращает обновленный список todo
   * @param ids - массив id удаляемых Todo
   * @returns Promise, который разрешается с новым массивом Todo
   */
  static async delete(ids: number[]): Promise<Todo[]> {
    // Сначала удаляем указанные todo
    await Promise.all(
      ids.map((id) => axios.delete<object>(`${this.BASE_URL}/${id}`))
    );

    // Затем получаем обновленный список todo (для имитации асинхронной работы)
    const response = await axios.get(this.BASE_URL);

    // Хитрим и просто фильтруем по статусу
    return response.data.filter((todo: Todo) => todo.completed === false);
  }
}
