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

function tratarDatosUser(datos){
    var Tema = datos["Tema"];

    if(Tema == ""){
      $("body").addClass('no-image-background');
    } else {
      $("#seccion-background").hide();
      $("body").addClass('image-background');
      $("body").css("background-image", "url("+ Tema +")");
    }
}

$.ajax({
    type: "POST",
    url: "../../PHP/Querys/User_Data.php",
    data: {opcion: "main"},
    dataType: "json",
    success: function (response) {
        tratarDatosUser(response);
    }
});

/* No estoy seguro de como haeclo, ya que si esta página se recarga automáticamente cada x tiempo
   al recargar por segunda vez, tomará la nueva fecha en vez de la antigua y no se mostrarán los dats*/
function setFechaConexion() {
  $.ajax({
      type: "POST",
      url: "../../PHP/Querys/NotificacionesAdv.php",
      data: {type: "FechConex"},
      async: false,
      dataType: "html",
  });
}

//----------------------------------------------------------------------------//
$(document).ready(function(){
  function AdvMsg() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "AdvMsg"},
        async: false,
        dataType: "html",
        success: function(result){
                    var data = jQuery.parseJSON(result)

                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                        for (var i = 0; i < data.length; i++) {
                          show += "<tr><td> <span class='badge badge-pill badge-primary'>";
                          show += data[i]['Id_Emisor'];
                          show += "</span> ha escrito el siguiente mensaje:<br/>";
                          show += "<div class='bg-info col-rounded'><div class='mx-2'>";
                          show += data[i]['Texto'];
                          show += "</div></div></td></tr>";
                        }
                      $("#AdvMsg").html(show)
                    }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener los mensajes", "error");
            console.log("error");
        }
    });
  }

  function AdvPub() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "AdvPub"},
        async: false,
        dataType: "html",
        success: function(result){
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>Tu publicación ";
                        show += "<div class='bg-info col-rounded'><div class='mx-2'>";
                        show += data[i]['Texto'];
                        show += "</div></div>";
                        show += " ha obtenido ";
                        show += data[i]['num_mg'];
                        show += " Me gusta</td></tr>";
                      }
                      $("#AdvPub").html(show)
                    }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener las publicaciones", "error");
            console.log("error");
        }
    });
  }

  function AdvSeg() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "AdvSeg"},
        async: false,
        dataType: "html",
        success: function(result){
                    var data = jQuery.parseJSON(result);
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                        for (var i = 0; i < data.length; i++) {
                          show += "<tr><td>";
                          show += "Tienes una petición de seguimiento de "
                          show += "<span class='badge badge-pill badge-primary'>"
                          show += data[i]['Nombre_Usuario'];
                          show += "</span></td></tr>";
                        }
                      $("#AdvSeg").html(show)
                    }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener las peticiones de seguimiento", "error");
            console.log("error");
        }
    });
  }

  function Msg() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "Msg"},
        async: false,
        dataType: "html",
        success: function(result){
                    var data = jQuery.parseJSON(result);
                    if (typeof data !== 'undefined' && data['num'] >= 0) {
                      var show = "" + data[0];
                      $("#msg").text(show);
                    }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener el número de mensajes", "error");
            console.log("error");
        }
    });
  }

  function pub() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "Pub"},
        async: false,
        dataType: "html",
        success: function(result){
                  var data = jQuery.parseJSON(result);
                  if (typeof data !== 'undefined' && data['num'] >= 0) {
                    var show = "" + data[0];
                    $("#pub").text(show);
                  }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener el número de publicaciones", "error");
            console.log("error");
        }
    });
  }

  function com() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "Com"},
        async: false,
        dataType: "html",
        success: function(result){
                  var data = jQuery.parseJSON(result);
                  if (typeof data !== 'undefined' && data['num'] >= 0) {
                    var show = "" + data[0];
                    $("#com").text(show);
                  }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener el número de comentarios", "error");
            console.log("error");
        }
    });
  }

  function mg() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "mg"},
        async: false,
        dataType: "html",
        success: function(result){
                  var data = jQuery.parseJSON(result);
                  if (typeof data !== 'undefined' && data >= 0) {
                    var show = "" + data;
                    $("#mg").text(show);
                  }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener el número de me gusta", "error");
            console.log("error");
        }
    });
  }

  function seg() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "Pet"},
        async: false,
        dataType: "html",
        success: function(result){
                  var data = jQuery.parseJSON(result);
                  if (typeof data !== 'undefined' && data['num'] >= 0) {
                    var show = "" + data[0];
                    $("#seg").text(show);
                  }
                },
        error: function(){
            swal("Error", "Se haproducido un error al tratar de obtener el número de peticiones de seguimiento", "error");
            console.log("error");
        }
    });
  }
  AdvMsg();
  AdvSeg();
  AdvPub();
  Msg();
  pub();
  com();
  mg();
  seg();
})
