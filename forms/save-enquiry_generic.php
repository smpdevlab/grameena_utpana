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

$email     = trim($_POST['email'] ?? '');
$interest  = trim($_POST['interest'] ?? '');
$subject   = trim($_POST['subject'] ?? '');
$message   = trim($_POST['message'] ?? '');

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

$stmt = $conn->prepare(

    "INSERT INTO enquiries
    (
        full_name,
        phone,
        email,
        interest,
        subject,
        message
    )
    VALUES
    (
        ?, ?, ?, ?, ?, ?
    )"

);

if (!$stmt) {

    die(
        'Database Error: ' .
        $conn->error
    );

}

$stmt->bind_param(

    "ssssss",

    $full_name,
    $phone,
    $email,
    $interest,
    $subject,
    $message

);

if (!$stmt->execute()) {

    die(
        'Execute Failed: ' .
        $stmt->error
    );

}

/*
|--------------------------------------------------------------------------
| Cleanup
|--------------------------------------------------------------------------
*/

$stmt->close();
$conn->close();

/*
|--------------------------------------------------------------------------
| Redirect after success
|--------------------------------------------------------------------------
*/

header('Location: ../thankyou.html');
exit;