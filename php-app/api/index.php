<?php
require_once 'config.php';

$endpoint = $_GET['endpoint'] ?? '';

switch ($endpoint) {
  case 'get_data': include 'endpoints/get_data.php';
  break;

  case 'update': include 'endpoints/update.php';
  break;
  }
?>
