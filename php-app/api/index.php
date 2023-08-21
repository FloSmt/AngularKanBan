<?php
require_once 'config.php';

$endpoint = $_GET['endpoint'] ?? '';

switch ($endpoint) {
  case 'get_cards': include 'endpoints/get_cards.php';
  break;

  case 'get_status': include 'endpoints/get_status.php';
    break;

  case 'update_card': include 'endpoints/update_card.php';
  break;

  case 'update_status': include 'endpoints/update_status.php';
    break;

  case 'create': include 'endpoints/create.php';
  break;
  }
?>
