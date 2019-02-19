$(document).ready(function(){
  $("#fondo").hide();
})

function login() {
  var user = $("#user").val();
  var pwd = $("#pwd").val();
  $("#fondo").show();
  $.post("../../PHP/Sessions/Login.php",
  {
    Nom_User: user,
    passwd: pwd,
  },
function(data, status){
  $("#fondo").hide();
  if(data != "correct"){
    swal("Error", data, "error")
  }
  else{
    window.location.href = "inicio.html"
  }
})
}
