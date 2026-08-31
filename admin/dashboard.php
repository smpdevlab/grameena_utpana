<?php

require_once 'includes/auth.php';

?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h1>

    Welcome

    <?php

    echo htmlspecialchars(
        $_SESSION['admin_username']
    );

    ?>

</h1>

<p>

    Admin dashboard is working.

</p>

<p>

    <a href="logout.php">

        Logout

    </a>

</p>

</body>
</html>