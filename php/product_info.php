<?php
header("Content-type: text/html; charset=utf-8");
 // header("Content-type:application/json;charset=utf-8"); 
 // header("Access-Control-Allow-Origin : *");
  // header("Content-type:application/json;charset=utf-8");


	require_once 'medoo.php';
    $database  = new medoo([
        'database_type' => 'mysql',
        'database_name' => 'cdms',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8'
    ]);
    $name=$_POST['name'];
	//mysql_query("set names 'utf8' ");
	// mysql_query("set character_set_client=utf8");
	// mysql_query("set character_set_results=utf8");
    $datas = $database->select("t_close","*",[
    	"LIMIT" => [$name['pagenum'], $name['pagesize']]
    	]);
    $count = $database->count("t_close","*");
    class NbaPlayer{
		public $totalpage='0';
		public $arr=array();
	}
	$data=new NbaPlayer();
	$data->totalpage=$count;
	$data->arr=$datas;

	echo json_encode(json_encode($data));
      // $str = json_encode($datas);
     // echo preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $str);
     // echo preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2LE', 'UTF-8', pack('H4', '\\1'))", $str);

?>