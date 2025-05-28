export interface Question {
  q: string;
  opts: string[];
  ans: number;
  expl: string;
}

export type Quiz = Question[]; 