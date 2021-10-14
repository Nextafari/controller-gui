// Attribute Helper Func
// function setAttributes(elem, attrs) {
//     for (let name in attrs) {
//         elem.setAttribute(name, attrs[name]);
//     }
// }

function selectedTables() {
    let button = document.querySelector(".table-keypad");
    let btnValue = document.querySelector(".table-btn").attributes.value;
    let valueContainer = [];
    button.addEventListener("click", function() {
        valueContainer.push(btnValue);

    console.log(valueContainer);
    });

    console.log(btnValue);
}


async function InsertTables(url) {
    // const myTable = tableKeypad.querySelector(".table-btn");
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

    console.log(data);
}

InsertTables("http://127.0.0.1:8000/restautant_api/all_tables/");



