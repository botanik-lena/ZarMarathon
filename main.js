import Pokemon from "./Pokemon.js";
import random from "./random.js";

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


function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById("btn-kick");
const $btnDischarge = $getElById("btn-discharge");
const $btnRandomize = $getElById("btn-randomize");


//Обработчик кнопки Thunder Jolt
function attackThunderJolt() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;

        player1.changeHP(random(40), function (count) {
            const log = generateLog(player1, player2, count);
            console.log(log);
            if (player1.hp.damageHP === 0) disable();
        });
        player2.changeHP(random(40), function (count) {
            const log = generateLog(player2, player1, count);
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
const attack1 = attackThunderJolt();

//Кнопка Thunder Jolt ударит двоих сразу
$btn.addEventListener("click", attack1);


//Обработчик кнопки Discharge
function attackDischarge() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;
        player2.discharge();
        if (balance === 0) {
            $btnDischarge.disabled = true;
        }
        console.log(count + " Discharge!");
        console.log(`Осталось ${balance} нажатий на кнопку Discharge`);
        document.querySelector("#btn-discharge").innerText = "Discharge " + balance;
    }
}
const attack2 = attackDischarge();

//Кнопка Discharge ударит врага
$btnDischarge.addEventListener("click", attack2);


//Обработчик кнопки Randomize 
function attackRandomize() {
    let count = 0;
    let balance = 10;

    return function () {
        balance = 0;
        let ran = random(30);

        if (ran > 15) {
            player2.discharge();
            console.log("Luck smiled at Pikachu");
        }
        else if (ran < 15) {
            // character.changeHP(random(15));
            console.log("Luck smiled at Charmander");
        }
        else {
            console.log("Lucky to all pokemon");
        }

        document.querySelector("#btn-randomize").innerText = "Randomize " + balance;
        $btnRandomize.disabled = true;
    }
}

const attack3 = attackRandomize();

//Кнопка рандомного выбора удара
$btnRandomize.addEventListener("click", attack3);


//Функция удара в зависимости от кол-ва букв в name игрока
function discharge() {
    if ((this.name.length % 2 === 0) && (this.damageHP > 10)) {
        this.damageHP -= 10;

        const log = this === player2 ? generateLog(this, player1, 10) : generateLog(this, player2, count);
        console.log(log);
        createLog(log);
    }
    else if (this.damageHP > 19) {
        this.damageHP -= 19;

        const log = this === player2 ? generateLog(this, player1, 19) : generateLog(this, player2, count);
        console.log(log);
        createLog(log);
    }
    else {
        this.damageHP = 0;
        alert(`Бедный ${this.name} проиграл бой`);
        $btnDischarge.disabled = true;
        $btn.disabled = true;
    }

    this.renderHP();
}
//Запуск игры
function init() {
    console.log("Start Game!");
}

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

function disable() {
    $btn.disabled = true;
    $btnDischarge.disabled = true;
    $btnRandomize.disabled = true;
}

//Запуск игры
init();

