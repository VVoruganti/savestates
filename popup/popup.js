const State = {
    links: ["www.google.com","reddit.com"],
    DOMElementId:'default',
    addLinks: (array) => {
        for(let i = 0; i < array.length ; i++) {
            array[i].push(this.links);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() { //Equivalent of the Jquery on document ready, waits until page loads to run code 
    const body = document.body;

    for(let i = 0; i <10; i++) {
        body.appendChild(document.createElement('div')).className = "state-link";
    }

});

function loadState() {

}
