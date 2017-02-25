<?php
	header("Content-type: text/html; charset=UTF-8");

	$con = mysql_connect("localhost","root","","cdms");
    if (!$con){
      die('Could not connect:' . mysql_error());
    }
    mysql_select_db("cdms", $con);
    
    function data_instrctor($count){       
        $total=0;
        if($rs=mysql_fetch_array($count)){         
              $total=$rs[0];             
          }else{        
              $total=0;        
         }
        
       return $total;
    }

    $close_id=$_POST['close_id'];
    $sell_number=$_POST['sell_number'];
    $sell_date=date("Y-m-d");
    $rest=$_POST['rest']-$sell_number;
    $count=mysql_query("select count(*) from t_sellcon where 
    close_id='$close_id' and sell_date='$sell_date'"); 
    $total=data_instrctor($count); 
    if($total==1){
    	$sell_num=mysql_query("select sell_number from t_sellcon where 
    	close_id='$close_id' and sell_date='$sell_date'");
        $num=data_instrctor($sell_num)+$sell_number;
    	mysql_query("update t_sellcon set sell_number='$num' where 
    	close_id='$close_id' and sell_date='$sell_date'"); 
    }else{
    	 $insert_sql="insert into t_sellcon (close_id,sell_date,sell_number) values
    	 ('$close_id','$sell_date','$sell_number')";
    	 $insert_info=mysql_query($insert_sql);
    }
   
     $update_sql="update t_close set rest='$rest' where close_id=".$close_id;
     $update_info=mysql_query($update_sql); 
?>