export declare const variable: (name: string, patterns: string[]) => void;
export declare const promptest: (template: string, input: string, runner: (subject: string, input: string) => string | Promise<string>) => Promise<{
    input: string;
    results: any;
}>;
