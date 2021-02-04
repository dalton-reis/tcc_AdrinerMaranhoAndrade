export class DocumentationService {

  private GITHUB_DOCUMENTATION_URL = 'https://adrinerandrade.github.io/smalg-platform';

  get home(): string {
    return this.GITHUB_DOCUMENTATION_URL;
  }

  get problemDescription(): string {
    return `${this.GITHUB_DOCUMENTATION_URL}/problems/creation#descrição`;
  }

  get problemContract(): string {
    return `${this.GITHUB_DOCUMENTATION_URL}/problems/creation#contrato`;
  }

  get problemScenarios(): string {
    return `${this.GITHUB_DOCUMENTATION_URL}/problems/creation#cenários`;
  }

  get problemSolution(): string {
    return `${this.GITHUB_DOCUMENTATION_URL}/problems/creation#solução`;
  }

  get problemExecution(): string {
    return `${this.GITHUB_DOCUMENTATION_URL}/problems/execution#executar`;
  }

}
