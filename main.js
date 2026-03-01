// configuration
const API_URL = 'https://nodejs-dice-roller-crbxatb0dyanc8bc.centralus-01.azurewebsites.net';

// function to create the dice count selector
function createDiceSelector() {
    // create dropdown menu
    const diceCountSelect = document.createElement("select");
    diceCountSelect.id = "diceCount";
    
    // add default "Select dice count" option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select dice count";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    diceCountSelect.appendChild(defaultOption);
    
    // add options for 1-6 dice
    for (let i = 1; i <= 6; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        diceCountSelect.appendChild(option);
    }
    
    // insert the select element into the dicecount div
    document.getElementById("dicecount").appendChild(diceCountSelect);
    
    // event listener that shows/hides dice based on selection
    diceCountSelect.addEventListener("change", (event) => {
        const selectedCount = parseInt(event.target.value);
        updateDiceVisibility(selectedCount);
        // auto-roll when selection changes
        rollDice();
    });
    
    return diceCountSelect;
}

const diceCountSelect = createDiceSelector();

// update dice visibility based on selected count
function updateDiceVisibility(selectedCount) {
    for (let i = 1; i <= 6; i++) {
        const dice = document.getElementById(`dice${i}`);
        if (dice) {
            dice.style.display = i <= selectedCount ? "flex" : "none";
        }
    }
}

// initialize with all dice hidden (until selection is made)
updateDiceVisibility(0);

// random dice roll based on button press
function rollDice() {
    const selectedCount = parseInt(diceCountSelect.value);
    
    // Don't roll if no dice count is selected
    if (isNaN(selectedCount) || selectedCount === 0) {
        alert("Please select the number of dice first!");
        return;
    }

    // Roll the dice by making a request to the API
    fetch(`${API_URL}/roll/${selectedCount}`)
        .then(response => response.json())
        .then(data => {
            // Update the dice value displays with the results
            for (let i = 1; i <= selectedCount; i++) {
                const diceValue = document.getElementById(`dicevalue${i}`);
                if (diceValue) {
                    diceValue.textContent = data.dice[i - 1];
                }
            }
        });
}

// function to initialize the page
function initializePage() {
    // set default selection to 1
    diceCountSelect.value = "1";
    updateDiceVisibility(1);

    // automatically roll dice on page load
    rollDice();
    
    // focus the roll button
    document.getElementById("rollButton").focus();
}

// add click event listener to the roll button
document.getElementById("rollButton").addEventListener("click", rollDice);

// add keyboard event listener for Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        rollDice();
    }
});

// run initialization when page loads
window.addEventListener("load", initializePage);