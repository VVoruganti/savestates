// event listener that adds new state to UI. defaults to just having google in the state
document.querySelector("#add-state").addEventListener("click", (event) => {
    let name = window.prompt("Name your new state");
    if( name != null) {
        chrome.storage.local.set({[name]:["http://www.google.com"]});
        addStateToUI(name);
        location.reload();
    }
});

// Event listener for the delete button
// TO DO change it to toggle instead of simply adding the delete state
document.querySelector("#delete-state-toggle").addEventListener("click", (event) => {
    toggleDeleteState();
})


// Initializes the states that are stored in local storage into the UI 
let stateTracker;
let states;
chrome.storage.local.get(null, result => {
    states = Object.keys(result);
    stateTracker = states.length ;
    for(let i = 0; i < states.length; i++) {
        addStateToUI(states[i]);
    }
})


/**
 * Used to add state buttons to the UI
 * builds the DOM element from scratch
 */
function addStateToUI(stateName) {
    
    let container = document.createElement("div");
    container.className = "container level is-mobile";

    let button = document.createElement("button");
    button.className = "button level-item is-primary";
    button.innerHTML = stateName;

    container.append(button);
    
    document.querySelector("#states").append(container);

    button.addEventListener("click", (event) => {
        chrome.storage.local.get(stateName, (result) => {
            for(let i = 0; i < result[stateName].length; i++) {  // for loop to iteratively create new tabs depending on the state definition
                chrome.tabs.create({"url":result[stateName][i], "active":false});
            }
        });
    }); 

}

// Event listeners that opens edit page when the edit button is clicked
document.querySelector("#edit").addEventListener("click", (event) => {
    chrome.tabs.create({"url":"/src/views/edit.html", "active":true});
})

// Event listeners that adds a state with the tabs in the current window. 
document.querySelector("#save").addEventListener("click", (event) => {
    chrome.tabs.query({currentWindow:true}, (result) => {
        let name = window.prompt("Name for new State"); // Gets the name for the state
        if(name != null) {
            let links = []; // array to store the tabs. 
            for(let i =0; i < result.length; i++) {
                links.push(result[i].url);
            }
            chrome.storage.local.set({[name]:links}); // stores the state in chrome storage
            addStateToUI(name); // adds the state tot he UI
            location.reload(); // Reloads the extension
        }
    })
})

/**
 * Function used to delete a state
 * Deletes the state from DOM and chrome storage
 * @param {Node} state DOM Node that contains the state button
 */
function deleteState(state) {
    let stateName = state.innerHTML; // Gets the name state
    chrome.storage.local.remove(stateName); // Removes the state from the chrome storage
    state.remove(); // Removes the state Node from the DOM
    location.reload(); // Refresh the extension
}

/**
 * Adds the delete buttons to each state Node
 * @param {Array of Node Objects} stateButtons 
 */
function addDeleteClass(stateButtons) {
    for(let i = 0; i < stateButtons.length; i++) {
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete level-item has-background-danger is-large";
        stateButtons[i].append(deleteButton);
        deleteButton.addEventListener("click", (event) => {
            let state = event.target.parentNode.children[0];
            deleteState(state);
        })
    }
}

/**
 * A function used to switch the statebuttons back to regular mode. 
 * @param {Array} stateButtons - Array of states from DOM. 
 */
function removeDeleteClass(stateButtons) {
    // Loops through the state buttons and switches the titles back to normal titles
    // and removes the delete button from each state button. 
    for( let i = 0; i < stateButtons.length; i++) {
        stateButtons[i].children[1].remove();
    }
}

/**
 * Removes the delete class if already there or adds it if not
 */
function toggleDeleteState() {
    const stateButtons = document.querySelectorAll("#states > .container");
    if (stateButtons[0].children.length === 2) {
        removeDeleteClass(stateButtons);
    } else {
        addDeleteClass(stateButtons);   
    }
}
