<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    // Datenbankverbindung herstellen (wie bereits in Ihrer config.php)
    require_once 'config.php';

    // Überprüfen, ob die erforderlichen Daten übertragen wurden
    $newStatusId = $receivedData['newStatusId'] ?? null;
    $title = $receivedData['title'] ?? null;
    $priority = $receivedData['priorityId'] ?? null;

    if ($newStatusId === null || $title === null || $priority === null) {
        $response = array("message" => "Missing required data");
        echo json_encode($response);
        exit();
    }

    $created = date('Y-m-d H:i:s');

    // SQL-Statement zum Einfügen neuer Karte
    $sql = "INSERT INTO cards (status, title, priority, created) VALUES (:newStatusId, :title, :priorityId, :created)";

    $stmt = $pdo -> prepare($sql);
    $stmt -> bindParam(':newStatusId', $newStatusId);
    $stmt -> bindParam(':title', $title);
    $stmt -> bindParam(':priorityId', $priority);
    $stmt -> bindParam(':created', $created);

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
