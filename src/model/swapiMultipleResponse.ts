export type SwapiMultipleResponse<T> = {
    count: number;
    next: string;
    prev: string;
    results: T[];
}