<!DOCTYPE html>
<html lang="es-ES">
<head>
    <meta charset="UTF-8">
    <title>Profesores | Universidad del Monte</title>
    <link rel="icon" href="img/UniversidadDelMonte.png">
    <!--Teñido de la barra superior de Safari según modo claro o oscuro-->
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffe7aa">
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#8b6400">
</head>
<body>
    <?php
        session_start();
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
        
        $curp = $_SESSION["userCURP"];
        //echo "$curp <br>";
        $query = "SELECT * FROM profesores WHERE CURP = '$curp'";

        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) > 0){
            $user = mysqli_fetch_row($result);
            echo "Bienvenido, profesor " . $user[1] . " " . $user[2] . " " . $user[3];
        }

        mysqli_close($connection);
    ?>
</body>
</html>