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
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje:<br/>";
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                    }
                },
        error: function(){
            console.log("error");
        }
    });
  }

  // TODO: Esperar a que curro termine con las publicaciones antes de ponerse con esto
  function AdvPub() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "AdvPub"},
        async: false,
        dataType: "html",
        success: function(result){
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: ";
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
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
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += "Tienes una petición de seguimiento de "
                        show += data[i]['Id_Emisor'];
                        show += "</td></tr>";
                      }
                      $("#AdvSeg").html(show)
                    }
                },
        error: function(){
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
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: "
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
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
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: "
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
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
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: "
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
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
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: "
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
            console.log("error");
        }
    });
  }

  function pet() {
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/NotificacionesAdv.php",
        data: {type: "Pet"},
        async: false,
        dataType: "html",
        success: function(result){
                    console.log(result);
                    var data = jQuery.parseJSON(result)
                    if (typeof data !== 'undefined' && data.length > 0) {
                      var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Id_Emisor'];
                        show += " ha escrito el siguiente mensaje: "
                        show += data[i]['Texto'];
                        show += "</td></tr>";
                      }
                      $("#AdvMsg").html(show)
                      console.log(show);
                      console.log(data);
                    }
                },
        error: function(){
            console.log("error");
        }
    });
  }
  AdvMsg();
  AdvSeg();
})
