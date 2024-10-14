// Сервис по работе с фейковыми туду от jsonplaceholder

import axios, { AxiosResponse } from "axios";
import { Todo } from "../types.ts/todo";

export default class TodoService {
  private static readonly BASE_URL =
    "https://jsonplaceholder.typicode.com/todos";

  /**
   * Возвращает массив Todo с сервера, ограниченный по количеству
   * @param {number} [limit=10] - количество Todo, которое нужно получить
   * @param {number} [page=1] - номер страницы
   * @returns Promise, который разрешается с массивом Todo
   */
  static async getAll(limit = 10, page = 1): Promise<AxiosResponse<Todo[]>> {
    return await axios.get(this.BASE_URL, {
      params: {
        _limit: limit,
        _page: page,
      },
    });
  }

  /**
   * Возвращает todo по его id
   * @param id - id todo
   * @returns Promise, который разрешается с объектом Todo
   */
  static async getById(id: number): Promise<AxiosResponse<Todo>> {
    return await axios.get(`${this.BASE_URL}/${id}`);
  }

  /**
   * Создает todo на сервере
   * @param todo - объект Todo без id
   * @returns Promise, который разрешается с созданным объектом Todo
   */
  static async create(todo: Omit<Todo, "id">): Promise<AxiosResponse<Todo>> {
    return await axios.post(this.BASE_URL, todo);
  }

  /**
   * Обновляет Todo на сервере
   * @param id - id обновляемого Todo
   * @param todo - объект Todo с обновленными полями
   * @returns Promise, который разрешается с обновленным объектом Todo
   */
  static async update(
    id: number,
    todo: Partial<Todo>
  ): Promise<AxiosResponse<Todo>> {
    return await axios.put(`${this.BASE_URL}/${id}`, todo);
  }

  /**
   * Удаляет Todo по его id
   * @param id - id удаляемого Todo
   * @returns Promise, который разрешается с объектом, содержащим
   *   информацию о результате операции
   */
  static async delete(id: number): Promise<AxiosResponse<object>> {
    return await axios.delete(`${this.BASE_URL}/${id}`);
  }
}
