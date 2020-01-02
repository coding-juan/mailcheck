import * as providers from '../data/providers.json';
import * as tlds from '../data/tlds.json';
import { IDictionary } from "./IDictionary";

export class Standard implements IDictionary {
    protected providers: Set<string>;
    protected tlds: Set<string>;

    constructor() {
        this.providers = new Set<string>(providers);
        this.tlds = new Set<string>(tlds);
    }

    public getProviders(): Set<string> {
        return this.providers;
    }

    public setProviders(providers: Set<string>): this {
        this.providers = providers;

        return this;
    }

    public getTlds(): Set<string> {
        return this.providers;
    }

    public setTlds(tlds: Set<string>): this {
        this.tlds = tlds;
        
        return this;
    }
}