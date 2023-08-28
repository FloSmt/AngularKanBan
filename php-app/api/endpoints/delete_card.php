<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    require_once 'config.php';

    //Überprüfen, ob die erforderlichen Daten über die URL übertragen wurden
    $id = $receivedData['id'] ?? null;

    $sql = "DELETE FROM cards ";
    $values = array();

    $sql = rtrim($sql, ', ');

    $sql .= " WHERE id = :id";

    $stmt = $pdo->prepare($sql);

    foreach ($values as $key => &$value) {
        $stmt->bindValue($key, $value);
    }
    unset($value);

    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        $response = array("message" => "Data deleted successfully");
        echo json_encode($response);
    } else {
        $response = array("message" => "Error deleting data");
        echo json_encode($response);
    }
} else {
    echo "Invalid request method";
}
?>
