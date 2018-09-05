document.addEventListener("DOMContentLoaded", function() { //Equivalent of the Jquery on document ready, waits until page loads to run code 
    const body = document.body;

    for(let i = 0; i <10; i++) {
        body.appendChild(document.createElement('div')).className = "state-link";
    }

});

function addState() {

}

function loadState() {

}
