declare module 'glob' {
  export function globSync(pattern: string, options?: any): string[];
  export function glob(pattern: string, options?: any): Promise<string[]>;
}
