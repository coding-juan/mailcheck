import { Email } from '../Email';

test('Get local', () => {
    const email = new Email('admin@localhost');
    expect(email.getLocal()).toBe('admin');
});

test('Get domain', () => {
    const email = new Email('admin@localhost');
    expect(email.getDomain().toString()).toBe('localhost');
});

test('Validate', () => {
    let email = new Email('admin@localhost.com');
    expect(email.validate()).toBeTruthy()

    email = new Email('ad@min@localhost');
    expect(email.validate()).toBeFalsy()
});