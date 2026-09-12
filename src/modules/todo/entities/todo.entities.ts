export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TodoEntity implements ITodo {
  constructor(
    public id: string,
    public title: string,
    public description: string | null,
    public completed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
