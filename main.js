import Pokemon from "./Pokemon.js";
import random from "./random.js";

//Создание игроков
const player1 = new Pokemon({
    name: "Pikachu",
    type: "electric",
    hp: 200,
    selectors: "character",
});
console.log(player1);

const player2 = new Pokemon({
    name: "Charmander",
    type: "fire",
    hp: 200,
    selectors: "enemy",
});
console.log(player2);

//Объявление кнопок
function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById("btn-kick");
const $btnDischarge = $getElById("btn-discharge");
const $btnRandomize = $getElById("btn-randomize");
const $btnSplash = $getElById("btn-splash");


//Рефакторинг, мне кажется только усложнил программу. Что стоит улучшить в моём коде, на Ваш взгляд?

//Обработчик кнопки Thunder Jolt
function attackThunderJolt() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;

        player1.changeHP(random(40), function (count) {
            const log = generateLog(player1, player2, count);
            createLog(log);
            console.log(log);
            if (player1.hp.damageHP === 0) disable();
        });

        player2.changeHP(random(40), function (count) {
            const log = generateLog(player2, player1, count);
            createLog(log);
            console.log(log);
            if (player2.hp.damageHP === 0) disable();
        });

        if (balance === 0) {
            $btn.disabled = true;
        }
        console.log(count + " Thunder Jolt!");
        console.log(`Осталось ${balance} нажатий на кнопку Thunder Jolt`);
        document.querySelector("#btn-kick").innerText = "Thunder Jolt " + balance;
    }
}

//Кнопка Thunder Jolt ударит двоих сразу
const attack1 = attackThunderJolt();
$btn.addEventListener("click", attack1);


//Обработчик кнопки Discharge
function attackDischarge() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;

        const dis = player2.discharge();    //чтобы получить размер урона
        const log = generateLog(player2, player1, dis);
        createLog(log);
        console.log(log);

        if (player2.hp.damageHP === 0) disable();

        if (balance === 0) {
            $btnDischarge.disabled = true;
        }

        console.log(count + " Discharge!");
        console.log(`Осталось ${balance} нажатий на кнопку Discharge`);
        document.querySelector("#btn-discharge").innerText = "Discharge " + balance;
    }
}

//Кнопка Discharge ударит врага
const attack2 = attackDischarge();
$btnDischarge.addEventListener("click", attack2);


//Обработчик кнопки Randomize 
function attackRandomize() {
    let count = 0;
    let balance = 10;

    return function () {
        balance = 0;
        let ran = random(30);

        if (ran > 15) {
            const dis = player2.discharge();    //чтобы получить размер урона
            const log = generateLog(player2, player1, dis);
            createLog(log);
            console.log(log);

            if (player2.hp.damageHP === 0) disable();
            console.log("Luck smiled at Pikachu");
        }
        else if (ran < 15) {
            player1.changeHP(random(55), function (count) {
                const log = generateLog(player1, player2, count);
                createLog(log);
                console.log(log);

                if (player1.hp.damageHP === 0) disable();
            });

            console.log("Luck smiled at Charmander");
        }
        else {
            console.log("Lucky to all pokemon");
        }

        document.querySelector("#btn-randomize").innerText = "Randomize " + balance;
        $btnRandomize.disabled = true;
    }
}

//Кнопка рандомного выбора удара
const attack3 = attackRandomize();
$btnRandomize.addEventListener("click", attack3);

//Обработчик Splash
function attackSplash() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;
        let result = prompt("1 - ударить первого игрока, 2 - ударить второго игрока");


        if (result == 1) {
            player1.splash();
            const log = generateLog(player1, player2, count);
            createLog(log);
            console.log(log);
            if (player1.hp.damageHP === 0) disable();
        }
        else if (result == 2) {
            player2.splash();
            const log = generateLog(player2, player1, count);
            createLog(log);
            console.log(log);
            if (player2.hp.damageHP === 0) disable();
        }
        else {
            console.log("Вы ввели неверный номер игрока");
        }

    }
}

//Кнопка Splash
const attack4 = attackSplash();
$btnSplash.addEventListener("click", attack4);


//Запись действий боя в новые параграфы, где верхний параграф - последнее действие
function createLog(log) {
    const $logs = document.querySelector("#logs");

    const $p = document.createElement("p");
    $p.innerHTML = log;
    $logs.insertBefore($p, $logs.children[0]);

}

//Генерация описания действий в бою
function generateLog(firstPerson, secondPerson, loss) {        //loss - потеря
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

    return logs[random(logs.length) - 1];
}

//Функция отключения всех кнопок
function disable() {
    $btn.disabled = true;
    $btnDischarge.disabled = true;
    $btnRandomize.disabled = true;
}

//Запуск игры
(function init() {
    console.log("Start Game!");
})();

