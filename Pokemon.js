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
    }
}

export default Pokemon;