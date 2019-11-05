const options = {
    shieldBlock: [false, shieldBlockInput]
}

Object.keys(options).forEach(key => {
    options[key][1].oninput = () => {
        options[key][0] = options[key][1].checked;
        updateTable();
    }
});

function roll() {
    return Math.floor(Math.random() * 10000) / 100;
}

let defense = 300;

function defenseBonus() {
    return (defense - 300) * 4;
}

function miss() {
    let c = 500;
    return Math.max(0, c + defenseBonus());
}

function dodge() {
    let c = 1000;
    return Math.max(0, c + defenseBonus());
}

function block() {
    let c = 1000;
    if (options["shieldBlock"][0]) {
        c = 7500;
    }

    return Math.max(0, c + defenseBonus());
}

function parry() {
    let c = 1000;
    return Math.max(0, c + defenseBonus());
}

function crit() {
    let c = 560;
    return Math.max(0, c - defenseBonus());
}

function hit() {
    return Math.max(0, 10000 - (miss() + dodge() + block() + parry() + crit()));
}

const attackTable = [
    [miss, missElem, missRoll],
    [dodge, dodgeElem, dodgeRoll],
    [block, blockElem, blockRoll],
    [parry, parryElem, parryRoll],
    [crit, critElem, critRoll],
    [hit, hitElem, hitRoll]
];

function calculateRoll(rollCurrent, percent) {
    const start = Math.min((rollCurrent / 100).toFixed(2), 99.99);
    const end = Math.min(((rollCurrent + percent - 1) / 100).toFixed(2), 99.99);

    if (start >= end || start > 99.99) return "Can't be rolled.";

    return start + " to " + end;
}

function updateTable() {

    let rollCurrent = 0;
    attackTable.forEach(t => {
        t[1].innerText = (t[0]() / 100).toFixed(2) + "%";
        // const rollBounds = ;
        t[2].innerText = calculateRoll(rollCurrent, t[0]());
        rollCurrent += t[0]();
    });
}

function changeDefense(e) {
    defense = defenseSlider.value;
    updateTable();
}

myRange.oninput = function () {
    defenseInput.value = this.value;
    defense = this.value;
    updateTable();
}

defenseInput.oninput = function () {
    myRange.value = this.value;
    defenseInput.value = this.value;
    defense = this.value;
    updateTable();
}

updateTable();