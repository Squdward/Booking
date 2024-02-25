/**
 * Объединяет два объекта глубоким образом, сохраняя все вложенные свойства и их значения.
 * @param {Object} target - Целевой объект, в который будет произведено объединение.
 * @param {Object} source - Объект, который будет объединен с целевым объектом.
 * @returns {Object} - Объект, полученный в результате объединения.
 */
function deepmerge(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepmerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return target;
}

module.exports = deepmerge;