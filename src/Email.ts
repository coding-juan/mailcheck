import { ParsedMailbox, parseOneAddress } from 'email-addresses';
import * as EmailValidator from 'email-validator';
import { Domain } from './Domain';

export class Email {
    protected local: string;
    protected domain: Domain;

    constructor(email: string) {
        let parsedEmail = (parseOneAddress(email) as ParsedMailbox);
        if (!parsedEmail || !parsedEmail.local && !parsedEmail.domain) {
            parsedEmail = {} as ParsedMailbox;
            const emailRegex = /(.*)@(.*)/;
            const splittedEmail = email.match(emailRegex);

            if (splittedEmail) {
                parsedEmail.local = splittedEmail[1];
                parsedEmail.domain = splittedEmail[2];
            }
        }

        this.local = parsedEmail.local;
        this.domain = new Domain(parsedEmail.domain);
    }

    public toString(): string {
        return this.getFullAddress();
    }

    public getLocal(): string {
        return this.local;
    }

    public getDomain(): Domain {
        return this.domain;
    }

    public getFullAddress(): string {
        return `${this.getLocal()}@${this.getDomain()}`;
    }

    public validate() {
        return EmailValidator.validate(this.getFullAddress());
    }
}