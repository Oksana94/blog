<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
require_once 'functions.php';
$name = @$_POST["name"];
$id = @$_POST["id"];
if(empty($_POST["name"]) || empty($_POST["id"])) die("error");
renameTitle($name, $id);