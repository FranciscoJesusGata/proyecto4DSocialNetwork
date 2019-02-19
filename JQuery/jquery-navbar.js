function checkSesionNavbar (){
  $(".sinSesionIniciada").hide();
  $(".conSesionIniciada").hide();
  //peticion para comprobar si se a iniciado Sesion
  $.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                  $(".sinSesionIniciada").hide();
                  $(".conSesionIniciada").show();
                }
                else{
                  $(".conSesionIniciada").hide();
                  $(".sinSesionIniciada").show();
                }
            },
  });
}

checkSesionNavbar();

$("#cerrarSesionNavbar").click(function (){
  window.location.href = "../../PHP/Sessions/Logout.php";
})
