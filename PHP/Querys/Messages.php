<?php
    include 'Database.php';
    session_start();
    function ultimaConversacion($conexion,$database,$nombre){
        $sql="SELECT Id_Receptor";
        $sql.=" FROM mensajes";
        $sql.=" WHERE Id_Emisor = '".$nombre."'";
        $sql.=" ORDER BY F_Envio DESC LIMIT 1";
        $datos = $database->get_data($sql);
        if(isset($datos[0])){
            return $datos[0];
        }else{
            return null;
        }
    }

    function visto($conexion, $database,$emisor){
        $receptor = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $sql="UPDATE mensajes SET F_Lectura= CURRENT_TIMESTAMP WHERE (Id_Emisor = '".$emisor."' AND Id_Receptor = '".$receptor."') AND F_Lectura IS NULL";
        $ok = $database->send_data($sql);
    }

    function updateChats(){

    }

    function chats($conexion, $database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $sql_datos="SELECT DISTINCT M.Id_Receptor AS Receptor, U.Foto";
        $sql_datos.=" FROM mensajes M";
        $sql_datos.=" JOIN usuarios U";
        $sql_datos.=" ON M.Id_Receptor = U.Nombre_Usuario";
        $sql_datos.=" WHERE Id_Emisor = '".$nombre."'";
        $sql_datos.=" UNION SELECT DISTINCT M.Id_Emisor AS Receptor, U.Foto";
        $sql_datos.=" FROM mensajes M";
        $sql_datos.=" JOIN usuarios U";
        $sql_datos.=" ON M.Id_Emisor = U.Nombre_Usuario";
        $sql_datos.=" WHERE Id_Receptor = '".$nombre."'";
        $sql_datos.=" AND Id_Emisor NOT IN (SELECT DISTINCT Id_Receptor FROM mensajes WHERE Id_Emisor = '".$nombre."')";

        $datos = $database->get_unknow_data($sql_datos);
        $last_msg_array = array();
        $new_msg_array = array();

        if(isset($datos[0]['Receptor'])){
            for($i=0;$i<count($datos);$i++){
                $receptor = $datos[$i]['Receptor'];
                $sql_last_msg="SELECT Texto";
                $sql_last_msg.=" FROM mensajes";
                $sql_last_msg.=" WHERE (Id_Emisor = '".$nombre."' AND Id_Receptor = '".$receptor."')";
                $sql_last_msg.=" OR (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."')";
                $sql_last_msg.=" ORDER BY F_Envio DESC LIMIT 1";

                $last_msg = $database->get_data($sql_last_msg);
                array_push($last_msg_array,$last_msg[0]);

                $sql_new_msg="SELECT COUNT(Id_M) AS New_Msg";
                $sql_new_msg.=" FROM mensajes";
                $sql_new_msg.=" WHERE (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."')";
                $sql_new_msg.=" AND F_Lectura IS NULL";

                $new_msg = $database->get_data($sql_new_msg);
                array_push($new_msg_array,$new_msg['New_Msg']);
            }
        }else if(!isset($datos[0]['Receptor']) && $datos['Receptor'] != NULL){
            $receptor = $datos['Receptor'];
            $sql_last_msg="SELECT Texto";
            $sql_last_msg.=" FROM mensajes";
            $sql_last_msg.=" WHERE (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."')";
            $sql_last_msg.=" ORDER BY F_Envio DESC LIMIT 1";

            $last_msg = $database->get_data($sql_last_msg);
            array_push($last_msg_array,$last_msg[0]);

            $sql_new_msg="SELECT COUNT(Id_M) AS New_Msg";
            $sql_new_msg.=" FROM mensajes";
            $sql_new_msg.=" WHERE ((Id_Emisor = '".$nombre."' AND Id_Receptor = '".$receptor."')";
            $sql_new_msg.=" OR (Id_Emisor = '".$receptor."' AND Id_Receptor = '".$nombre."'))";
            $sql_new_msg.=" AND F_Lectura IS NULL";
            
            $new_msg = $database->get_data($sql_new_msg);
            array_push($new_msg_array,$new_msg['New_Msg']);
        }
        array_push($datos,$last_msg_array,$new_msg_array);
        $out = json_encode($datos);
        echo $out;
    }

    function recopilar_mensajes($receptor, $fecha,$conexion,$database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        if($receptor == NULL){
            $receptor = ultimaConversacion($conexion,$database,$nombre);
            if($receptor == NULL){
                exit;
            }
        } 
        $sql="SELECT Id_M, Texto, F_Envio, F_Lectura, Id_Receptor AS Receptor, Id_Emisor AS Emisor";
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
        $mensajes = $database->get_unknow_data($sql);
        return $mensajes;
    }

    function userData($nombre ,$database){
        $sql_datos="SELECT Nombre_Usuario AS Receptor, Foto";
        $sql_datos.=" FROM usuarios";
        $sql_datos.=" WHERE Nombre_Usuario = '".$nombre."'";
        $user_data = $database->get_data($sql_datos);
        return $user_data;
    }

    function enviar_mensaje($conexion, $database, $texto, $receptor){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $sql="INSERT INTO mensajes";
        $sql.=" VALUES(NULL, '".$texto."', NULL, CURRENT_TIMESTAMP, NULL, '".$nombre."', '".$receptor."')";
        $ok = $database->send_data($sql);
        if(!$ok ||$ok == "error"){
            echo $ok;
            exit(mysqli_errno($conexion)." ".mysqli_error($conexion));
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
        $receptor = NULL;
        if(isset($_POST['fecha'])){
            $fecha = $_POST['fecha'];
        }
        if(isset($_POST['receptor'])){
            $receptor = $_POST['receptor'];
        }
        $mensajes = recopilar_mensajes($receptor, $fecha, $conexion, $database);
        if(count($mensajes) > 0){
            $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
            $total;
            if($receptor == NULL){
                $receptor = ultimaConversacion($conexion,$database,$nombre);
                $data = userData($receptor,$database);
                $total = array("mensajes" => $mensajes, "data" => $data, "sesion" => $nombre);
            }else{
                $total = array("mensajes" => $mensajes, "sesion" => $nombre);
            }
            $total = json_encode($total);
            echo $total;
        }
    }else if ($opcion == "enviar"){
        $mensaje = $_POST['message'];
        enviar_mensaje($conexion, $database, $mensaje, $receptor);
    }else if ($opcion == "chats"){
        $receptor = $_POST['user'];
        chats($conexion, $database, $receptor);
    }else if ($opcion == "visto"){
        $emisor = $_POST['emisor'];
        visto($conexion, $database,$emisor);
    }
?>