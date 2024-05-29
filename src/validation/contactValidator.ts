function validateContact(contact: number) {

    const regex: RegExp = /^[0-9]{10}$/;
    return regex.test(String(contact));
}

export { validateContact }