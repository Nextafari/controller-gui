async function InsertTables(url, tableKeypad) {
    const myTable = tableKeypad.querySelector(".table-btn");
    const response = await fetch(url);
    const data = await response.json();
    // Looping through data from the endpoint
    for (tableNumber of data) {
        console.log(tableNumber.table_number)
        // creating a new button element
        const tableButton = document.createElement("button");
        // Using already styled css class names to style buttons
        tableButton.className = "table-btn btn btn-md";
        // Creating a text for the button
        const btnNode = document.createTextNode("Table " + tableNumber.table_number);
        // Appending the text to the button
        tableButton.appendChild(btnNode);
        // Appending the button to the DOM
        const element = document.querySelector(".table-keypad");
        element.appendChild(tableButton);
        
    }

    console.log(data);
}

InsertTables("http://127.0.0.1:8000/restautant_api/all_tables/", document.querySelector(".table-keypad"));
