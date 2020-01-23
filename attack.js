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
let baseDodge = 5;
let baseBlock = 5;
let baseParry = 5;

function defenseBonus() {
    return (defense - 300) * 4;
}

function miss() {
    let c = 500;
    return Math.max(0, c + defenseBonus());
}

function dodge() {
    let c = baseDodge * 100;
    return Math.max(0, c + defenseBonus());
}

function block() {
    let c = baseBlock * 100;
    if (options["shieldBlock"][0]) {
        c += 7500;
    }

    return Math.max(0, c + defenseBonus());
}

function parry() {
    let c = baseParry * 100;
    return Math.max(0, c + defenseBonus());
}

function crit() {
    let c = 560;
    return Math.max(0, c - defenseBonus());
}

function crushing() {
    return 1500;
}

function hit() {
    return Math.max(0, 10000 - (miss() + dodge() + block() + parry() + crit() + crushing()));
}

const attackTable = [
    [miss, missElem, missRoll],
    [dodge, dodgeElem, dodgeRoll],
    [parry, parryElem, parryRoll],
    [block, blockElem, blockRoll],
    [crit, critElem, critRoll],
    [crushing, crushingElem, crushingRoll],
    [hit, hitElem, hitRoll]
];

function calculateRoll(rollCurrent, percent) {
    const start = Math.min((rollCurrent / 100).toFixed(2), 100.00);
    const end = Math.min(((rollCurrent + percent - 1) / 100).toFixed(2), 100.00);

    if (start >= end || start > 100.00) return false;

    return [start, end];
}

function updateTable() {

    let rollCurrent = 1;
    attackTable.forEach(t => {
        const roll = calculateRoll(rollCurrent, t[0]());
        const fixed = (t[0]() / 100);

        t[1].innerText = fixed.toFixed(2) + "%";
        // const rollBounds = ;
        t[2].innerText = roll ? roll[0] + " to " + roll[1] : "Can't be rolled";
        rollCurrent += t[0]();
    });

    // hitTotal.innerText = ;
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

dodgeInput.oninput = function () {
    baseDodge = this.value;
    updateTable();
}

parryInput.oninput = function () {
    baseParry = this.value;
    updateTable();
}

blockInput.oninput = function () {
    baseBlock = this.value;
    updateTable();
}

updateTable();