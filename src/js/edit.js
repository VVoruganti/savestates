let states; // global variable used to store the state of chrome storage

const currentNameField = document.querySelector("#currentStateName"); // gets the DOM Node for the current name
const newNameField = document.querySelector("#newStateName"); // Gets the DOM Node for the new name input field
const linksField = document.querySelector("#stateLinks"); // gets the DOM Node for the links textarea


// Populates the states variable and the states in the navbar
chrome.storage.local.get(null, (result) => {
    states = result;
    addStatesToUI(result);
})

// Adds event listener to the submit button to update the states when clicked
document.querySelector("input[type=submit]").addEventListener("click", (event) => {
    updateState(currentNameField.innerHTML);
})

/**
 * This is a method that will populate the navbar with the states and add event listeners
 * that allow the states to be edited. 
 * @param {Object} states holds the states from chrome storage
 */
function addStatesToUI(states) {
    let stateNames = Object.keys(states);
    const nav = document.querySelector("#navbar");
    for(let i = 0; i < stateNames.length; i++) {
        const container = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = stateNames[i];
        container.className = "state";
        container.append(p);
        nav.appendChild(container);
        // Adds event listener that updates edit fields to match a particular state
        container.addEventListener("click", (event) => {
            currentNameField.innerHTML = stateNames[i];
            newNameField.value = stateNames[i];
            linksField.value = states[stateNames[i]];
        });
    }
}

/**
 * A method used to update a state in chrome storage based
 * on the edit fields
 * @param {String} stateName 
 */
function updateState(stateName) {
    let newState = newNameField.value;
    let arr = linksField.value.split(", ");
    chrome.storage.local.remove(stateName);
    chrome.storage.local.set({[newState]:arr}, () => {
        location.reload();
    });
}