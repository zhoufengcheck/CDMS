<?php
	require_once "connect.php";
	$sql = 'select * from t_sellcon where DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
	$result = mysql_query($sql);//今日售卖件数
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
    $res=array();
    $res=data_instrctor($result);
    echo urldecode(json_encode($res));
?>