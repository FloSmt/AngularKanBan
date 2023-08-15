<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    // Verarbeiten und validieren Sie die empfangenen Daten

    // Datenbankverbindung herstellen (wie bereits in Ihrer config.php)
    require_once 'config.php';

    // Überprüfen, ob die erforderlichen Daten über die URL übertragen wurden
    $recordId = $receivedData['cardId'] ?? null;
    $newStatusId = $receivedData['newStatusId'] ?? null;
    $newValue2 = $_GET['new_value2'] ?? null;

    if ($recordId === null || ($newStatusId === null)) {
        $response = array("message" => "Missing required data");
        echo json_encode($response);
        exit();
    }

    $sql = "UPDATE cards SET ";

    $values = array();

    if ($newStatusId !== null) {
        $sql .= "status = :value1, ";
        $values[':value1'] = $newStatusId;
    }

    if ($newValue2 !== null) {
        $sql .= "column2 = :value2, ";
        $values[':value2'] = $newValue2;
    }

    $sql = rtrim($sql, ', ');

    $sql .= " WHERE id = :recordId";

    $stmt = $pdo->prepare($sql);

    foreach ($values as $key => $value) {
        $stmt->bindParam($key, $value);
    }

    $stmt->bindParam(':recordId', $recordId);

    // Führen Sie das SQL-Statement aus
    if ($stmt->execute()) {
        $response = array("message" => "Data updated successfully");
        echo json_encode($response);
    } else {
        $response = array("message" => "Error updating data");
        echo json_encode($response);
    }
} else {
    echo "Invalid request method";
}
?>
