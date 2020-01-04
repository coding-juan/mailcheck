import _providers from '../data/providers.json';
import _tlds from '../data/tlds.json';
import { IDictionary } from "./IDictionary";

export class Standard implements IDictionary {
    protected providers: Set<string>;
    protected tlds: Set<string>;

    constructor() {
        this.providers = new Set<string>(_providers);
        this.tlds = new Set<string>(_tlds);
    }

    public getProviders(): Set<string> {
        return this.providers;
    }

    public setProviders(providers: Set<string>): this {
        this.providers = providers;

        return this;
    }

    public getTlds(): Set<string> {
        return this.tlds;
    }

    public setTlds(tlds: Set<string>): this {
        this.tlds = tlds;
        
        return this;
    }
}