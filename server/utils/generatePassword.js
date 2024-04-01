function generatePassword(num) {
    return Math.random().toString(36).slice(-num)
}

export { generatePassword }