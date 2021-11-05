//Show the bill form and turn off all others
function show_bill_form() {
    var div = document.querySelector("#form-insert-bill")
    div.style.display = "block";
    div = document.querySelector("#form-insert-details")
    div.style.display = "none";
    div = document.querySelector("#bills-container")
    div.style.display = "none";
    div = document.querySelector("#select-sales-type")
    div.style.display = "none";
}
//Show the details form and turn off all others
function show_details_form() {
    var div = document.querySelector("#form-insert-bill")
    div.style.display = "none";
    div = document.querySelector("#form-insert-details")
    div.style.display = "block";
    div = document.querySelector("#bills-container")
    div.style.display = "none";
    div = document.querySelector("#select-sales-type")
    div.style.display = "none";
}

//Show the sales table and turn off all others
function show_sales() {
    var div = document.querySelector("#form-insert-bill")
    div.style.display = "none";
    div = document.querySelector("#form-insert-details")
    div.style.display = "none";
    div = document.querySelector("#bills-container")
    div.style.display = "none";
    div = document.querySelector("#select-sales-type")
    div.style.display = "block";

}


