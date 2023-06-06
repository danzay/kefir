/**
 * The method calculates a form of word for the number and return an index, that is related to particular form of word.
 * @param n - number
 * @returns index
 */
export const plural = ( n: number ) => {
    let idx: number;
    if ( n % 10 === 1 && n % 100 !== 11 ) {
        idx = 0; // many
    } else if ( n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ) {
        idx = 1; // many
    } else {
        idx = 2; // one
    }
    return idx;
}