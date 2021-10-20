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
