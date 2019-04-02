function subir(e){
    var formData = new FormData(document.getElementById("publicar"));
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : formData,
        async: false,
                contentType: false,
                cache: false,
                processData: false,
        success : function(response){
            console.log("subida");
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
    $("#publicar").trigger("reset");
    $("#sendPost").attr("disabled",true);
    $('#img_display').css('display','none');
    $('#img_display').attr('src', '#');
}

$(document).ready(function () {
    $("#publicar").on("submit", function (e) { 
        e.preventDefault();
        subir(e);
    });
});
