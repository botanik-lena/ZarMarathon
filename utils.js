//Получение случайного числа от 0 до num
export function random(min, max) {
    return Math.ceil(Math.random() * (max - min + 1)) + min;
}

//Счётчик нажатий  на кнопку
export function countBtn(maxCount, button, buttonName) {

    return function () {
        maxCount--;

        if (maxCount === 0) {
            button.disabled = true;
        }
        button.innerText = `${buttonName} ${maxCount}`;

        return maxCount;
    }
}

//GenerateLog



//Функция отключения всех кнопок
export function disable() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((item) => {
        item.disabled = true;
    });
}
