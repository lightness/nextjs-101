export interface ICreateTodo {
  text: string
}

export interface IUpdateTodo {
  id: number;
  text?: string;
  completedAt?: Date;
}

export interface ITodoSearchParams {
  includeCompleted?: boolean;
  term?: string;
}
