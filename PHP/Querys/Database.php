<?php
  /*Funcionamiento:
    1º incluir la clase
        -include 'Database.php';
    2º crear variable que contenga la clase
        -$database = new Database;

    Ya está operativo.

    opciones:
    opcion 1: hacer una consulta y obtener el resultado
        -$datos = $database->get_data($sql);

    opcion 2: hacer una consulta ignorando el resultado
        -$database->send_data($sql);

    opcion 3: hacer una peticion sin mysqli_real_escape_string
        -$database->get_data_no_escape($sql);
  */
  class Database{
    /*variables de configuración*/
    private $server = "127.0.0.1";
    private $user = "root";
    private $db_passwd = "";
    private $database = "socialnetwork";

    /*connection*/
    private function conexion(){
      $conexion = mysqli_connect($this->$server, $this->$user, $this->$db_passwd, $this->$database);
      if(!$conexion){
        echo "<br/>Error al conectar con la base de datos <br/>";
    		echo "Error: ".mysqli_connect_errno();
    		echo " ".mysqli_connect_error();
        return null;
      }
      else{
        return $conexion;
      }
    }

    /*query*/
    private function query($conexion, $query){
      $real_query = mysqli_real_escape_string($conexion, $query);
      $result = mysqli_query($conexion, $real_query);
      return $result;
    }

    /*query without escape*/
    private function query_without($conexion, $query){
      $result = mysqli_query($conexion, $query);
      return $result;
    }

    /*fetch array*/
    private function fetch_array($data){
      $result = mysqli_fetch_array($data);
    }

    /*close conexion*/
    private function end_of_connection($conexion){
      mysqli_close($conexion);
    }

    /*send data from database and return result*/
    public function get_data($sql){
      $conexion = $this->conexion();
      if ($conexion == null) {
        return "error";
      }
      $data = $this->query($conexion, $sql);
      $final_data = $this->fetch_array($data);
      $this->end_of_connection();
      return $final_data
    }

    /*send data to database*/
    public function send_data($sql){
      $conexion = $this->conexion();
      if ($conexion == "null") {
        return "error";
      }
      $data = $this->query($conexion, $sql);
      $this->end_of_connection();
    }

    /*send data from database and return result*/
    public function get_data_no_escape($sql){
      $conexion = $this->conexion();
      if ($conexion == null) {
        return "error";
      }
      $data = $this->query_without($conexion, $sql);
      $final_data = $this->fetch_array($data);
      $this->end_of_connection();
      return $final_data
    }
  }
?>
