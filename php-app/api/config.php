<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, CREATE");
    header("Access-Control-Allow-Headers: Content-Type");

    $database_host = 'mysql';
    $database_name = 'kanban';
    $database_user = 'kanban';
    $database_password = 'test';

    $pdo = new PDO("mysql:host=$database_host;dbname=$database_name", $database_user, $database_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
