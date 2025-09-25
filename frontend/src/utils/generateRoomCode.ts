/**
 * Generates a random 4-character string using numbers and uppercase letters.
 * @returns {string} A 4-character code, e.g. "A5F9"
 */
export function generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
