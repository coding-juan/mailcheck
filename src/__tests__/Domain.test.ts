import { Domain } from  '../Domain';

test('Get suffix', () => {
    let domain = new Domain('example.com');
    expect(domain.getSuffix()).toBe('com')

    domain = new Domain('www.example.com');
    expect(domain.getSuffix()).toBe('com')

    domain = new Domain('example.co.uk');
    expect(domain.getSuffix()).toBe('co.uk')

    domain = new Domain('www.example.co.uk');
    expect(domain.getSuffix()).toBe('co.uk')
});

test('Get subdomain', () => {
    let domain = new Domain('example.com');
    expect(domain.getSubdomain()).toBe('')

    domain = new Domain('www.example.com');
    expect(domain.getSubdomain()).toBe('www')

    domain = new Domain('example.co.uk');
    expect(domain.getSubdomain()).toBe('')

    domain = new Domain('www.example.co.uk');
    expect(domain.getSubdomain()).toBe('www')
});

test('Get hostname', () => {
    let domain = new Domain('example.com');
    expect(domain.getHostname()).toBe('example')

    domain = new Domain('www.example.com');
    expect(domain.getHostname()).toBe('example')

    domain = new Domain('example.co.uk');
    expect(domain.getHostname()).toBe('example')

    domain = new Domain('www.example.co.uk');
    expect(domain.getHostname()).toBe('example')
});

test('Get domain without suffix', () => {
    let domain = new Domain('example.com');
    expect(domain.getDomainWithoutSuffix()).toBe('example')

    domain = new Domain('www.example.com');
    expect(domain.getDomainWithoutSuffix()).toBe('www.example')

    domain = new Domain('example.co.uk');
    expect(domain.getDomainWithoutSuffix()).toBe('example')

    domain = new Domain('www.example.co.uk');
    expect(domain.getDomainWithoutSuffix()).toBe('www.example')
})