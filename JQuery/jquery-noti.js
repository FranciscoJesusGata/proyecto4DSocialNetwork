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

//----------------------------------------------------------------------------//

function AdvMsg() {
  $.ajax({
      type: "POST",
      url: "../../PHP/Querys/NotificacionesAdv.php",
      data: {type: "AdvMsg"},
      async: false,
      dataType: "html",
      success: function(data){
                  console.log(data);
                  /*var show = "";
                  for (var i = 0; i < data.length; i++) {
                    show +=
                    data[i]
                  }*/
              },
      error: function(){
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
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
      success: function(data){
                  if (data == "no"){
                      window.location.replace("../../HTML/html/login.html");
                  }
              },
      error: function(){
          console.log("error");
      }
  });
}
AdvMsg();
