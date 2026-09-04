<?php

require_once 'includes/auth.php';
require_once 'includes/header.php';

?>

<div class="dashboard-container">

    <div class="dashboard-card">

     <div class="logo">
        <img
            src="/images/misc/logomin.png"
            alt="Grameena Utpanna Kendra"
        >
    </div>

        <h2>
            Welcome,
            <?=
            htmlspecialchars(
                $_SESSION['admin_username']
            );
            ?>
        </h2>

        <p class="dashboard-text">
            Admin dashboard is working successfully.
        </p>

        <div class="dashboard-actions">

            <a
                href="logout.php"
                class="btn btn-danger"
            >
                Logout
            </a>

        </div>

    </div>

</div>

<?php require_once 'includes/footer.php'; ?>