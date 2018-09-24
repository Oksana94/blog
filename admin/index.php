<?php
/**
 * Created by PhpStorm.
 * User: volyinets
 * Date: 12.09.2018
 * Time: 19:19
 */
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <script src="./jquery-3.3.1.min.js"></script>
    <script src="./script.js"></script>
    <title>Admin</title>
</head>
<body>
<nav class="menu">
    <a href="#" class="logo">Panda</a>
    <ul>
        <li class="item "><a href="#titleAll">Записи</a>
            <ul class="innerMenu">
                <li><a href="#titleAll">Все записи</a></li>
                <li><a href="#titleCreate">Создать запись</a></li>
            </ul>
        </li>
        <li class="item active"><a href="#media">Медифайлы</a></li>
        <li class="item"><a href="">Страница</a></li>
    </ul>
    <a href="#" class="logOut">Выход</a>
</nav>
<div class="wrap">
    <div class="wrap-section wrap-section__titleAll " data-target="titleAll">
        <h2>Все записи</h2>
        <div class="wrap-section-content">
        </div>
    </div>
    <div class="wrap-section wrap-section__titleCreate" data-target="titleCreate">
        <h2>Создать запись</h2>
        <input type="text" class="wrap-section-input" name="name">
        <div class="wrap-section-btnText">
            <input type="button" class="btnText-btn btnText-btn__bold" value="B" data-action="bold">
            <input type="button" class="btnText-btn btnText-btn__addImg" value="img" data-action="insertImage">
        </div>
        <p class="wrap-section-textarea" contenteditable="true"></p>
        <a href="#" class="save">Опубликовать</a>
    </div>
    <div class="wrap-section wrap-section__media active" data-target="media">
        <h2>Медифайлы</h2>
        <ul class="media">
            <li class="media-item "><a href="#media-all">All</a></li>
            <li class="media-item active"><a href="#media-download">Download</a></li>
        </ul>
        <div class="media-wrap">
            <div class="media-wrap-section media-all " data-target="media-all">
                <h3>All</h3>

            </div>
            <div class="media-wrap-section media-download active" data-target="media-download">
                <h3>Download</h3>
                <form action="#">
                    <input type="file" class="upload">
                    <input type="submit" class="uploadSend">
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
