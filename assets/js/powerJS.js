// Turns off the Robot on btn click 
function turnOff() {
    let proceedToShutDown = document.getElementById("proceed-btn").value;

    fetch(
    `http://127.0.0.1:8000/ros_api/shutdown`, {
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


// Turns the robot on by sending a message to it via the backend
// function startRobot() {
//     let turnOnBtn = document.querySelector(".start-btn").value;
//     console.log("This is the turn on butn", turnOnBtn);
//     fetch(
//         `http://127.0.0.1:8000/ros_api/turn_on`, {
//             method: "POST",
//             body: JSON.stringify(proceedToShutDown),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }
//     ).then(response=> {
//         return response.json();
//     })
// }

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
                `http://127.0.0.1:8000/ros_api/turn_on`, {
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
                `http://127.0.0.1:8000/ros_api/turn_on`, {
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

    console.log("I am the child nodes", confirmTableBtn.textContent);
}

stopButtonStatus()
