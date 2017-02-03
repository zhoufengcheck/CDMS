<?php
	header("Content-type: text/html; charset=UTF-8");
    $con = mysql_connect("localhost","root","","cdms");
    if (!$con){
      die('Could not connect:' . mysql_error());
    }
    mysql_select_db("cdms", $con);
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
    $feed_id=$_POST['feed_id'];
    $edit_source=array();
    $data = mysql_query("select * from t_feed 
            where   
            feed_id=".$feed_id); 
    $edit_feed=data_instrctor($data);
    echo urldecode(json_encode($edit_feed)); 
?>