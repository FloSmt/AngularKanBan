<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    // Datenbankverbindung herstellen (wie bereits in Ihrer config.php)
    require_once 'config.php';

    // Überprüfen, ob die erforderlichen Daten über die URL übertragen wurden
    $id = $receivedData['id'] ?? null;
    $title = $receivedData['title'] ?? null;
    $priorityId = $receivedData['priorityId'] ?? null;
    $statusId = $receivedData['statusId'] ?? null;
    $description = $receivedData['description'] ?? null;
    $edited = $receivedData['edited'] ?? null;

    $sql = "UPDATE cards SET ";
    $values = array();

    if ($title !== null) {
        $sql .= "title = :value1, ";
        $values[':value1'] = $title;
    }

    if ($priorityId !== null) {
        $sql .= "priority = :value2, ";
        $values[':value2'] = $priorityId;
    }

    if ($statusId !== null) {
        $sql .= "status = :value3, ";
        $values[':value3'] = $statusId;
    }

    if ($description !== null) {
        $sql .= "description = :value4, ";
        $values[':value4'] = $description;
    }

    //Datumsformat ändern
    $dateTime = new DateTime($edited);
    $formattedDate = $dateTime -> format('Y-m-d H:i:s');

    if ($edited !== null) {
        $sql .= "edited = :value5, ";
        $values[':value5'] = $formattedDate;
    }



    $sql = rtrim($sql, ', ');

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    // Bind all parameters, including :id
    foreach ($values as $key => &$value) {
        $stmt->bindValue($key, $value);
    }
    unset($value); // Unset the reference to the last bound value

    $stmt->bindParam(':id', $id);

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
