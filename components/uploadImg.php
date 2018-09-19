<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 19.09.2018
 * Time: 20:38
 */
require_once 'functions.php';
$data = [];
if(isset($_GET['uploadfiles'])){
    $error = false;
    $files = [];
    $uploaddir = "../uploads/";
    if(!is_dir($uploaddir)) mkdir($uploaddir, 0777);
    foreach ($_FILES as $file){
        if(move_uploaded_file($file['tmp_name'], $uploaddir . basename($file['name']))){
            $files[]=realpath($uploaddir . $file["name"]);
            addImg(realpath($uploaddir . $file["name"]));
        } else {
            $error = true;
        }
    }
    $data = $error ? ["error" => "Ошибка загрузки файла"] : ['files'=>$files];
    echo json_encode($data);
}
