export interface Action {
  type: string;
}

export interface ActionWithData<T> extends Action {
  data: T;
}
