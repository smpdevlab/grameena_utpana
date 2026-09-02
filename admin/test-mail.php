<?php

require_once 'includes/send_mail.php';

$result = sendEmail(

    'pareshparekhdsgnr@gmail.com',

    'Function Test',

    '<h2>sendEmail() Function Works!</h2>
     <p>Mail sent via PHPMailer and Mailtrap.</p>'

);

var_dump($result);