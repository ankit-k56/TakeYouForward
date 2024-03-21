export interface Submission {
  code: string;
  language: string;
  username: string;
  stdin: string;
  stdout?: string | null;
}

export type submit = {
  username: string;
  code: string;
  languageCode: number;
  stdin: string;
};
