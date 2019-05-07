<?php
    include 'Database.php';
    session_start();
    function ultimaConversacion($receptor,$conexion,$database,$nombre){
        $sql="SELECT Id_Receptor";
        $sql.=" FROM mensajes";
        $sql.=" WHERE Id_Emisor = '".$nombre."'";
        $sql.=" ORDER BY F_Envio LIMIT 1";
        $datos = $database->get_data($sql);
        return $datos[0];
    }

    function chats($conexion, $database, $receptor){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $sql_datos="SELECT DISTINCT M.Id_Receptor AS Receptor, COUNT(M.Id_M) AS mensajes_nuevos, U.Foto, U.Nombre_Usuario";
        $sql_datos.=" FROM mensajes M";
        $sql_datos.=" JOIN usuarios U";
        $sql_datos.=" ON M.Id_Emisor = U.Nombre_Usuario";
        $sql_datos.=" WHERE (Id_Emisor = '".$nombre."' AND F_Lectura IS NULL)";
        $sql_datos.=" OR Id_Receptor IN (SELECT Id_Emisor FROM mensajes WHERE Id_Receptor = '".$nombre."' AND F_Lectura IS NULL)";
        $sql_datos.=" ORDER BY F_Envio";

        $datos = $database->get_data($sql_datos);

        if(isset($datos[0]['Receptor'])){
            for($i=0;$i<count($datos);$i++){
                $sql_last_msg="SELECT Texto";
                $sql_last_msg.=" FROM mensajes";
                $sql_last_msg.=" WHERE (Id_Emisor = '".$nombre."' AND Id_Receptor = '".$receptor."')";
                $sql_last_msg.=" OR (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."')";
                $sql_last_msg.=" AND F_Lectura IS NULL";
                $sql_last_msg.=" ORDER BY F_Envio DESC LIMIT 1";
                $last_msg = $database->get_data($sql_last_msg);
                array_push($datos[0],$last_msg[0]);
            }
        }else if(isset($datos['Receptor'])){
            $sql_last_msg="SELECT Texto";
            $sql_last_msg.=" FROM mensajes";
            $sql_last_msg.=" WHERE (Id_Emisor = '".$nombre."' AND Id_Receptor = '".$receptor."')";
            $sql_last_msg.=" OR (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."')";
            $sql_last_msg.=" AND F_Lectura IS NULL";
            $sql_last_msg.=" ORDER BY F_Envio DESC LIMIT 1";
            $last_msg = $database->get_data($sql_last_msg);
            array_push($datos,$last_msg[0]);
        }
        $datos = json_encode($datos);
        echo $datos;
    }

    function recopilar_mensajes($receptor, $fecha,$conexion,$database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        if($receptor == NULL){
            $receptor = ultimaConversacion($receptor,$conexion,$database,$nombre);
        } 
        $sql="SELECT Id_M, Texto, F_Envio, F_Lectura, Id_Receptor AS Receptor";
        $sql.=" FROM mensajes";
        if($fecha != NULL){
            $sql.=" WHERE F_Envio > '".$fecha."'";
            $sql.="AND Id_M IN (";
            $sql.="SELECT Id_M FROM mensajes WHERE (Id_Emisor = '".$nombre."' AND Id_Receptor = '".$receptor."') OR (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."'));";
        }else if($fecha == NULL){
            $sql.=" WHERE (Id_Emisor = '".$nombre."'";
            $sql.=" AND Id_Receptor = '".$receptor."') OR";
            $sql.=" (Id_Emisor = '".$receptor."'";
            $sql.=" AND Id_Receptor = '".$nombre."')";
        }
        $mensajes = $database->get_data($sql);
        array_push($mensajes, $nombre);
        return $mensajes;
    }

    function enviar_mensaje($conexion, $database, $texto, $receptor){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $sql="INSERT";
        $sql.=" INTO mensajes";
        $sql.=" VALUES(NULL, '".$texto."', NULL, CURRENT_TIMESTAMP, NULL, '".$nombre."', '".$receptor."')";
        $ok = $database->send_data($sql);
        if(!$ok){
            echo $ok;
            echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            exit;
        }
    }

    $database = new Database;
    $ok = $database->conexion();
    $conexion = $database->db_conection;
    $opcion = $_POST['opcion'];
    $receptor = NULL;
    if(isset($_POST['user'])){
        $receptor = $_POST['user'];
    }

    if($opcion == "recibir"){
        $fecha = NULL;
        if(isset($_POST['fecha'])){
            $fecha = $_POST['fecha'];
        }
        $mensajes = recopilar_mensajes($receptor, $fecha, $conexion, $database);
        $mensajes = json_encode($mensajes);
        echo $mensajes;
    }else if ($opcion == "enviar"){
        $mensaje = $_POST['message'];
        enviar_mensaje($conexion, $database, $mensaje, $receptor);
    }else if ($opcion == "chats"){
        chats($conexion, $database, $receptor);
    }
?>