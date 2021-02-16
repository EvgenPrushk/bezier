// Формулы для вычисления кривой Бизье
// функция, которая запоминает рузультат своих вызовов
const C = memorize((n, k) => factorial(n) / (factorial(k) * factorial(n - k)));

// функция, которая запоминает рузультат своих вызовов
const factorial = memorize((n) => (n < 2 ? 1 : n * factorial(n - 1)));


// если совпадают данные для функции позволяет возвращать результать выполнения функции
function memorize(func) {
    const history = {};

    return function (...args) {
        const key = JSON.stringify(args);
        // проверка есть ли данные аргументы в history
        // другими словами такой ключ
        if (!history.hasOwnProperty(key)) {
            //если такого результата нету, то вычисляем его
           const rezult = func(...args);
           // запоминаем рузультат под конкретный набор аргументов
           history[key] = rezult;
        }
        return history[key];
    }
}

//  функция для вычисления растояния мужде точками
function getDist(x1, y1, x2, y2) {
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}