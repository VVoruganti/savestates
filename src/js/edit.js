let states; 

chrome.storage.local.get(null, (result) => {
    states = result;
    addStatesToUI(result);
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
    }
}

function updateEditField(stateName) {

}