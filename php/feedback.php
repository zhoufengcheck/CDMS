<?php
	header("Content-type: text/html; charset=UTF-8");
    $con = mysql_connect("localhost","root","","cdms");
    if (!$con){
      die('Could not connect:' . mysql_error());
    }
    mysql_select_db("cdms", $con);
    
    class Result{
        public $totalpage='0';
        public $arr=array();
    }
    function data_instrctor($count,$result){
       $data=new Result();
       $total=0;
        if($rs=mysql_fetch_array($count)){         
              $total=$rs[0];             
          }else{        
              $total=0;        
          }
        $arrs =array();
        while($row = mysql_fetch_array($result)){
           foreach ($row as $key => $value) {
               $row[$key]=urlencode($value);
           }
           $arrs[]=$row;
        }
       $data->arr=$arrs;
       $data->totalpage=$total;
       return $data;
    }
    if(isset($_POST['feed'])){
    	$feed=$_POST['feed'];
    	$result = mysql_query("select * from t_feed 
    	limit ".$feed['pagenum'].",".$feed['pagesize']
	    );		    
	  	$count = mysql_query("select count(*) from t_feed");	
	 	 $data=data_instrctor($count,$result);
	 	 echo urldecode(json_encode($data));
    }
    if(isset($_POST['delete_id'])){
        $delete_id=$_POST['delete_id'];
        $del = mysql_query("delete from t_feed where feed_id=".$delete_id);
   }
   
?>