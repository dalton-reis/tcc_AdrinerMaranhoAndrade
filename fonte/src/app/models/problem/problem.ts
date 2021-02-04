import { ClassContract } from './problem-contract';

export interface Problem {

  id: string;
  name: string;
  description: string;
  classContract: ClassContract;
  scenarios: ProblemScenario[];
  solution: string;

}
