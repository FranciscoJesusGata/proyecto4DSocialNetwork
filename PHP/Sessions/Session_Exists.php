<?php
    function session_exists(){
        $exist = "no";
        if (isset($_SESSION['N_Usuario'])){
            $exist = "yes";
        }
        return $exist;
    }
           
    if(isset($_POST['action']) && !empty($_POST['action'])){
        session_start();
        $action= $_POST['action'];
        if ($action == "ejecutar"){
            $comprobar = session_exists();
            echo $comprobar;
        }
    }
?>