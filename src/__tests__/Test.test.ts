import Mailcheck from '../index';

const mailcheck = new Mailcheck();

test('Suggest One', () => {
    expect(mailcheck.suggestOne('juanmanez@gail.com')).toBe('juanmanez@gmail.com');
});

test('Suggest', () => {
    expect(mailcheck.suggest('juanmanez@gail.com')).toHaveLength(5);
})

test('Suggest with limit three', () => {
    expect(mailcheck.suggest('juanmanez@gail.com', 3)).toHaveLength(3);
})