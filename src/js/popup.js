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

    // Makes the DOM elements for the state
    let container = document.createElement("div");
    let title = document.createElement("div");
    let edit = document.createElement("div");

    // Makes DOM elements for the text on the state
    let titleText = document.createElement("p");
    let editText = document.createElement("p");

    // Adds the classes in order to add styling
    container.className = "stateButton";
    title.className = "title";
    edit.className = "edit-state";

    // Fills the innerHTMl with the appropriate text
    titleText.innerHTML = stateName; // state has the text corresponding to name
    editText.innerHTML = "edit"; // just says edit on the edit section 
    // TO DO make the edit a fa icon

    // Adds the textual DOM elements to their appropriate containers
    title.append(titleText);
    edit.append(editText);

    // Adds the individual sections to the overall state
    container.append(title, edit);

    // Adds the button the UI
    document.querySelector("#states").append(container);

    // Adds an event listener to the state button to trigger the state functionality when clicked
    title.addEventListener("click", (event) => {
        chrome.storage.local.get(stateName, (result) => {
            for(let i = 0; i < result[stateName].length; i++) {  // for loop to iteratively create new tabs depending on the state definition
                chrome.tabs.create({"url":result[stateName][i], "active":false});
            }
        });
    });
}


function statePrompt() {
    chrome.tabs.create({
        url: chrome.extension.getURL('/src/views/dialog.html'),
        active: false
    }, function(tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true
            // incognito, top, left, ...
        });
    });
}

function deleteState(state) {
    console.log(state);
    let stateName = state.firstChild.firstChild.innerHTML;
    chrome.storage.local.remove(stateName);
    state.remove();
    location.reload();
}

function addDeleteClass(stateButtons) {
    for(let i = 0; i < stateButtons.length; i++) {
        const deleteButton = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = "x";
        deleteButton.className = "deleteButton";
        deleteButton.append(p);
        stateButtons[i].children[0].className = "delete-title";
        stateButtons[i].append(deleteButton);
        deleteButton.addEventListener("click", (event) => {
            let state = event.target.parentNode.parentNode;
            deleteState(state);
        })
    }
}

function removeDeleteClass(stateButtons) {
    for( let i = 0; i < stateButtons.length; i++) {
        stateButtons[i].children[0].className = "title";
        stateButtons[i].children[2].remove();
    }
}

function toggleDeleteState() {
    const stateButtons = document.querySelectorAll(".stateButton");
    if (stateButtons[0].children[0].className == "delete-title") {
        removeDeleteClass(stateButtons);
    } else {
        addDeleteClass(stateButtons);   
    }
}