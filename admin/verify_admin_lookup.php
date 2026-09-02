<?php

require_once '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim($_POST['email']);

    $stmt = $conn->prepare(

        "SELECT
            id,
            username,
            email
         FROM admins
         WHERE email = ?
         LIMIT 1"

    );

    $stmt->bind_param(
        "s",
        $email
    );

    $stmt->execute();

    $result = $stmt->get_result();

    echo "<pre>";

    var_dump(
        $result->fetch_assoc()
    );

    echo "</pre>";

    exit;

}
?>

<form method="post">

    <input
        type="email"
        name="email"
        required>

    <button type="submit">
        Find Admin
    </button>

</form>