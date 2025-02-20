export class LocalCache {
    static set<T>(url: string, data: T): void {
        localStorage.setItem(url, JSON.stringify(data));
    }

    static get<T>(url: string): T | null {
        const data = localStorage.getItem(url);
        return data ? JSON.parse(data) : null;
    }

    static remove(url: string): void {
        localStorage.removeItem(url);
    }

    static clear(): void {
        localStorage.clear();
    }
}

export default Cache;