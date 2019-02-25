$.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                    window.location.replace("../../HTML/html/inicio.html");
                }
            },
    error: function(){
        console.log("error");
    }
});

$(document).ready(function(){

    document.getElementsByTagName("html")[0].style.visibility = "visible";

    /*
    ** En el momento en el que haga click al boton se lanzara el código
    */

	var enviar = function(passwd, Nom_User){
		/*
		** Crea un formulario y lo envía al PHP de registro
		*/
    $("#fondo").show();
    $.post("../../PHP/Sessions/Login.php",
    {
      Nom_User: Nom_User,
      passwd: passwd,
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

    $("#send").click(function(){

        /*
        ** Insertamos los valores del formulario en unas variables
        */
        var Passwd = $("#passwd").val();
        var Nom_User = $("#nombre_user").val();
        if(Nom_User.length > 0 && Passwd.length > 0){
			enviar(Passwd, Nom_User);
        }
        else{
			$("#alerta_passwd").slideDown();
		}
    })
})
