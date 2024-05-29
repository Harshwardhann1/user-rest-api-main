function validatePassword(password: string): boolean {
    
    return password.length >= 6;
}



export { validatePassword };