<?php
    session_start();
    $_SESSION = array();
    session_destroy();
    unset($_COOKIE['Sesion_4D']);
    setcookie('Sesion_4D', '', time() - 3600,"/");
    header("Location: ../../HTML/html/login.html");
    return;
?>