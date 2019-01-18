function checkSesionNavbar (){
  //peticion par comprobar si se a iniciado Sesion
  //
  //
  //
  //
  //De momento lo pondrémos como si no ha iniciado Sesion
  var result = false;
  if(result == false){
    $(".conSesionIniciada").hide();
    $(".sinSesionIniciada").show();
  }
  else{
    $(".conSesionIniciada").show();
    $(".sinSesionIniciada").hide();
  }
}

checkSesionNavbar();

$("#cerrarSesionNavbar").click(function (){
  //petición para cerrar Sesion
  checkSesionNavbar();
})
