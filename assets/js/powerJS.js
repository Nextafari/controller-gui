const shutDownUrl = `http://127.0.0.1:8000/ros_api/shutdown`;
const turnOnUrl = `http://127.0.0.1:8000/ros_api/turn_on`;
const sendTableUrl = `http://127.0.0.1:8000/ros_api/send_table`;
const robotCurrentLocation = "http://127.0.0.1:8000/ros_api/current-robot-location";
const robotDestionation = "http://127.0.0.1:8000/ros_api/chat/robot_message/";
const robotNextLocation = "http://127.0.0.1:8000/ros_api/get-robot-message/2/";


// Turns off the Robot on btn click 
function turnOff() {
    let proceedToShutDown = document.getElementById("proceed-btn").value;

    fetch(
    shutDownUrl, {
            method: "POST",
            body: JSON.stringify(proceedToShutDown),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response=> {
        return response.json();
    })

    // using an anon func to redirect users back to home.html after 3300 mili secs
    setTimeout(()=> {window.location.replace("home.html");}, 3300);
}


// Stops and starts the robot's movement
function startAndStopMovement() {
    let onBtn = document.getElementById("start-btn");

    // Event listener to change button color and text
    onBtn.addEventListener("click", ()=> {
        // Getting the parent node which is the div housind the button
        let powerSection = document.getElementById("power-section");

        // Getting the position of the child node to target
        let btnToChange = powerSection.childNodes[1];

        // Checks to confirm if the state of the button text content is at stop and set to start
        if (btnToChange.textContent != "START") {
            let modalContent = document.getElementById("shutdown-modalBody");
            btnToChange.textContent = "START";

            // Saving the state of the button in the session
            sessionStorage.setItem("button", btnToChange.textContent);

            // Sending data to the backend to start up the robot
            fetch(
                turnOnUrl, {
                    method: "POST",
                    body: JSON.stringify("STOP"),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(response=> {
                return response.json();
            });
            modalContent.textContent = "Robot has stopped! \n Push START to continue."
            modalContent.style.marginLeft = "7vw";
            onBtn.style.background = "#8dc26f";
        }else {
            let modalContent = document.getElementById("shutdown-modalBody");
            btnToChange.textContent = "STOP";

            // Saving the state of the button in the session
            sessionStorage.setItem("button", btnToChange.textContent);
            
            // Sending data to the backend to stop the robot
            fetch(
                turnOnUrl, {
                    method: "POST",
                    body: JSON.stringify("START"),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(response=> {
                return response.json();
            });
            modalContent.textContent = "Robot has started! \n Push STOP to discontinue Robot movement."
            onBtn.style.background = "#ed4264";
        }
    });
}

startAndStopMovement()


// Save the content of the button using session storage
// retrieve and add across pages
function stopButtonStatus() {
    // buttons to change
    let confirmTableBtn = document.querySelector(".btn-state");

    // Retrieve stored button state from session
    let storedBtn = sessionStorage.getItem("button");

    // Change text content of button
    confirmTableBtn.textContent = storedBtn;

    // change button colours
    if (confirmTableBtn.textContent === "STOP") {
        // change button colour to red
        confirmTableBtn.style.background = "#ed4264";
    }else if (confirmTableBtn.textContent === "START") {
        // Change button colour to green
        confirmTableBtn.style.background = "#8dc26f";
    }else {
        confirmTableBtn.textContent = "STOP";
    }
}

stopButtonStatus()


// Sends data via API
function sendDataToAPI(_this) {
    fetch(
        sendTableUrl, {
            method: "POST",
            body: JSON.stringify(`${_this}`),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        if (!response.ok) {
            return response.json();
        }
    })
}


// Just sends stuff to the backend and to the robot
function sendToBackendRobot(_this) {

    // Send the user's input to the endpoint
    sendDataToAPI(_this.value);
}


function hideModal() {
    let modal = document.getElementById("goToKitchenModal");
    modal.hidden = true;

    // using an anon func to redirect users back to home.html after 10mili secs
    setTimeout(async()=> {window.location.replace("home.html");}, 10);
}


// Using async function to fetch locations from the backend to display on the frontend
async function InsertLocation(url) {
    const response = await fetch(url);

    const data = await response.json();

    // creating a new p element
    const locationTxt = document.createElement("p");

    // styling the text
    locationTxt.style.color = "#a4c639";
    locationTxt.style.fontWeight = "600";

    // Creating a text for the p element
    const txtNode = document.createTextNode(data.location);

    // Appending the text to the p element
    locationTxt.appendChild(txtNode);

    // Appending the p element to the DOM
    const element = document.querySelector(".location-holder");
    element.appendChild(locationTxt);
}

InsertLocation(robotCurrentLocation);


// Edits the current location of the restaurant
function sendEditedLocation() {
    // Getting the user data from the form
    let newformData = document.forms["myForm1"]["fname1"].value;
    let formData = newformData.toUpperCase();

    // Validating form data from user, checking for empty and numeric inputs
    if (formData == "") {
    alert("Field must not be empty");
    return false;
    }else if (isNaN(formData) == false) {
        alert("You must enter either Alphabets or AlphaNumeric Values")
        return false;
    }else {
        // Using the fetch method to send user data to the backend db
        fetch(`http://127.0.0.1:8000/ros_api/edit-current-robot-location/1/`, {
                method: "PATCH",
                body: JSON.stringify(
                    {
                        "location": formData,
                    }
                ),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            if (!response.ok) {
                return response.json();
            }
        }).catch((error) => {
            console.error('Error Message:', error);
        });

        // sends data to the robot with the send Data function
        sendDataToAPI(`LOCATION ${formData}`);
    }
}


async function sendDataOnLoad() {
    let url = robotCurrentLocation;
    const response = await fetch(url);

    const data = await response.json();

    let currentLocation = data.location;

    sendDataToAPI(`LOCATION ${currentLocation}`);
    return currentLocation;
}


// displays the current table the robot goes to using ajax
async function showRobotActiveJob() {
    const url = robotNextLocation;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    document.getElementById("currentTable").textContent = data;
    document.getElementById("currentTable").style.textAlign = "center";
    document.getElementById("currentTable").style.fontWeight = "700";
    document.getElementById("currentTable").style.fontSize = "26px";
}

setInterval(showRobotActiveJob, 5000);
