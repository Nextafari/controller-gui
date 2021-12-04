const sendTable = `http://127.0.0.1:8000/ros_api/send_table`;

// Using async function to fetch tables from the backend and display them on the frontend for setup
async function setupTables(url) {
    const response = await fetch(url);

    const data = await response.json();

    // Looping through data from the endpoint
    for (tableNumber of data) {
        // creating a new button element
        const tableButton = document.createElement("button");

        // Using already styled css classes to style buttons
        tableButton.classList = "setupTable-btn btn-md";

        // Creating a text for the button
        const btnNode = document.createTextNode("SAVE TABLE " + tableNumber.table_number);

        // Appending the text to the button
        tableButton.appendChild(btnNode);

        // Appending the button to the DOM and also assigning values to them
        const element = document.querySelector(".setupTable-keypad");
        // element.appendChild(tableButton).setAttribute('value', tableNumber.table_number);
        element.appendChild(tableButton);
        
    }
}

setupTables("http://127.0.0.1:8000/restautant_api/all_tables/");


// Disable selected buttons
function disableSelectedBtns(_this) {
    _this.disabled = "true";
}

// Changes the color of the button when selected
function changeButtonColor(_this) {
    _this.style.backgroundColor = "#1f9646";
}


// Sends data to the backend as soon as user clicks
function robotTableSetup() {
    // adding an event listener to the pick up the setup buttons clicked on and exclude other buttons
    document.body.addEventListener("click", event=> {
        if (event.target.nodeName == "BUTTON" && event.target.classList == "setupTable-btn btn-md") {
            // Calling the function to change the color of the button that is clicked based on the event
            changeButtonColor(event.target);
            
            // Send the user's input to the endpoint
            fetch(
                sendTable, {
                    method: "POST",
                    body: JSON.stringify(event.target.textContent),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(response => {
                if (!response.ok) {
                    return response.json();
                }
            })
            
            // Disables the button to avoid multiple clicks from the user
            disableSelectedBtns(event.target);
        }
    });
}

robotTableSetup()
