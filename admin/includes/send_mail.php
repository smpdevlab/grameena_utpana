<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* require_once __DIR__ . '/../vendor/autoload.php'; */
require_once __DIR__ . '/../../vendor/autoload.php';

/**
 * Send Email
 *
 * @param string $to
 * @param string $subject
 * @param string $body
 * @return bool
 */
function sendEmail(
    string $to,
    string $subject,
    string $body
): bool {

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();

        $mail->Host =
            'sandbox.smtp.mailtrap.io';

        $mail->SMTPAuth = true;

        $mail->Username =
            'bc392b0d270668';

        $mail->Password =
            '2b924a5949cc8c';

        $mail->SMTPSecure =
            PHPMailer::ENCRYPTION_STARTTLS;

        $mail->Port = 2525;

        $mail->setFrom(
            'noreply@grameenautpanna.in',
            'Grameena Utpanna Kendra'
        );

        $mail->addAddress($to);

        $mail->isHTML(true);

        $mail->Subject = $subject;

        $mail->Body = $body;

        return $mail->send();

    }
    catch (Exception $e) {

        error_log(
            'Mail Error: ' .
            $mail->ErrorInfo
        );

        return false;

    }

}