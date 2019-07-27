document.querySelector("#add-state").addEventListener("click", (event) => {
    addState(stateTracker);
});


// document.querySelector("#delete-state-toggle").addEventListener("click", (event) => {
//     for(let i = 1; i < stateTracker + 1; i++ ) {
//         let state = document.querySelector(`#state-${i}`);
//     }
// });

let states;
chrome.storage.local.get(null, result => {
    states = Object.keys(result);
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
            for(let i =0; i < result[stateName].length; i++) {
                chrome.tabs.create({"url":result[stateName][i]});
            }
        });
    });
}