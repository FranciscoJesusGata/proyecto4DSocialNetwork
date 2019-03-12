$(document).ready(function () {
    $("form#publicar").submit(function (e){
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url : "../../PHP/Querys/Publish.php",
            type: "POST",
            data : formData,
            contentType: false,
            cache: false,
            processData: false,
            success : function(response){
                console.log("subida");
                console.log(response);
            },
            error : function(response){
                console.log(response);
            }
        });
    });
});
