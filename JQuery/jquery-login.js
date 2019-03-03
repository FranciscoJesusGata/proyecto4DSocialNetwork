$.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                    window.location.replace("../../HTML/html/main.html");
                }
            },
    error: function(){
        console.log("error");
    }
});


$(document).ready(function(){
    $("#alerta_passwd").hide();
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#fondo").hide();
});

function login() {
    var user = $("#user").val();
    var pwd = $("#pwd").val();
    if(user.length < 1 || pwd.length < 1){
      if($("#alerta_passwd").is(":hidden")){
            $("#alerta_passwd").toggle("slow");
        }
    }else{
        if(!$("#alerta_passwd").is(":hidden")){
            $("#alerta_passwd").toggle("slow");
        }
        $("#fondo").removeAttr("display");
        $.ajax({
            type: "post",
            url: "../../PHP/Sessions/Login.php",
            data: {Nom_User: user, passwd: pwd},
            dataType: "html",
            success: function (response) {
                $("#fondo").hide();
                if(response != "correct"){
                    swal("Error", response, "error");
                }
                else{
                    window.location.href = "main.html";
                }
            }
        });
    }
}
