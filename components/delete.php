<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
require_once 'functions.php';
if(empty($_POST["id"])) die("Erroe");
deleteTitles($_POST["id"]);
