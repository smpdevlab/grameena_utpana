<?php

require_once '../includes/db.php';
require_once 'includes/send_mail.php';


$message = '';

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

    if ($result->num_rows === 1) {

        $admin = $result->fetch_assoc();

        /*
        ----------------------------------
        GENERATE TOKEN
        ----------------------------------
        */

        $token =
            bin2hex(
                random_bytes(32)
            );

        $expiresAt =
            date(
                'Y-m-d H:i:s',
                strtotime('+1 hour')
            );

        /*
        ----------------------------------
        STORE TOKEN
        ----------------------------------
        */

        $insert = $conn->prepare(

            "INSERT INTO password_resets
            (
                admin_id,
                reset_token,
                expires_at
            )
            VALUES
            (
                ?, ?, ?
            )"

        );

        $insert->bind_param(
            "iss",
            $admin['id'],
            $token,
            $expiresAt
        );

        $insert->execute();

        $resetLink =
    'http://grameenautpanna.loc/admin/reset-password.php?token='
    . urlencode($token);

$emailBody = '

    <h2>Password Reset</h2>

    <p>
        A request was made to reset the administrator password
        for Grameena Utpanna Kendra.
    </p>

    <p>
        Click the button below to create a new password:
    </p>

    <p>
        <a href="' . $resetLink . '">
            Reset Password
        </a>
    </p>

    <p>
        This link will expire in 1 hour.
    </p>

    <p>
        If you did not request this password reset,
        you can safely ignore this email.
    </p>

';

$mailSent = sendEmail(
    $admin['email'],
    'Grameena Utpanna Kendra - Password Reset',
    $emailBody
);



        /* $message =
            'Token generated successfully.'; */

                        if ($mailSent) {

                $message =
                    'Password reset email sent successfully.';

            }
            else {

                $message =
                    'Token was created, but the email could not be sent.';

            }

       /* echo "<hr>";
        echo "<strong>Token:</strong><br>";
        echo $token;

        echo "<br><br>";

        echo "<strong>Expires:</strong><br>";
        echo $expiresAt;

        echo "<hr>"; */

    }
    else {

        $message =
            'Email not found.';

    }

}
?>

<?php
require_once 'includes/header.php';
?>

<div class="container">

    <div class="card">

        <div class="logo">
            <img
                src="/images/misc/logomin_admin.png"
                alt="Grameena Utpanna Kendra">
        </div>

        <h1>Forgot Password</h1>

        <p class="form-help">
            Enter your administrator email address and we'll send a password reset link.
        </p>

 <?php if ($message): ?>

            <div class="message-box">
                <?php echo htmlspecialchars($message); ?>
            </div>

        <?php endif; ?>

<form method="POST">

    <input
        type="email"
        name="email"
        required
        placeholder="Admin Email">

    <br><br>

    <button type="submit">
         Send Reset Link
 </button>

   <div class="forgot-link">
            <a href="/admin/index.php">
                ← Back to Login
            </a>
        </div>

    </div>

</div>

<?php
require_once 'includes/footer.php';
?>