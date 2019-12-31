// tslint:disable-next-line: interface-name
export interface IAggregate<T> {
    all(): {[index: string]: T};
    count(): number;
    keys(): string[];
    replace(value: T[]): void;
    add(value: T | T[]): void;
    get(key: string, defaults: T | null): T;
    set(key: string, value: T): void;
    contains(key: string): boolean;
    remove(key: string): void;
}

// tslint:disable-next-line: interface-name
export interface IteratorResult<T> {
    done: boolean;
    value: T;
}