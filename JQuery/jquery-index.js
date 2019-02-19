$(document).ready(function(){
  $("#fondo").hide();
})

function login() {
  var user = $("#user").val();
  var pwd = $("#pwd").val();
  if(user == "" || pwd == ""){
    if($("#datosVacios").length <= 0){
      $("<p id='datosVacios' style='color: red; margin-top: 5px;'>Rellena los datos para poder iniciar sesión</p>").insertAfter("#iniciar_S");
    }
  }else{
    $("#datosVacios").remove();
    $("#fondo").removeAttr("display");
    $.ajax({
      type: "post",
      url: "../../PHP/Sessions/Login.php",
      data: {Nom_User: user, passwd: pwd},
      dataType: "html",
      success: function (response) {
        $("#fondo").hide();
        if(response != "correct"){
          swal("Error", response, "error")
        }
        else{
          window.location.href = "inicio.html"
        }
        console.log(response);
      }
    });
  }
/*function(data, status){
$("#fondo").hide();
  if(data != "correct"){
    swal("Error", data, "error")
  }
  else{
    window.location.href = "inicio.html"
  }
}*/
}
