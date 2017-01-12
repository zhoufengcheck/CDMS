<?php
header("Content-type: text/html; charset=utf-8");
    // header("Content-type:application/json;charset=utf-8");
    // header("Access-Control-Allow-Origin : *");
    // header("Content-type:application/json;charset=utf-8");
    // mysql_query("set names 'utf8' ");
	// mysql_query("set character_set_client=utf8");
	// mysql_query("set character_set_results=utf8");
	// $str = json_encode($datas);
    // echo preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $str);
    // echo preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2LE', 'UTF-8', pack('H4', '\\1'))", $str);

	require_once 'medoo.php';
    $database  = new medoo([
        'database_type' => 'mysql',
        'database_name' => 'cdms',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8'
    ]);
   class Result{
        public $totalpage='0';
        public $arr=array();
    }
    $data=new Result();



   if(isset($_POST['name'])){
      $name=$_POST['name'];
      $search=$_POST['search'];
       if($search==""){
             $datas = $database->select("t_close",
                ["[>]t_source" =>"source_id","[>]t_classify" =>"classify_id"],
                "*",
                ["classify_id" =>$name['arr'],"LIMIT" => [$name['pagenum'], $name['pagesize']]]
              );
             $count = $database->count("t_close",
                ["[>]t_source" =>"source_id","[>]t_classify" =>"classify_id"],
                "*",
                ["classify_id" =>$name['arr']]
             );
             $data->arr=$datas;
             $data->totalpage=$count;
       }else{
            $datas = $database->select("t_close",
                ["[>]t_source" =>"source_id","[>]t_classify" =>"classify_id"],
                "*",
                [
                   "AND" => ["classify_id" =>$name['arr'],"close_name[~]"=>$search],
                   "LIMIT" => [$name['pagenum'], $name['pagesize']]
                ]
            );
            $count = $database->count("t_close",
                ["[>]t_source" =>"source_id","[>]t_classify" =>"classify_id"],
                "*",
                ["AND" => ["classify_id" =>$name['arr'],"close_name[~]"=>"aa"]]
            );
            $data->arr=$datas;
            $data->totalpage=$count;
       }
       echo json_encode(json_encode($data));
   }
   if(isset($_POST['delete_id'])){
        $delete_id=$_POST['delete_id'];
        $datas=$database->delete("t_close",[
            "close_id"=>$delete_id
        ]);
        echo json_encode($datas);
   }





?>