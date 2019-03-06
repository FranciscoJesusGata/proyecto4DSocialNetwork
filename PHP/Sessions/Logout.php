<?php
    session_start();
    $_SESSION = array();
    session_destroy();
    header("Location: ../../HTML/html/login.html");
    if (isset($_COOKIE['Sesion_4D'])) {
        unset($_COOKIE['Sesion_4D']);
        setcookie('Sesion_4D', null, -1, '/');
        return true;
    }
?>