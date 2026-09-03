<?php
require_once '../includes/db.php';

echo "PHP Time: ";
echo date('Y-m-d H:i:s');

echo "<br>";

echo "PHP Timezone: ";
echo date_default_timezone_get();