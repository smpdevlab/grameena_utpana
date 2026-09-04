<?php

require_once 'includes/auth.php';
require_once '../includes/db.php';
require_once 'includes/header.php';

/*
----------------------------------
GET ENQUIRIES
----------------------------------
*/

$result = $conn->query(

    "SELECT *
     FROM enquiries
     ORDER BY id DESC"

);

?>

<div class="dashboard-container">

    <div class="dashboard-card">

        <div class="dashboard-header">

            <div class="logo">

                <img
                    src="/images/misc/logomin_admin.png"
                    alt="Grameena Utpanna Kendra"
                >

            </div>

            <div class="header-right">

                <span class="welcome-user">

                    Welcome,

                    <?=
                    htmlspecialchars(
                        $_SESSION['admin_username']
                    );
                    ?>

                </span>

                <a
                    href="logout.php"
                    class="btn btn-danger"
                >
                    Logout
                </a>

            </div>

        </div>

        <h2>
            Enquiry Management
        </h2>

        <p class="dashboard-text">

            Total enquiries received through the website.

        </p>

       <div class="table-wrapper">

    <table id="entriesTable"
            
        >

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Phone</th>

                    <th>Email</th>

                    <th>Interest</th>

                    <th>Message</th>

                   <!-- <th>Status</th> -->

                    <th>Enquiry rcvd at</th>

                </tr>

            </thead>

            <tbody>

                <?php while (
                    $row =
                    $result->fetch_assoc()
                ): ?>

                <tr>

                    <td>
                        <?= $row['id']; ?>
                    </td>

                    <td>
                        <?= htmlspecialchars(
                            $row['full_name']
                        ); ?>
                    </td>

                    <td>

                            <?php if (!empty($row['phone'])): ?>

                                <a
                                    class="phone-link"
                                    href="tel:<?= htmlspecialchars($row['phone']); ?>"
                                >
                                    <?= htmlspecialchars($row['phone']); ?>
                                </a>

                            <?php else: ?>

                                -

                            <?php endif; ?>

                    </td>

                    


                    <td>

                        <?php if (!empty($row['email'])): ?>

                            <a
                                href="mailto:<?= htmlspecialchars($row['email']); ?>"
                            >
                                <?= htmlspecialchars($row['email']); ?>
                            </a>

                        <?php else: ?>

                            -

                        <?php endif; ?>

                    </td>

                    <td>
                         <?= htmlspecialchars($row['interest'] ?? ''); ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['message'] ?? ''); ?>
                    </td>

                   

                    <td>
                        

                         <?= date(
                            'd-m-y, H:i',
                            strtotime($row['created_at'])
                        ); ?>
                    </td>

                </tr>

                <?php endwhile; ?>

            </tbody>

         </table>

</div>

    </div>

</div>



<?php require_once 'includes/footer.php'; ?>