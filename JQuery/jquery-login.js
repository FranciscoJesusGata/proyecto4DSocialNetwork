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
		var formulario = $("<form method='POST' action='../../PHP/Sessions/Login.php' >"+
		"<input type='hidden' name='Nom_User' value='"+Nom_User+"'>"+
		"<input type='hidden' name='passwd' value='"+passwd+"'>"+"</form>");
		$('body').append(formulario);
		$(formulario).submit();
	}

    $("#send").click(function(){

        /*
        ** Insertamos los valores del formulario en unas variables
        */
        var passwd = $("#passwd").val();
        var Nom_User = $("#nombre_user").val();
        if(Nom_User.length && passwd.length > 0){
			enviar(passwd, Nom_User);
        }
        else{
			$("#alerta_passwd").slideDown();
		}
    })
})
