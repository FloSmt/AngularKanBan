<?php
require_once 'config.php';

$endpoint = $_GET['endpoint'] ?? '';

switch ($endpoint) {
  case 'get_cards': include 'endpoints/get_cards.php';
  break;

  case 'get_status': include 'endpoints/get_status.php';
  break;

  case 'get_priority': include 'endpoints/get_priority.php';
  break;

  case 'create_priority': include 'endpoints/create_priority.php';
  break;

  case 'delete_priority': include 'endpoints/delete_priority.php';
  break;

  case 'update_priority': include 'endpoints/update_priority.php';
  break;

  case 'update_card': include 'endpoints/update_card.php';
  break;

  case 'update_status': include 'endpoints/update_status.php';
  break;

  case 'create': include 'endpoints/create.php';
  break;

  case 'delete_card': include 'endpoints/delete_card.php';
  break;
  }

?>
