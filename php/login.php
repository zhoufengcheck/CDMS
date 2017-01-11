<?php	
    require_once 'medoo.php';
    $database  = new medoo([
        'database_type' => 'mysql',
        'database_name' => 'cdms',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8'
    ]);
    $param=$_POST['name'];
    $datas = $database->select("t_user", "*", ["AND"=>[
    	"user_name"=>$param["user_name"],
    	"pwd"=>$param["pwd"]
    ]]);
    echo json_encode($datas);
?>