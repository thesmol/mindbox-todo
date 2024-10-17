/** Тип todo */
export type Todo = {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
};

/** Тип фильтра */
export enum FilterQuery {
  ALL = "ALL",
  DONE = "DONE",
  ACTIVE = "ACTIVE",
}

// Определение enum для темы
export type Theme = "light" | "dark";
