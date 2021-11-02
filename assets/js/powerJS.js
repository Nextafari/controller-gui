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


    onBtn.addEventListener("click", ()=> {
        console.log("Hey 1");
        let powerSection = document.getElementById("power-section");

        // Getting the position of the child node to target
        let btnToChange = powerSection.childNodes[1];

        if (btnToChange.textContent == "START") {
            btnToChange.textContent = "STOP";
            onBtn.style.background = "#ed4264";
            console.log("Hey 2");
        }else {
            btnToChange.textContent = "START";
            onBtn.style.background = "#8dc26f";
        }
    });
}

startAndStopMovement()
