//Получение случайного числа от 0 до num
function random(min, max) {
    return Math.ceil(Math.random() * (max - min + 1)) + min;
}

export default random;