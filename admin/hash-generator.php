<?php

/*
|--------------------------------------------------------------------------
| Password Hash Generator
|--------------------------------------------------------------------------
|
| Developer utility for generating password hashes
| to be pasted into the admins.password_hash column.
|
| Example:
| https://yoursite.com/admin/hash-generator.php?key=Aumesh2026
|
*/

$secretKey = 'Aumesh2026';

if (
    !isset($_GET['key']) ||
    $_GET['key'] !== $secretKey
) {

    http_response_code(403);

    exit('Access Denied');

}

$generatedHash = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $password = trim(
        $_POST['password'] ?? ''
    );

    if ($password !== '') {

        $generatedHash = password_hash(
            $password,
            PASSWORD_DEFAULT
        );

    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>
        Password Hash Generator
    </title>

    <style>

        body{

            font-family: Arial, sans-serif;
            max-width:700px;
            margin:40px auto;
            padding:20px;

        }

        h1{

            margin-bottom:20px;

        }

        input[type="text"]{

            width:100%;
            padding:12px;
            font-size:16px;
            box-sizing:border-box;

        }

        button{

            margin-top:15px;
            padding:12px 20px;
            cursor:pointer;

        }

        textarea{

            width:100%;
            margin-top:20px;
            padding:12px;
            box-sizing:border-box;
            font-family:monospace;

        }

        .note{

            background:#f5f5f5;
            padding:15px;
            margin-bottom:20px;
            border-radius:8px;

        }

    </style>

</head>

<body>

    <h1>
        Password Hash Generator
    </h1>

    <div class="note">

        Enter a password below.

        Copy the generated hash.

        

    </div>

    <form method="post">

        <input
            type="text"
            name="password"
            placeholder="Enter Password"
            required>

        <button type="submit">

            Generate Hash

        </button>

    </form>

    <?php if ($generatedHash): ?>

        <h3>
            Generated Hash
        </h3>

        <textarea
            rows="4"
            readonly><?php echo htmlspecialchars($generatedHash); ?></textarea>

    <?php endif; ?>

</body>

</html>