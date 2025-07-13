import type { SplitPerson } from "./person.types";

export type SplitItem = {
  payer_id: number;
  amount: number;
  person: SplitPerson;
};

export type SplitSummary = {
  from: string;
  to: string;
  amount: number;
};
