<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    require_once 'config.php';

    //Überprüfen, ob die erforderlichen Daten über die URL übertragen wurden
    $id = $receivedData['id'] ?? null;
    $name = $receivedData['name'] ?? null;
    $color = $receivedData['color'] ?? null;
    $sortid = $receivedData['sortid'] ?? null;

    $sql = "UPDATE priority SET ";
    $values = array();

    if ($sortid !== null) {
        $sql .= "sortid = :value0, ";
        $values[':value0'] = $sortid;
    }

    if ($name !== null) {
        $sql .= "name = :value1, ";
        $values[':value1'] = $name;
    }

    if ($color !== null) {
        $sql .= "color = :value2, ";
        $values[':value2'] = $color;
    }

    $sql = rtrim($sql, ', ');

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    foreach ($values as $key => &$value) {
        $stmt->bindValue($key, $value);
    }
    unset($value);

    $stmt->bindParam(':id', $id);

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
