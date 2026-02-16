export type Project = {
  id: string;
  title: string;
  stack: string[];
  one_liner: string;
  architecture?: string[];
  workflow_commands?: string[];
  linked_errors?: string[];
  prevention_checklist?: string[];
};
