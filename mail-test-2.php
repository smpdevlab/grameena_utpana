<?php

require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();

    $mail->Host = 'sandbox.smtp.mailtrap.io';

    $mail->SMTPAuth = true;

    $mail->Username = 'bc392b0d270668';

    $mail->Password = '2b924a5949cc8c';

    $mail->Port = 2525;

    $mail->setFrom(
        'test@example.com',
        'Test Sender'
    );

    $mail->addAddress(
        'pareshparekhdsgnr@gmail.com'
    );

    $mail->isHTML(true);

    $mail->Subject =
        'Mailtrap Test';

    $mail->Body =
        '<h2>Hello Mailtrap</h2>';

    $mail->send();

    echo 'MAIL SENT';

}
catch (Exception $e) {

    echo '<pre>';
    echo $mail->ErrorInfo;
    echo '</pre>';

}