$(function() {
    FastClick.attach(document.body);
});
function login(){
    var name = document.getElementById("nameinput");
    var key = document.getElementById("keyinput");
    if(!name.value){
        alert('账号不能为空!');
        return;
    }
    if(!key.value){
        alert('密码不能为空!');
        return;
    }
    window.location.replace("./html/homepage/index.html")
    // window.location.href = "./html/homepage/index.html"
}