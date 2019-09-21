let states; // global variable used to store the state of chrome storage

const currentNameField = document.querySelector("#current-name"); // gets the DOM Node for the current name
const newNameField = document.querySelector("#new-name"); // Gets the DOM Node for the new name input field
const linksField = document.querySelector("#links"); // gets the DOM Node for the links textarea


// Populates the states variable and the states in the navbar
chrome.storage.local.get(null, (result) => {
    states = result;
    addStatesToUI(result);
})

// Adds event listener to the submit button to update the states when clicked
document.querySelector("button").addEventListener("click", (event) => {
    updateState(currentNameField.innerHTML);
})

/**
 * This is a method that will populate the navbar with the states and add event listeners
 * that allow the states to be edited. 
 * @param {Object} states holds the states from chrome storage
 */
function addStatesToUI(states) {
    let stateNames = Object.keys(states);
    for(let i = 0; i < stateNames.length; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = stateNames[i];
        li.append(a);

        document.querySelector(".menu-list").append(li);
        // Adds event listener that updates edit fields to match a particular state
        li.addEventListener("click", (event) => {
            if (document.querySelector(".is-active") != null) {
                document.querySelector(".is-active").classList.remove("is-active");
            }
            event.target.classList.add("is-active");
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