<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    require_once 'config.php';

    //Überprüfen, ob die erforderlichen Daten über die URL übertragen wurden
    $id = $receivedData['id'] ?? null;
    $title = $receivedData['title'] ?? null;
    $color = $receivedData['color'] ?? null;
    $limits = $receivedData['limits'] ?? null;
    $max = $receivedData['max'] ?? null;

    $sql = "UPDATE status SET ";
    $values = array();

    if ($title !== null) {
        $sql .= "title = :value1, ";
        $values[':value1'] = $title;
    }

    if ($color !== null) {
        $sql .= "color = :value2, ";
        $values[':value2'] = $color;
    }

    if ($limits !== null) {
        if($limits === true) {
           $limits = 1;
        } else {
          $limits = 0;
        }

        $sql .= "limits = :value3, ";
        $values[':value3'] = $limits;
    }

    if ($max !== null) {
        $sql .= "max = :value4, ";
        $values[':value4'] = $max;
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
