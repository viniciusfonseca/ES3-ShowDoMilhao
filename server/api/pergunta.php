<?php
/**
 * Created by PhpStorm.
 * User: Pinipa
 * Date: 14/11/2017
 * Time: 11:08
 */

$method = $_SERVER['REQUEST_METHOD'];
$request = json_decode(file_get_contents('php://input'), true);


$servername = "cloudtasks.me";
$username = "u860844912_show";
$password = "u860844912_show";
$dbname = "u860844912_show";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch ($method) {
    case 'PUT':
        break;
    case 'POST':
        break;

    case 'GET':

        if(isset($_GET['id_pergunta'])){
            $sql = "select * from alternativa2 where id_pergunta = {$_GET['id_pergunta']}";
        }else{
            $sql = "select * from pergunta2";
        }

        $result = $conn->query($sql);

        $return = [];

        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                   $return[] = $row;
            }
        }

        echo json_encode($return);

        $conn->close();

        break;
    case 'HEAD':
        break;
    case 'DELETE':
        break;
    case 'OPTIONS':
        break;
    default:
        break;
}