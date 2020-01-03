import { parse } from 'tldts';
import { IResult } from 'tldts-core';

export class Domain {

    protected domain: IResult;

    constructor(domain: string) {
        this.domain = parse(domain);
    }

    public getSuffix(): string {
        return this.domain.publicSuffix || '';
    }

    public getSubdomain(): string {
        return this.domain.subdomain || '';
    }

    public getHostname(): string {
        return this.domain.domain || '';
    }

    public getDomainWithoutSuffix(): string {
        return this.domain.domainWithoutSuffix || '';
    }

    public toString(): string {
        return this.domain.hostname || '';
    }
}