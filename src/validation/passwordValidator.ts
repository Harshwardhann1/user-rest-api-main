function validatePassword(password: string): boolean {
    
    return password.length >= 8;
}



export { validatePassword };