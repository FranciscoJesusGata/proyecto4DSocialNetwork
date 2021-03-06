<?php
  class Database{
    /*variables de configuración*/
    private $server = "127.0.0.1";
    private $user = "root";
    private $db_passwd = "Qr201998";
    private $database = "socialnetwork";
    public $db_conection;

    /*conexion*/
    public function conexion(){
      $this->db_conection = mysqli_connect($this->server, $this->user, $this->db_passwd, $this->database);
      if(!$this->db_conection){
        echo "<br/>Error al conectar con la base de datos <br/>";
    		echo "Error: ".mysqli_connect_errno();
    		echo " ".mysqli_connect_error();
        return "error";
      }
      else {
        mysqli_set_charset($this->db_conection,"utf8");
        return null;
      }
    }

    /*query*/
    private function query($conexion, $query){
      $result = mysqli_query($conexion, $query);
      return $result;
    }

    /*fetch array*/
    private function fetch_array($data){

      $result = mysqli_fetch_array($data);
      $return = array();
      for($i = 0; $result ; $i++){
        $return[$i]=$result;
        $result = mysqli_fetch_array($data);
      }
      if(count($return) == 1){
        $return = $return[0];
      }
      return $return;
    }

    /*fetch array para una cantidad desconocida de datos*/
    private function fetch_array_uncknow($data){

      $result = mysqli_fetch_array($data);
      $return = array();
      while ($result) {
        array_push($return, $result);
        $result = mysqli_fetch_array($data);
      }
      return $return;
    }

    /*close conexion*/
    public function end_of_connection(){
      mysqli_close($this->db_conection);
    }

    /*enviar petición a la base de datos y obtener resultado*/
    public function get_data($sql){
      if ($this->db_conection == null) {
        return "error";
      }
      $data = $this->query($this->db_conection, $sql);
      $final_data = $this->fetch_array($data);
      return $final_data;
    }

    /*enviar petición a la base de datos y obtener resultado, util cuando no sabes cuantos
    datos vas a recibir*/
    public function get_unknow_data($sql){
      if ($this->db_conection == null) {
        return "error";
      }
      $data = $this->query($this->db_conection, $sql);
      $final_data = $this->fetch_array_uncknow($data);
      return $final_data;
    }

    /*enviar petición a la base de datos SIN obtener resultado*/
    public function send_data($sql){
      if ($this->db_conection == null) {
        return "error";
      }
      $data = $this->query($this->db_conection, $sql);
      return $data;
    }

  }
?>
