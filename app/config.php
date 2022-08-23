<?php

if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'){
    $protocol = 'https://';
} else {
    $protocol = 'http://';
}


//DB settings
define('DB_HOST', 'localhost');
define('DB_NAME', 'project');
define('DB_USER', 'root');
define('DB_PASS', 'A9101104265falkon');

define('HOST', $protocol . $_SERVER['HTTP_HOST'] . '/');
define('ROOT', dirname(__FILE__) . '/');

define('SITE_NAME', 'Сайт Digital Nomad');
define('SITE_EMAIL', 'info@project.com');