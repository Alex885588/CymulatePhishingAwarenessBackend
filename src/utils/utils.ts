export function areSameDomain(email1: string, email2: string): boolean {
    const domain1 = getEmailDomain(email1);
    const domain2 = getEmailDomain(email2);
    return domain1 === domain2;
}

function getEmailDomain(email: string): string {
    const domainRegex = /@(.*)$/;
    const match = email.match(domainRegex);
    if (match) {
        return match[1];
    } else {
        throw new Error('Invalid email format');
    }
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email);
}