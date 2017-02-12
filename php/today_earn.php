<?php
	require_once "connect.php";
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
    $close_ids=array();
	$sql="select close_id,sell_number from t_sellcon where sell_date='".date("Y-m-d")."'";
	$result = mysql_query($sql);
	while($row = mysql_fetch_array($result))
	{
		$close_ids[]=$row['close_id'];
	}
	$string=implode(",",$close_ids);
	echo $string;
	$sql_price="select cost_price,sell_price from t_close where close_id in (".$close_ids.")";
//	  $today_earn=data_instrctor($result);
//  echo urldecode(json_encode($today_earn)); 

?>