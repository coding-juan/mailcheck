import { IDictionary } from "./dictionary/IDictionary";
import { Standard } from "./dictionary/Standard";
import { Email } from "./Email";
import levenshtein from "./utils/levenshtein";

export default class Mailcheck {
    protected dictionary: IDictionary;

    constructor(dictionary?: IDictionary) {
        if (!dictionary) {
            dictionary = new Standard();
        }
        this.dictionary = dictionary;
    }

    public getDictionary(): IDictionary {
        return this.dictionary;
    }

    public setDictionary(dictionary: IDictionary): this {
        this.dictionary = dictionary;

        return this;
    }

    public suggest(email: string, limit: number = 5, threshold: number = 3) {
        const suggestions = [];
        const parsedEmail = new Email(email);

        // If a domain suggestion is found use it
        const suggestionDomain = this.findSuggestions(parsedEmail.getDomain().toString(), this.getDictionary().getProviders(), threshold);

        if (suggestionDomain && suggestionDomain.length !== 0) {
            for (const domain of suggestionDomain) {
                suggestions.push(`${parsedEmail.getLocal()}@${domain}`)
            }
        } else {
            // If not, try to suggest a TLD
            const parsedDomain = parsedEmail.getDomain();

            // If not, try to suggest a TLD
            if (!parsedDomain.getSuffix()) {
                return [];
            }

            const suggestionTld = this.findSuggestions(parsedDomain.getSuffix(), this.getDictionary().getTlds(), threshold);

            if (suggestionTld && suggestionTld.length !== 0) {
                for (const tld of suggestionTld) {
                    suggestions.push(`${parsedEmail.getLocal()}@${parsedDomain.getDomainWithoutSuffix()}.${tld}`);
                }
            }
        }

        if (!suggestions.length) {
            return [];
        }

        return suggestions.slice(0, limit);
    }

    public suggestOne(email: string, threshold: number =3) {
        const suggestion = this.suggest(email, threshold, 1);

        if (!suggestion || !suggestion.length) {
            return null;
        }

        return suggestion[0];
    }

    public findSuggestions(word: string, list: Set<string>, threshold: number) {
        const ordered: any[][] = [];
        for (const value of list) {
            const distance = levenshtein(word, value);

            if (0 === distance) {
                return [];
            }

            if (distance <= threshold) {
                if(!ordered[distance]) {
                    ordered[distance] = [];
                }
                ordered[distance].push(value);
            }
        }

        return this.sortFilteredSuggestions(ordered);
    }

    protected sortFilteredSuggestions(filteredSuggestions: any[]): any[] {
        const result = [];

        filteredSuggestions = filteredSuggestions.sort();

        for (const suggestions of filteredSuggestions) {
            if (!suggestions) { continue };
            for (const suggestion of suggestions) {
                result.push(suggestion);
            }
        }

        return result;
    }
}