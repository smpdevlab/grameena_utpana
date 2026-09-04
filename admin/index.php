<?php

session_start();

if (
    isset($_SESSION['admin_id'])
) {

    header('Location: dashboard.php');
    exit;

}

require_once '../includes/db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

   

    //exit();

    $stmt = $conn->prepare(

        "SELECT
            id,
            username,
            password_hash,
            is_active
         FROM admins
         WHERE username = ?
         LIMIT 1"

    );

    $stmt->bind_param(
        "s",
        $username
    );

    $stmt->execute();

    

    $result = $stmt->get_result();

    

    if (
        $result->num_rows === 1
    ) {

        $admin = $result->fetch_assoc();


            $passwRes=password_verify(
                trim($password),
                $admin['password_hash']
            ); 


        if (
            $admin['is_active'] == 1 &&
            password_verify(
                $password,
                $admin['password_hash']
            )
        ) {

            $_SESSION['admin_id']
                = $admin['id'];

            $_SESSION['admin_username']
                = $admin['username'];

            $update = $conn->prepare(

                "UPDATE admins
                 SET last_login_at = NOW()
                 WHERE id = ?"

            );

            $update->bind_param(
                "i",
                $admin['id']
            );

            $update->execute();

            header(
                'Location: dashboard.php'
            );

            exit;

        }

    }

    $error =
        'Invalid username or password.';

}
?>


<!--
<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
</head>
<body>

<h2>Admin Login</h2>

<?php// if ($error): ?>

<p style="color:red;">
    <?php// echo $error; ?>
</p>

<?php// endif; ?>

<form method="POST">

    <input
        type="text"
        name="username"
        placeholder="Username"
        required>

    <br><br>

    <input
        type="password"
        name="password"
        placeholder="Password"
        required>

    <br><br>

    <button type="submit">
        Login
    </button>

</form>

</body>
</html>

-->
<?php

require_once 'includes/header.php';
?>

    <div class="container">
    <div class="card">

        <div class="logo">
            <img
                src="/images/misc/logomin_admin.png"
                alt="Grameena Utpanna Kendra"
            >
        </div>

        <h2>Admin Login</h2>

        <!-- form -->


        <?php if ($error): ?>

        <p style="color:red;">
        <?php echo $error; ?>
        </p>

        <?php endif; ?>

            <form method="POST">

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required>

                <br><br>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required>

            <div class="forgot-link">
                <a href="forgot-password.php">
                    Forgot Password?
                </a>
            </div>

                <br><br>

                <button type="submit">
                    Login
                </button>

            </form>

    </div>
</div>

<?php
require_once 'includes/footer.php';

