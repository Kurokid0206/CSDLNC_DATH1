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


//



//check number of sale_nav_page
function check_num_sales_page(max_page){

    var page_num = document.getElementById("sales-page-num").value;
    if(page_num<=1){
        document.getElementById("sales-btn_prev_page").classList.add("sales-btn--disable")
    }
    else{
        document.getElementById("sales-btn_prev_page").classList.remove("btn--disable")
    }
    if(page_num>=max_page){
        document.getElementById("sales-btn_next_page").classList.add("btn--disable")
    }
    else{
        document.getElementById("sales-btn_next_page").classList.remove("btn--disable")
    }

    if(page_num>max_page || page_num<1 ){
        document.getElementById("sales-page-num").classList.add("invalid")
        return false
    }
    document.getElementById("sales-page-num").classList.remove("invalid")
    return true
}
//Select month for sorting out the sales
function select_month(){
    var month=document.querySelector('#select-sales-type input').value
    if(!month){
        document.getElementById("tbl-sales").innerHTML =`<p>Chưa chọn tháng</p>`
        return
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(parseInt(JSON.parse(this.responseText).recordset[0].slsp)==0){
            document.getElementById("tbl-sales").innerHTML="Danh sách trống"
            return
        }
        max_page=parseInt(parseInt(JSON.parse(this.responseText).recordset[0].slsp)/100)+1;
        
        document.getElementById('sale-form-navipage').style.display='flex';
        document.getElementById("sales-page-num").value=1
        goto_sales_page();
    }
    
    xhttp.open("POST", "sales-rows");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('month='+month+'-01');
}
//show current sales page
function goto_sales_page(){
    var month=document.querySelector('#select-sales-type input').value
    if(!check_num_sales_page(max_page)){
        document.getElementById("sales-page-num").classList.add("invalid")
        return;
    }
    var xhttp = new XMLHttpRequest();
    var page=document.getElementById("sales-page-num").value

    xhttp.onload = function() {
        var tbl=htmlTable(JSON.parse(this.responseText).recordset);
        document.getElementById("tbl-sales").innerHTML=tbl;
    }

    xhttp.open("POST", "sales-dat");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('month='+month+'-01'+'&bg='+(page-1)*100+'&end='+page*100);
}
//show next sales page
function goto_next_sales_page(){
    var page=parseInt(document.getElementById("sales-page-num").value);
    page +=1;
    document.getElementById("sales-page-num").value=page;
    if(!check_num_sales_page(max_page)){
        return;
    }
    goto_sales_page();
}
//tbl edit
const row = html => `<tr>\n${html}</tr>\n`,
      heading = object => row(Object.keys(object).reduce((html, heading) => (html + `<th>${heading}</th>`), '')),
      datarow = object => row(Object.values(object).reduce((html, value) => (html + `<td>${value}</td>`), ''));
//convert JSON to table                               
function htmlTable(dataList) {
  return `<table class="tbl">
            ${heading(dataList[0])}
            ${dataList.reduce((html, object) => (html + datarow(object)), '')}
          </table>`
}
//Check empty in form value
function Check_empty() {
    var inputs = document.querySelectorAll('input:required')
    inputs.forEach(function(input) {
        input.onblur = function() {
            if (!input.value.trim()) {
                input.classList.add('invalid')

            } else {
                input.classList.remove('invalid')
            }
        }
    })
}
//Check empty in form value on load
Check_empty();

