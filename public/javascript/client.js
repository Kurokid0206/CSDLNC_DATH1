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

//login to mssql
function login(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var status=this.responseText;
        if(status!='0'){
            status=JSON.parse(status).originalError.message
            document.getElementById("form-login-message").innerHTML=status
        }else{
            var div = document.querySelector("#login-authorization")
            div.style.display = "none";
            div=document.querySelector("#login-authorized")
            div.style.display="block"
            document.querySelector("#login-authorized h1").innerHTML='Xin chào '+username
        }
        //if logged in then enable interaction for nav-menu
        var div=document.querySelector("#login-authorized")
        if(div.style.display != "none"){
            div = document.querySelector(".nav-menu")
            div.classList.remove("nav-menu--disable")
        }
    }

    xhttp.open("POST", "login");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('username='+username+'&password='+password);
}

//insert new bill
function insert_bill(){
    var maHD = document.getElementsByName("maHD")[0].value;
    var maKH = document.getElementsByName("maKH")[0].value;
    var NgayLap = document.getElementsByName("NgayLap")[0].value;

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("form-insert-bill-message").innerHTML=this.responseText
    }

    xhttp.open("POST", "insert-bill");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('maHD='+maHD+'&maKH='+maKH+'&NgayLap='+NgayLap);
}
//insert new bill detail
function insert_bill_detail(){
    var maHD = document.getElementsByName("maHD")[1].value;
    var maSP = document.getElementsByName("maSP")[0].value;
    var soluong = document.getElementsByName("soluong")[0].value;
    var giaban=document.getElementsByName("giaban")[0].value;
    var giagiam=document.getElementsByName("giagiam")[0].value;

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("form-insert-bill-detail-message").innerHTML=this.responseText
    }

    xhttp.open("POST", "insert-bill-detail");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('maHD='+maHD+'&maSP='+maSP+'&soluong='+soluong+'&giaban='+giaban+'&giagiam='+giagiam);
}
