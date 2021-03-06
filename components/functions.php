<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 03.09.2018
 * Time: 19:07
 */
function Connection(){
    static $dbh = null;
    if($dbh !== null) return $dbh;
    $dbh = new PDO("mysql:host=localhost;dbname=myblog;charset=utf8", "root", "", [
        PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC
    ]);
    return $dbh;
}
function getAllTitle(){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `titles`");
    return $stmt->fetchAll();
}
function getAllImg(){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `img`");
    return $stmt->fetchAll();
}
function addImg($name){
    $dbh = Connection();
    $name = $dbh->quote($name);
    $dbh->exec("insert into `img` (`path`) values ({$name})");
}
function addTitle($name, $cont, $date){
    $dbh = Connection();
    $name = $dbh->quote($name);
    $cont = $dbh->quote($cont);
    $date = $dbh->quote($date);
    $dbh->exec("insert into `titles` (`name`, `content`, `data`) values ({$name}, {$cont}, {$date})");
}
function getIdTitles($id){
    $dbh = Connection();
    $stmt = $dbh -> query("Select * from `titles` where id = {$id}");
    return $stmt->fetch();
}
function deleteTitles($id){
    $dbh = Connection();
    $id = (int)$id;
    $dbh->exec("delete from `titles` where `id`={$id}");
}
function renameTitle($name, $id){
    $dbh = Connection();
    $name = $dbh->quote($name);
    $id = (int)$id;
    $dbh->exec("UPDATE `titles` SET `name`= {$name} WHERE `id` = {$id}");
}