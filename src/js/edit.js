let states; 

const currentNameField = document.querySelector("#currentStateName");
const newNameField = document.querySelector("#newStateName");
const linksField = document.querySelector("#stateLinks");

chrome.storage.local.get(null, (result) => {
    states = result;
    addStatesToUI(result);
})

document.querySelector("input[type=submit]").addEventListener("click", (event) => {
    updateEditField(currentNameField.value);
})

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
        container.addEventListener("click", (event) => {
            console.log(stateNames[i]);
            currentNameField.value = stateNames[i];
            newNameField.value = stateNames[i];
            linksField.value = states[stateNames[i]];
        });
    }
}

function updateEditField(stateName) {
    console.log(linksField.value);
    let arr = linksField.value.split(", ");
    console.log(arr);
    chrome.storage.local.set({[stateName]:arr}, (result) => {
        console.log(result);
    });

}