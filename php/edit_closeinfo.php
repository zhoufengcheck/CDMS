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
    $close_id=$_POST['close_id'];
    $edit_close_message=array();
    $data = mysql_query("select * from t_close a,t_source b,t_classify c 
            where 
            a.source_id=b.source_id and 
            a.classify_id=c.classify_id and 
            close_id=".$close_id); 
    $edit_close_message=data_instrctor($data);
    echo urldecode(json_encode($edit_close_message)); 
?>