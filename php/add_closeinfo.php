<?php
	header("Content-type: text/html; charset=UTF-8");
    $con = mysql_connect("localhost","root","","cdms");
    if (!$con){
      die('Could not connect:' . mysql_error());
    }
    mysql_select_db("cdms", $con);
    
    class Results{
        public $arrs_source=array();
        public $arrs_classify=array();
    }
    function data_instrctor($result){
        $arrs =array();
        while($row = mysql_fetch_array($result)){
           foreach ($row as $key => $value) {
               $row[$key]=urlencode($value);
           }
           $arrs[]=$row;
        }     
       return $arrs;
    }
    $arr_source=array();
    $arr_classify=array();
    $data=new Results();
    
    $result_source = mysql_query("select * from t_source"); 
 	$arr_source=data_instrctor($result_source);
 	$result_classify = mysql_query("select * from t_classify"); 
 	$arr_classify=data_instrctor($result_classify);
 	
 	$data->arrs_source=$arr_source;
 	$data->arrs_classify=$arr_classify;
  	echo urldecode(json_encode($data));
?>