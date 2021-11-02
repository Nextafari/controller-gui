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

    // using an anon func to redirect users back to index.html after 3300 mili secs
    setTimeout(()=> {window.location.replace("index.html");}, 3300);
}


// Turns the robot on by sending a message to it via the backend
function startRobot() {
    let turnOnBtn = document.querySelector(".start-btn").value;
    console.log("This is the turn on butn", turnOnBtn);
    fetch(
        `http://127.0.0.1:8000/ros_api/turn_on`, {
            method: "POST",
            body: JSON.stringify(proceedToShutDown),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response=> {
        return response.json();
    })
}


function startAndStopMovement() {
    let onBtn = document.getElementById("start-btn");

    // Event listener to change button color and text
    onBtn.addEventListener("click", ()=> {
        // Getting the parent node which is the div housind the button
        let powerSection = document.getElementById("power-section");

        // Getting the position of the child node to target
        let btnToChange = powerSection.childNodes[1];

        if (btnToChange.textContent == "START") {
            let modalContent = document.getElementById("shutdown-modalBody");
            btnToChange.textContent = "STOP";
            modalContent.textContent = "Robot has been stopped! \n Push START to continue."
            onBtn.style.background = "#ed4264";
            console.log("Hey 2");
        }else {
            let modalContent = document.getElementById("shutdown-modalBody");
            btnToChange.textContent = "START";
            modalContent.textContent = "Robot has started! \n Push STOP to stop Robot."
            onBtn.style.background = "#8dc26f";
        }
    });
}

startAndStopMovement()
