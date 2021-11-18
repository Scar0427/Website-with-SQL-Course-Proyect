<?php
    function OpenConnection(){
        $user="root";
        $pass="";
        $direction="localhost";
        $db="universidad";
    
        //$json = array();
        $connection = mysqli_connect($direction, $user, $pass, $db);
        if(mysqli_connect_error()){
            echo "Ocurrio un error al conectarse a la base de datos";
            return;
        }

        return $connection;
    }

    function CloseConnection($connection){
        mysqli_close($connection);
    }
?>