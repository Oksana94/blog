<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
require_once 'functions.php';
$name = @$_POST["name"];
$content = @$_POST["content"];
$date = @$_POST["date"];
if(empty($_POST["name"]) || empty($_POST["content"]) || empty($_POST["date"])) die("error");
addTitle($name, $content, $date);