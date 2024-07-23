<?php
require "Conexion.php";


class  Cliente extends Conexion {
    public $cli_codigo;
    public $cli_nombre;
    public $cli_apellido;
    public $cli_nit;
    public $cli_telefono; 
    public $cli_situacion;

    public function __construct($args = [])
    {
        $this->cli_codigo = $args['cli_codigo'] ?? null ;
        $this->cli_nombre = $args['cli_nombre'] ?? '' ;
        $this->cli_apellido = $args['cli_apellido'] ?? '' ;
        $this->cli_nit = $args ['cli_nit'] ?? 00 ;
        $this->cli_telefono = $args ['cli_telefono'] ?? 00 ;
        $this->cli_situacion = $args['cli_situacion'] ?? 1 ;
    }
    // insertar datos a la BD
    public function guardar(){
        $sql = "INSERT into clientes (cli_nombre, cli_apellido, cli_nit, cli_telefono) values ('$this->cli_nombre','$this->cli_apellido','$this->cli_nit','$this->cli_telefono')";
        $resultado = $this->ejecutar($sql);
        return $resultado; 
    }

    public function buscar(...$columnas){
        $cols = count($columnas) > 0 ? implode(',', $columnas) : '*';
        $sql = "SELECT $cols FROM clientes where cli_situacion =  1 ";

        if($this->cli_nombre != ''){
            $sql .= " AND cli_nombre like '%$this->cli_nombre%' ";
        }
        if($this->cli_apellido != ''){
            $sql .= " AND cli_apellido like '%$this->cli_apellido%' ";
        }
        if($this->cli_nit != ''){
            $sql .= " AND cli_nit = $this->cli_nit ";
        }
        $resultado = self::servir($sql);
        return $resultado;
    }

    public function buscarID($ID){
        
        $sql = "SELECT * FROM clientes where cli_situacion = 1 AND cli_codigo = $ID ";

        $resultado =  array_shift(self::servir($sql));
        return $resultado;
    }

    public function modificar(){
        $sql = "UPDATE clientes SET cli_nombre = '$this->cli_nombre', cli_apellido = '$this->cli_apellido', cli_nit = '$this->cli_nit', cli_telefono = '$this->cli_telefono' WHERE cli_situacion = 1 AND cli_codigo = $this->cli_codigo ";
        $resultado = $this->ejecutar($sql);
        return $resultado; 
    }

    public function eliminar(){
        $sql = "UPDATE clientes SET cli_situacion = 0  WHERE cli_codigo = $this->cli_codigo";
        $resultado = $this->ejecutar($sql);
        return $resultado; 
    }
}