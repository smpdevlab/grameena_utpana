<?php

require_once '../includes/db.php';

$token =
    trim(
        $_GET['token'] ?? ''
    );

$error = '';
$success = '';

/*
----------------------------------
VALIDATE TOKEN
----------------------------------
*/

$stmt = $conn->prepare(

    "SELECT
        id,
        admin_id,
        expires_at,
        used_at
     FROM password_resets
     WHERE reset_token = ?
     LIMIT 1"

);

$stmt->bind_param(
    "s",
    $token
);

$stmt->execute();

$result =
    $stmt->get_result();

if (
    $result->num_rows !== 1
) {

    exit(
        'Invalid password reset link.'
    );

}

$reset =
    $result->fetch_assoc();

/*
----------------------------------
CHECK USED
----------------------------------
*/

if (
    $reset['used_at'] !== null
) {

    exit(
        'This reset link has already been used.'
    );

}

/*
----------------------------------
CHECK EXPIRY
----------------------------------
*/

if (
    strtotime(
        $reset['expires_at']
    ) < time()
) {

    exit(
        'This reset link has expired.'
    );

}

/*
----------------------------------
UPDATE PASSWORD
----------------------------------
*/

if (
    $_SERVER['REQUEST_METHOD']
    === 'POST'
) {

    $password =
        trim(
            $_POST['password']
            ?? ''
        );

    $confirmPassword =
        trim(
            $_POST['confirm_password']
            ?? ''
        );

    if (
        strlen($password) < 8
    ) {

        $error =
            'Password must be at least 8 characters.';

    }
    elseif (
        $password !==
        $confirmPassword
    ) {

        $error =
            'Passwords do not match.';

    }
    else {

        $passwordHash =
            password_hash(
                $password,
                PASSWORD_DEFAULT
            );

        /*
        ------------------------------
        UPDATE ADMINS TABLE
        ------------------------------
        */

        $updateAdmin =
            $conn->prepare(

                "UPDATE admins
                 SET password_hash = ?
                 WHERE id = ?"

            );

        $updateAdmin->bind_param(
            "si",
            $passwordHash,
            $reset['admin_id']
        );

        $updateAdmin->execute();

        /*
        ------------------------------
        MARK TOKEN USED
        ------------------------------
        */

        $updateToken =
            $conn->prepare(

                "UPDATE password_resets
                 SET used_at = NOW()
                 WHERE id = ?"

            );

        $updateToken->bind_param(
            "i",
            $reset['id']
        );

        $updateToken->execute();

        $success =
            'Password updated successfully.';

    }

}

?>

<?php include 'includes/header.php'; ?>

<div class="container">
<div class="card">

 <div class="logo">
        <img
            src="/images/misc/logomin_admin.png"
            alt="Grameena Utpanna Kendra"
        >
    </div>


<h2>
    Reset Password
</h2>

<?php if ($error): ?>

<p style="color:red;">

    <?php echo $error; ?>

</p>

<?php endif; ?>

<?php if ($success): ?>

<p style="color:green;">

    <?php echo $success; ?>

</p>

<p>

    <a href="index.php">

        Go To Login

    </a>

</p>

<?php else: ?>

<form method="POST">

    <input
        type="password"
        name="password"
        placeholder="New Password"
        required>

    <br><br>

    <input
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        required>

    <br><br>

    <button type="submit">

        Update Password

    </button>

</form>

<?php endif; ?>

</div>
</div>

<?php include 'includes/footer.php'; ?>