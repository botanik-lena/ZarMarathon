//Получение случайного числа от 0 до num
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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


//Генерация описания действий в бою
export function generateLog(firstPerson, secondPerson, loss) {        //loss - потеря
    let firstDm = firstPerson.hp.damageHP;
    let firstDf = firstPerson.hp.defaultHP;

    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${loss} [${firstDm}/${firstDf}]`
    ];

    return logs[random(0, logs.length - 1)];
}

//Запись действий боя в новые параграфы, где верхний параграф - последнее действие
export function createLog(log) {
    const $logs = document.querySelector("#logs");

    const $p = document.createElement("p");
    $p.innerHTML = log;
    $logs.insertBefore($p, $logs.children[0]);

}



//Функция отключения всех кнопок, кроме reset
export function disable() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((item) => {
        item.disabled = true;
    });
    document.querySelector(".reset").disabled = false;
}
