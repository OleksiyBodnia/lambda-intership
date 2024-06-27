function insertDots(s) {
    if (s.length <= 1) {
        return [s];
    }
    
    let result = [s];
    for (let i = 1; i < s.length; i++) {
        const subCombinations = insertDots(s.slice(i));
        for (const sub of subCombinations) {
            result.push(s.slice(0, i) + '.' + sub);
        }
    }
    
    return result;
}

const inputString = prompt("Введіть рядок:");
const output = insertDots(inputString);
console.log(output);