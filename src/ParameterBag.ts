import filter_var, { Filters } from "./Filter";
import { IAggregate } from "./Iterator";

export class ParameterBag implements IAggregate<any> {
    protected parameters: {[index: string]: any} = {};

    constructor(parameters: {[index: string]: any}) {
        this.parameters = parameters;
    }

    public all(): {[index: string]: any} {
        return this.parameters;
    }

    public count(): number {
        return this.keys().length;
    }

    public keys(): string[] {
        const keySet: string[] = [];
 
        for (const prop in this.parameters) {
            if (this.parameters.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
 
        return keySet;
    }

    public replace(value: any[] = []): void {
        this.parameters = value;
    }

    public add(value: any | any[]): void {
        this.parameters.push(value)
    }

    public get(key: string, defaults: any = null) {
        return this.parameters.hasOwnProperty(key)? this.parameters[key]: defaults;
    }

    public set(key: string, value: any): void {
        return this.parameters[key] = value;
    }

    public contains(key: string): boolean {
        return this.parameters.hasOwnProperty(key);
    }

    public remove(key: string): void {
       delete this.parameters[key]
    }

    public getAlpha(key: string, defaults: string = '') {
        return this.get(key, defaults).replace(/[^[:alpha:]]/, '');
    }

    public getAlnum(key: string, defaults: string = '') {
        return this.get(key, defaults).replace(/[^[:alnum:]]/, '');
    }

    public getDigits(key: string, defaults: string = '') {
        return this.filter(key, defaults, Filters.FILTER_SANITIZE_NUMBER_INT).replace(/['-', '+']/, '');
    }

    public getInt(key: string, defaults: number = 0) {
        return (this.get(key, defaults) as number);
    }

    public getBoolean(key: string, defaults: boolean = false) {
        return this.filter(key, defaults, Filters.FILTER_VALIDATE_BOOLEAN);
    }

    public filter(key: string, defaults: any = null, filter: Filters = Filters.FILTER_DEFAULT) {
        const value = this.get(key, defaults);

        return filter_var(value, filter);
    }

    public getIterator(): string[] {
        return Object.keys(this.parameters).map((x) => this.parameters[x]);
    }
}