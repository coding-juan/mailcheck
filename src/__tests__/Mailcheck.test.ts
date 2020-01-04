import Mailcheck from '../index';

const mailcheck = new Mailcheck();

test('Suggest', () => {
    // Domain check
    expect(mailcheck.suggest('example@gmil.com')).toContain('example@gmail.com');
    expect(mailcheck.suggest('example@hotmilcm')).toContain('example@hotmail.com');

    // This is a recognized domain, why should we give suggestions!?
    expect(mailcheck.suggest('example@gmail.com')).toEqual([]);
    expect(mailcheck.suggest('example@hotmail.com')).toEqual([]);
    expect(mailcheck.suggest('example@hotmail.es')).toEqual([]);

    // This TLD should never match anything
    expect(mailcheck.suggest('example@willnotfoundtld')).toEqual([]);

    // TLD checks
    expect(mailcheck.suggest('example@foobar.ess')).toContain('example@foobar.es');

    // This is a recogniced TLD, why should we give suggestions!?
    expect(mailcheck.suggest('example@foobar.es')).toEqual([]);
    expect(mailcheck.suggest('example@foobar.com')).toEqual([]);
    expect(mailcheck.suggest('example@foobar.de')).toEqual([]);
});

test('Suggest One', () => {
    // Domain checks
    expect(mailcheck.suggestOne('example@gmail.comm')).toBe('example@gmail.com');
    expect(mailcheck.suggestOne('example@gmail com')).toBe('example@gmail.com');
    expect(mailcheck.suggestOne('example@hotmail.co')).toBe('example@hotmail.com');

    // This is a recognized domain, why should we give suggestions!?
    expect(mailcheck.suggestOne('example@gmail.com')).toBeNull();
    expect(mailcheck.suggestOne('example@hotmail.com')).toBeNull();
    expect(mailcheck.suggestOne('example@hotmail.es')).toBeNull();

    // TLD checks
    expect(mailcheck.suggestOne('example@foobar.ess')).toBe('example@foobar.es');

    // This is a recogniced TLD, why should we give suggestions!?
    expect(mailcheck.suggestOne('example@foobar.es')).toBeNull();
    expect(mailcheck.suggestOne('example@foobar.com')).toBeNull();
    expect(mailcheck.suggestOne('example@foobar.de')).toBeNull();
});