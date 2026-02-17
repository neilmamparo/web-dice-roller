// Function to create the dice count selector
function createDiceSelector() {
    // Create dropdown menu
    const diceCountSelect = document.createElement("select");
    diceCountSelect.id = "diceCount";
    
    // Add default "Select dice count" option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select dice count";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    diceCountSelect.appendChild(defaultOption);
    
    // Add options for 1-6 dice
    for (let i = 1; i <= 6; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        diceCountSelect.appendChild(option);
    }
    
    // Insert the select element into the dicecount div
    document.getElementById("dicecount").appendChild(diceCountSelect);
    
    // Event listener that shows/hides dice based on selection
    diceCountSelect.addEventListener("change", (event) => {
        const selectedCount = parseInt(event.target.value);
        updateDiceVisibility(selectedCount);
        // Auto-roll when selection changes
        rollDice();
    });
    
    return diceCountSelect;
}

const diceCountSelect = createDiceSelector();

// Update dice visibility based on selected count
function updateDiceVisibility(selectedCount) {
    for (let i = 1; i <= 6; i++) {
        const dice = document.getElementById(`dice${i}`);
        if (dice) {
            dice.style.display = i <= selectedCount ? "flex" : "none";
        }
    }
}

// Initialize with all dice hidden (until selection is made)
updateDiceVisibility(0);

// Random dice roll based on button press
function rollDice() {
    const selectedCount = parseInt(diceCountSelect.value);
    
    // Don't roll if no dice count is selected
    if (isNaN(selectedCount) || selectedCount === 0) {
        alert("Please select the number of dice first!");
        return;
    }
    
    for (let i = 1; i <= 6; i++) {
        if (i <= selectedCount) {
            const diceValue = document.getElementById(`dicevalue${i}`);
            if (diceValue) {
                const randomValue = Math.floor(Math.random() * 6) + 1;
                diceValue.textContent = randomValue;
            }
        }
    }
}

// Function to initialize the page
function initializePage() {
    // Set default selection to 1
    diceCountSelect.value = "1";
    updateDiceVisibility(1);
    
    // Automatically roll dice on page load
    rollDice();
    
    // Focus the roll button
    document.getElementById("rollButton").focus();
}

// Add click event listener to the roll button
document.getElementById("rollButton").addEventListener("click", rollDice);

// Add keyboard event listener for Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        rollDice();
    }
});

// Run initialization when page loads
window.addEventListener("load", initializePage);