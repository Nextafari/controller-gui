// Attribute Helper Func
// function setAttributes(elem, attrs) {
//     for (let name in attrs) {
//         elem.setAttribute(name, attrs[name]);
//     }
// }

// Function to set cookies to store tables that were selected by the user
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


// Saving the selected tables in an array
function selectedTables() {
    // An empty arry to save the values of the clicked tables
    let valueContainer = [];
    // adding an event listener to the pick up the clicks and save the tables clicked on
    document.body.addEventListener("click", event=> {
        if (event.target.nodeName == "BUTTON") {
            valueContainer.push(event.target.textContent);
            
            setCookies("selected Tables", valueContainer, 1);
            let getBrowserCookie = getCookie("selected Tables");
            // check if cookie exists and if user has clicked to move to the next page, display tables stored in cookie
            // in a new page for user to confirm their selection
            console.log(document.cookie);
            console.log(valueContainer);
        }
    });
}


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
        const btnNode = document.createTextNode("テーブル " + tableNumber.table_number);
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
