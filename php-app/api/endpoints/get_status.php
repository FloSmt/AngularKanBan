<?php
require_once 'config.php';

$stmt = $pdo->query("SELECT * FROM status");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($data);

?>
