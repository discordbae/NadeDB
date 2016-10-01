<?php

$p = intval($_GET['p']);
$q = intval($_GET['q']);

$con = mysqli_connect('localhost','root','ninjakiwi','nade_info');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$sql = "INSERT INTO cache (Name, Starred, throwX, throwY, bloomX, bloomY, hyperlink, Jumpthrow, tags)
VALUES ('testnade', 0, 200, 200, $p, $q, 'examplelink.com', 0, 'sample tag')";

mysqli_query($con, $sql);

mysqli_close($con);
?>