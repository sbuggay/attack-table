const options = {
    attackTypeEVP: [true, "switchType", updateTableType],
    shieldBlock: [false, "shieldBlockInput"]
}

function updateTableType() {
    // Hide and show glancing or crushing depending on table type
    selectedAttackTable = options.attackTypeEVP[0] ? attackTableEVP : attackTablePVE;

    crushingRow.style = "display: none;";
    glancingRow.style = "display: none;";
    EVPControls.style = "display: none;";
    PVEControls.style = "display: none;";

    if (options.attackTypeEVP[0] === true) {
        baseDodge = 5;
        baseParry = 5;
        baseBlock = 5;
        defense = 300;
        crushingRow.style = "";
        EVPControls.style = "";

    }
    else {
        baseDodge = 6.5;
        baseParry = 14.00;
        baseBlock = 0;
        defense = 300;
        glancingRow.style = "";
        PVEControls.style = "";
    }
}

Object.keys(options).forEach(key => {
    const element = document.getElementById(options[key][1])
    if (!element) return;
    element.oninput = () => {
        options[key][0] = !options[key][0];

        // If there is a callback, invoke it.
        if (options[key][2]) {
            options[key][2]();
        }
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

function glancing() {
    return 4000;
}

function hit() {
    return Math.max(0, 10000 - (miss() + dodge() + block() + parry() + crit() + crushing()));
}

const attackTablePVE = [
    [miss, missElem, missRoll],
    [dodge, dodgeElem, dodgeRoll],
    [parry, parryElem, parryRoll],
    [glancing, glancingElem, glancingRoll],
    [block, blockElem, blockRoll],
    [crit, critElem, critRoll],
    [hit, hitElem, hitRoll]
];

const attackTableEVP = [
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
    if (start >= end || start > 100.00) return 0;
    return [start, end];
}

function updateTable() {

    // Hide and show glancing or crushing depending on table type
    selectedAttackTable = options.attackTypeEVP[0] ? attackTableEVP : attackTablePVE;

    let rollCurrent = 1;
    selectedAttackTable.forEach(t => {
        const roll = calculateRoll(rollCurrent, t[0]());
        const fixed = (t[0]() / 100);
        const realRoll = roll ? (roll[1] - roll[0] + 0.01).toFixed(2) : "0.00";
        const realRollText = `${fixed.toFixed(2) !== realRoll ? "(" + realRoll + "%)" : ""}`;
        t[1].innerText = `${fixed.toFixed(2)}% ${realRollText}`;
        // const rollBounds = ;
        t[2].innerText = roll ? `${roll[0]} to ${roll[1]}` : "Can't be rolled";
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
updateTableType();