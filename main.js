const $btn = document.getElementById("btn-kick");
const $btnDischarge = document.getElementById("btn-discharge");
const $btnRandomize = document.getElementById("btn-randomize");

const character = {
    name: "Pikachu",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-character"),
    elProgressbar: document.getElementById("progressbar-character"),
}

const enemy = {
    name: "Charmander",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-enemy"),
    elProgressbar: document.getElementById("progressbar-enemy"),
}

$btn.addEventListener("click", () => {
    console.log("Kick!");
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

$btnDischarge.addEventListener("click", () => {
    console.log("Discharge!");
    discharge(enemy);
});

$btnRandomize.addEventListener("click", () => {
    let ran = random(30);
    if (ran > 15) {
        discharge(enemy);
        console.log("Luck smiled at Pikachu");
    }
    else if (ran < 15) {
        changeHP(random(15), character);
        console.log("Luck smiled at Charmander");
    }
    else {
        console.log("Lucky to all pokemon");
    }
    $btnRandomize.disabled = true;
});

function init() {
    console.log("Start Game!");
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + " / " + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + "%";
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert("Бедный " + person.name + " проиграл бой!");
        $btn.disabled = true;
        $btnDischarge.disabled = true;
    }
    else {
        person.damageHP -= count;
    }

    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function discharge(person) {
    if ((person.name.length % 2 == 0) && (person.damageHP > 10)) {
        person.damageHP -= 10;
    }
    else if (person.damageHP > 19) {
        person.damageHP -= 19;
    }
    else {
        person.damageHP = 0;
        alert("Бедный " + person.name + " проиграл бой!");
        $btnDischarge.disabled = true;
        $btn.disabled = true;
    }


    renderHP(person);
}

init();

