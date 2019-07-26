// const State = { //Initialization of the main state object that is going to be used to contain the links for each state
//     links: ["www.google.com","reddit.com"], //array that will hold the links for a particular state
//     DOMElementId:'default', //ID of the button that a State object will be linked to
//     addLink: (array) => { //function that can be used to add additional links to a state object parameters will have an array of links to add. 
//         for(let i = 0; i < array.length ; i++) {
//             array[i].push(this.links);
//         }
//     },
//     removeLink:(array) => { //function that can be used to delete links from a state object
//         for(let i = 0; i < array.length; i++) {
         
//     }
// };
// function State(links,DomElementId) { //constructor function for the State object
    
// }

// document.addEventListener("DOMContentLoaded", function() { //Equivalent of the Jquery on document ready, waits until page loads to run code 
//     const body = document.body; // set body of the DOM to a constant value. 

//     for(let i = 0; i <10; i++) { // for loop that adds first 10 links initially. 
//         let tempDiv = document.createElement('div'); // assigns a new Div element to a temporary variable
//         tempDiv.className="state-link" // gives the div element a generic class of state-link
//         tempDiv.id = "link-" + i; //gives the div a unique id based on number
//         body.appendChild(tempDiv); // adds the div to the body

        
//     }

// });

// function loadState() { //function for loading the browsing session based on a state
// }

console.log("loaded")

let stateTracker = 1;

document.querySelector("#add-state").addEventListener("click", (event) => {
    
    console.log("click-event");
    
    stateTracker++;
    
    let container = document.createElement("div");
    let title = document.createElement("div");
    let edit = document.createElement("div");

    let titleText = document.createElement("p");
    let editText = document.createElement("p");

    container.className = "stateButton";
    container.id = `state-${stateTracker}`

    title.className = "title";
    edit.className = "edit-state";

    titleText.innerHTML = "Lorem Ipsum";
    editText.innerHTML = "edit";

    title.append(titleText);
    edit.append(editText);

    container.append(title, edit);


    document.querySelector("#states").append(container);

});


document.querySelector("#delete-state-toggle").addEventListener("click", (event) => {
    for(let i = 1; i < stateTracker + 1; i++ ) {
        let state = document.querySelector(`#state-${i}`);
    }
});