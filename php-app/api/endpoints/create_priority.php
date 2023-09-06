<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    // Datenbankverbindung herstellen (wie bereits in Ihrer config.php)
    require_once 'config.php';

    // Überprüfen, ob die erforderlichen Daten übertragen wurden
    $id = $receivedData['id'] ?? null;
    $sortid = $receivedData['sortid'] ?? null;
    $name = $receivedData['name'] ?? null;
    $color = $receivedData['color'] ?? null;

    if ($sortid === null || $name === null || $color === null) {
        $response = array("message" => "Missing required data");
        echo json_encode($response);
        exit();
    }

    // SQL-Statement zum Einfügen neuer Karte
    $sql = "INSERT INTO priority (id, sortid, color, name) VALUES (:id, :sortid, :color, :name)";

    $stmt = $pdo -> prepare($sql);
    $stmt -> bindParam(':id', $id);
    $stmt -> bindParam(':sortid', $sortid);
    $stmt -> bindParam(':color', $color);
    $stmt -> bindParam(':name', $name);

    // Führen Sie das SQL-Statement aus
    if ($stmt->execute()) {
        $response = array("message" => "New card inserted successfully");
        echo json_encode($response);
    } else {
        $response = array("message" => "Error inserting new card");
        echo json_encode($response);
    }
} else {
    echo "Invalid request method";
}
?>
