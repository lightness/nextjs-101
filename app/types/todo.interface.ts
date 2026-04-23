export interface Todo {
  id: number;
  text: string;
  createdAt: Date;
  completedAt: Date | null;
}