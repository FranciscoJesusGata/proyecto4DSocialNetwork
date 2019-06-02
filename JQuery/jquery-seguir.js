$.ajax({
    type: "POST",
    url: "../../PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "no"){
                    window.location.replace("../../HTML/html/login.html");
                }
            },
    error: function(){
        console.log("error");
    }
});

function checktratarDatosUser(datos) {
    if (datos == "Forbidden") {
      $("#fondo").hide();
      swal({
        title: "El usuario tieneun perfil privado",
        text: "quieres mandar una petición de seguimiento",
        icon: "warning",
        buttons: true,
      })
      .then((send) => {
        if (send) {
          swal("Petición enviada", {
            icon: "success",
          });
        } else {
          window.location.replace("../../HTML/html/login.html")
        }
      });
    } else {
      tratarDatosUser(datos);
    }
}

function getDataFromUser() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/User_Data.php",
        data: {opcion: "user", user: null},
        dataType: "json",
        success: function (response) {
            checktratarDatosUser(response);
        },
        error: function(response){
            console.error(response);
            swal({
              title: "El usuario no existe",
              icon: "warning",
            })
            .then((send) => {
                window.location.replace("../../HTML/html/login.html")
            });
        }
    });
}

function tratarPeticiones(datos){
  var peticiones = datos["peticiones"];
  var sigues = datos["sigues"];
  var siguen = datos["siguen"];
  var contentPeticiones = "";
  var contentSigues = "";
  var contentSiguen = "";
  
  $(".data").html("<tr><td class=\"text-center\">No hay peticiones de seguimiento</td></tr>");
  
  for (var i = 0; i < peticiones.length; i++) {
    contentPeticiones += "<tr><td>"+ peticiones[i]["Nombre_Usuario"] +"</td><td><div class=\"btn-group\" style=\"margin-left: 5vw\"><button class=\"btn btn-primary\" onclick=\"acceptPeticion(\'"+ peticiones[i]["Nombre_Usuario"] +"\')\">";
    contentPeticiones += "<i class=\"fas fa-check\"></i></button><button class=\"btn btn-danger\" onclick=\"denyPeticion(\'"+ peticiones[i]["Nombre_Usuario"] +"\', \'"+ peticiones[i]["Nombre_Seguido"] +"\')\"><i class=\"fas fa-ban\"></i></button></div></td></tr>";
    if(i == (peticiones.length - 1)){
        $("#peticiones").html(contentPeticiones);
    }
  }
      
  for (var i = 0; i < sigues.length; i++) {
    contentSigues += "<tr><td>"+ sigues[i]["Nombre_Seguido"] +"</td><td><div class=\"btn-group\" style=\"margin-left: 5vw\">";
    contentSigues += "<button class=\"btn btn-danger\" onclick=\"denyPeticion(\'"+ sigues[i]["Nombre_Usuario"] +"\', \'"+ sigues[i]["Nombre_Seguido"] +"\')\"><i class=\"fas fa-ban\"></i></button></div></td></tr>";
    if(i == (sigues.length - 1)){
        $("#sigues").html(contentSigues);
    }
  }
      
  for (var i = 0; i < siguen.length; i++) {
    contentSiguen += "<tr><td>"+ siguen[i]["Nombre_Usuario"] +"</td><td><div class=\"btn-group\" style=\"margin-left: 5vw\">";
    contentSiguen += "<button class=\"btn btn-danger\" onclick=\"denyPeticion(\'"+ siguen[i]["Nombre_Usuario"] +"\', \'"+ siguen[i]["Nombre_Seguido"] +"\')\"><i class=\"fas fa-ban\"></i></button></div></td></tr>";
    if(i == (siguen.length - 1)){
      $("#siguen").html(contentSiguen);
    }
  }
  $("#fondo").hide();
}

function denyPeticion(usuario1, usuario2){
    swal({
        title: "Eliminar seguimiento",
        text: "Esta acción es permanente",
        buttons: true,
        })
        .then((aceptar) => {
        if (aceptar) {
            $.ajax({
                type: "POST",
                url: "../../PHP/Querys/Seguir.php",
                async: true,
                data: { ejecutar: "eliminar", nombre1: usuario1, nombre2: usuario2},
                dataType: "text",
                success: function (response) {
                    if (response == "Bad Request") {
                        swal("Error", "se ha producido un error al aceptar la petición", "error")
                    } else {
                        swal("", "Se ha eliminado la relación", "success")
                    }
                    loadAll();
                },
                error: function(error){
                    console.error(error['responseText']);
                }
            });
        }
    });
}

function acceptPeticion(usuario){
    swal({
        title: "Aceptar petición",
        text: "¿desea aceptar la petición de " + usuario +"?",
        buttons: true,
        })
        .then((aceptar) => {
        if (aceptar) {
          $.ajax({
              type: "POST",
              url: "../../PHP/Querys/Seguir.php",
              async: true,
              data: { ejecutar: "aceptar", user: usuario},
              dataType: "text",
              success: function (response) {
                  if (response == "Bad Request") {
                      swal("Error", "se ha producido un error al aceptar la petición", "error")
                  } else {
                      swal("", "Ya estás siguiendo al usuario", "success")
                  }
                  loadAll();
              },
              error: function(error){
                  console.error(error['responseText']);
              }
          });
        }
    });
}

function tratarDatosUser(datos){
    var Fotosrc = datos["Foto"];
    var Encabezado = datos["Cabecera"];
    var Tema = datos["Tema"];

    if(Tema != "" && Tema != null){
      $("#Tema").html('<img class="fotoComun" id="fotoTema" src="' + Tema + '">');
      $("#seccion-background").hide();
      $("body").addClass('image-background');
      $("body").css("background-image", "url("+ Tema +")");
    } else {
      $("#Tema").html('<h1 class="icono-general"><i class="fas fa-palette"></i></h1>');
      $("#seccion-background").show();
      $("body").addClass('no-image-background');
      $("body").css("background-image", "");
    }
}

function loadAll() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Seguir.php",
        async: true,
        data: { ejecutar: "getData"},
        dataType: "json",
        success: function (response) {
            tratarPeticiones(response);
        },
        error: function(error){
            console.error(error['responseText']);
            $("#fondo").hide();
        }
    });
    getDataFromUser();
}

$(document).ready(function(){
    loadAll();
    document.getElementsByTagName("html")[0].style.visibility = "visible";

});