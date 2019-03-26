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

function checkNotificaciones(){
  $.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Querys/Notificaciones.php",
    data: {adv: false},
    async: true,
    dataType: "html",
    success: function(data){
                if(data != 0){
                  $("#count-not").text(data)
                }
            },
  });
}

checkSesionNavbar();
checkNotificaciones();

$("#cerrarSesionNavbar").click(function (){
  window.location.href = "../../PHP/Sessions/Logout.php";
})
