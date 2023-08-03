import {Priority} from "./priority";
import {Status} from "./status";

export interface Card {
  id: number,
  title: string,
  priority: Priority,
  status: Status,
  description: string,
  created: Date,
  edited: Date | null;
}
