class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ selectors, name, hp, type }) {
        super(selectors);

        this.name = name;
        this.hp = {
            defaultHP: hp,
            damageHP: hp,
        };
        this.type = type;

        this.renderHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        const { elHP, hp: { defaultHP, damageHP } } = this;

        elHP.innerText = damageHP + " / " + defaultHP;
    }

    renderProgressbarHP() {
        const { elProgressbar, hp: { defaultHP, damageHP } } = this;

        elProgressbar.style.width = ((damageHP / defaultHP) * 100) + "%";
    }
}

export default Pokemon;