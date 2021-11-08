// Attribute Helper Func
// function setAttributes(elem, attrs) {
//     for (let name in attrs) {
//         elem.setAttribute(name, attrs[name]);
//     }
// }


// Set cookies to store tables that were selected by the user
function setCookies(cname, cvalue, exprdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exprdays*24*60*60*1000));
    let expires = "expires" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let cookie = ca[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return " ";
}


// Changes the color of the button when selected
function changeButtonColor(_this) {
    _this.style.backgroundColor = "#1f9646";
}


// Prevents user from selecting a table multiple times
function stopMultipleTableSelection(_this) {
    let alreadyInCookie = getCookie("selected Tables");
    let cookieValue = alreadyInCookie.split(",");

    for (let i = 0; i < cookieValue.length; i++) {
        if (_this.textContent === cookieValue[i]) {
            // Disables the button clicked by a user
            _this.disabled = true;
        }
    }

}


// Saving the selected tables in an array
function selectedTables() {
    // An empty arry to save the values of the clicked tables
    const valueContainer = [];
    
    // adding an event listener to the pick up the clicks and save the tables clicked on and exclude other buttons
    document.body.addEventListener("click", event=> {
        if (event.target.nodeName == "BUTTON" && event.target.classList == "table-btn btn btn-md") {
            // saves the user's selection for every click in the empty array
            valueContainer.push(event.target.textContent);

            // Calling the function to change the color of the button that is clicked based on the event
            changeButtonColor(event.target);
            
            // Using the set cookie function to create a cookie
            setCookies("selected Tables", valueContainer, 1);
            
            // Disables the button to avoid multiple clicks from the user
            stopMultipleTableSelection(event.target);

            console.log(valueContainer);

        }
    });
}


// Creates html elements for the selected tables on the next page
function sendTableNextPage() {
    let getBrowserCookie = getCookie("selected Tables");
    const cookieArray = getBrowserCookie.split(",")
    for (let i = 0; i < cookieArray.length; i++) {
        
        // Creating the button element (Parent Node)
        const tableButton = document.createElement("button");

        // Using already styled css classes to style buttons
        tableButton.classList = "table-btn btn btn-md";

        // Creating a text for the button from what we have in the cookie
        const btnNode = document.createTextNode(cookieArray[i]);

        // Appending the text to the child note of the button
        tableButton.appendChild(btnNode);

        // Appending the button to the DOM and also assigning values to them
        const element = document.querySelector(".confirm-table-keypad");
        element.appendChild(tableButton);
    }
}


// Using async function to fetch tables from the backend and display them on the frontend
async function InsertTables(url) {
    const response = await fetch(url);

    const data = await response.json();

    // Looping through data from the endpoint
    for (tableNumber of data) {
        console.log(tableNumber.table_number);

        // creating a new button element
        const tableButton = document.createElement("button");

        // Using already styled css classes to style buttons
        tableButton.classList = "table-btn btn btn-md";

        // Creating a text for the button
        const btnNode = document.createTextNode("TABLE " + tableNumber.table_number);

        // Appending the text to the button
        tableButton.appendChild(btnNode);

        // Appending the button to the DOM and also assigning values to them
        const element = document.querySelector(".table-keypad");
        element.appendChild(tableButton).setAttribute('value', tableNumber.table_number);
        
    }
    selectedTables()

    console.log(data);
}

InsertTables("http://127.0.0.1:8000/restautant_api/all_tables/");


// Removes any stray dynamic button on the confirmation page
function lockUp() {
    // Removing any button element on the DOM with a time interval
    let remvElement = document.querySelector(".table-btn");
    remvElement.remove()

    setTimeout(lockUp, 50);
}

// Sends the confirmed tables to robot via backend
function confirmTable() {
    const data = getCookie("selected Tables")
    const tableData = JSON.stringify(data)
    
    // Send the user's input to the endpoint
    fetch(
        `http://127.0.0.1:8000/ros_api/send_table`, {
            method: "POST",
            body: tableData,
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        if (!response.ok) {
            return response.json();
        }
    })

    // Removes button from DOM after being sent to the backend
    lockUp();

    // Deletes the cookie saved in the browser by expiring it
    document.cookie = "selected Tables=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // using an anon func to redirect users back to home.html after 3500 mili secs
    setTimeout(()=> {window.location.replace("home.html");}, 3500);
}
