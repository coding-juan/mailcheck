export interface IDictionary {
    getProviders(): Set<string>;

    getTlds(): Set<string>;
}