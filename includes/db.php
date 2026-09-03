<?php
require_once __DIR__ . '/config.php';

$host     = 'localhost';
$username = 'root';
$password = '';
$database = 'gukdb';

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);

if ($conn->connect_error) {

    die('Database Connection Failed');

}