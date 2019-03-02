<?php
    function session_exists(){
        $exist = "no";
        if (isset($_SESSION['N_Usuario'])){
            $exist = "yes";
        }
        return $exist;
    }
    function user_exists(){
        $val = "no";
        if (isset($_SESSION['errorRegistro'])){
            //¿Hay ya una cuenta existente con ese nombre de usuario o ese correo?
            $val = $_SESSION['errorRegistro'];
        }
        return $val;
    }
    
    if(isset($_POST['action']) && !empty($_POST['action'])){
        session_start();
        $action= $_POST['action']; //¿Hay ya una sesión iniciada?
        if ($action == "ejecutar"){
            $comprobar = session_exists();
            echo $comprobar;
        }
        if ($action == "error"){
            $error_registro = user_exists();
            $_SESSION = array();
            session_destroy();
            echo $error_registro;
        }
    }
?>