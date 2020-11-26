import random from "./random.js";

function $getElById(id) {
    return document.getElementById(id);
}


const $btn = $getElById("btn-kick");
const $btnDischarge = $getElById("btn-discharge");
const $btnRandomize = $getElById("btn-randomize");

const character = {
    name: "Pikachu",
    defaultHP: 200,
    damageHP: 200,
    elHP: $getElById("health-character"),
    elProgressbar: $getElById("progressbar-character"),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}

const enemy = {
    name: "Charmander",
    defaultHP: 200,
    damageHP: 200,
    elHP: $getElById("health-enemy"),
    elProgressbar: $getElById("progressbar-enemy"),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
    discharge,
}
//Обработчик кнопки Thunder Jolt
function attackThunderJolt() {
    let count = 0;
    let balance = 10;

    return function () {
        count++;
        balance--;
        character.changeHP(random(40));
        enemy.changeHP(random(40));
        console.log("Kick!");

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
        enemy.discharge();
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
            enemy.discharge();
            console.log("Luck smiled at Pikachu");
        }
        else if (ran < 15) {
            character.changeHP(random(15));
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

//Удар Thunder Jolt
function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);
    createLog(log);

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert(`Бедный ${this.name} проиграл бой`);
        $btn.disabled = true;
        $btnDischarge.disabled = true;
    }

    this.renderHP();
}

//Функция удара в зависимости от кол-ва букв в name игрока
function discharge() {
    if ((this.name.length % 2 === 0) && (this.damageHP > 10)) {
        this.damageHP -= 10;

        const log = this === enemy ? generateLog(this, character, 10) : generateLog(this, enemy, count);
        console.log(log);
        createLog(log);
    }
    else if (this.damageHP > 19) {
        this.damageHP -= 19;

        const log = this === enemy ? generateLog(this, character, 19) : generateLog(this, enemy, count);
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
//Отображение конкретных игроков
function init() {
    console.log("Start Game!");
    character.renderHP();
    enemy.renderHP();
}

//Отображение жизни и прогрессбара
function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

//Отрисовка жизни
function renderHPLife() {
    this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
}

//Отрисовка прогрессбара
function renderProgressbarHP() {
    this.elProgressbar.style.width = ((this.damageHP / this.defaultHP) * 100) + "%";
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
    let firstDm = firstPerson.damageHP;
    let firstDf = firstPerson.defaultHP;

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

//Запуск игры
init();

