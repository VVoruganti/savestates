document.querySelector("#add-state").addEventListener("click", (event) => {
    let name = prompt("Name your new state");
    if( name != null) {
        chrome.storage.local.set({[name]:["http://www.google.com"]});
        addState(name);
    }
});

document.querySelector("#delete-state-toggle").addEventListener("click", (event) => {
    const stateButtons = document.querySelectorAll(".stateButton");
    for(let i = 0; i < stateButtons.length; i++) {
        const deleteButton = document.createElement("div");
        const p = document.createElement("p");
        p.innerHTML = "x"
        deleteButton.className = "deleteButton";
        deleteButton.append(p);
        stateButtons[i].children[0].className = "delete-title";
        stateButtons[i].append(deleteButton);
    }
})

// document.querySelector("#delete-state-toggle").addEventListener("click", (event) => {
//     for(let i = 1; i < stateTracker + 1; i++ ) {
//         let state = document.querySelector(`#state-${i}`);
//     }
// });

let stateTracker;
let states;
chrome.storage.local.get(null, result => {
    states = Object.keys(result);
    stateTracker = states.length ;
    for(let i = 0; i < states.length; i++) {
        addState(states[i]);
    }
})


/**
 * Used to add state buttons to the UI
 */
function addState(stateName) {
    
    let container = document.createElement("div");
    let title = document.createElement("div");
    let edit = document.createElement("div");

    let titleText = document.createElement("p");
    let editText = document.createElement("p");

    container.className = "stateButton";

    title.className = "title";
    edit.className = "edit-state";

    titleText.innerHTML = stateName;
    editText.innerHTML = "edit";

    title.append(titleText);
    edit.append(editText);

    container.append(title, edit);
    document.querySelector("#states").append(container);

    container.addEventListener("click", (event) => {
        chrome.storage.local.get(stateName, (result) => {
            console.log(result[stateName]);
            for(let i = 0; i < result[stateName].length; i++) {
                chrome.tabs.create({"url":result[stateName][i], "active":false});
            }
        });
    });
}