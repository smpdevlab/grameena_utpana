<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../includes/db.php';

/*
|--------------------------------------------------------------------------
| Allow POST requests only
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    header('Location: ../index.html');
    exit;

}

/*
|--------------------------------------------------------------------------
| Collect and sanitize form data
|--------------------------------------------------------------------------
*/

$full_name = trim($_POST['full_name'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$interest  = trim($_POST['interest'] ?? '');

/*
|--------------------------------------------------------------------------
| Basic validation
|--------------------------------------------------------------------------
*/

if (
    empty($full_name) ||
    empty($phone)
    
) {

    header('Location: ../index.html');
    exit;

}

/*
|--------------------------------------------------------------------------
| Insert enquiry
|--------------------------------------------------------------------------
*/

$stmt = $conn->prepare("
    INSERT INTO enquiries
    (
        full_name,
        phone,
        interest
    )
    VALUES
    (
        ?, ?, ?
    )
");

if (!$stmt) {

    die('Database Error');

}

$stmt->bind_param(
    "sss",
    $full_name,
    $phone,
    $interest
);

if (!$stmt->execute()) {

    die(
        "Execute Failed: " .
        $stmt->error
    );

   /** FOR PRODUCTION 
    header('Location: ../index.html');
    exit; 

    */  

}

$stmt->close();

$conn->close();

/*
|--------------------------------------------------------------------------
| Redirect after success
|--------------------------------------------------------------------------
*/

header('Location: ../thankyou.html');
exit;

