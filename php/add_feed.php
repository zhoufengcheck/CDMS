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
   
      $hidden=$_POST["hidden"];
      $autor=$_POST["autor"];
      $date=$_POST["date"];
      $feed_content=$_POST["feed_content"];
    
      $flag1=$autor==""||$date==""||$feed_content=="";    
      if(!$flag1){
          if($hidden=="add"){
              $sql="insert into t_feed (autor,date,feed_content)values
              ('$autor','$date','$feed_content')";
              $add_info=mysql_query($sql);             
          }else{
              $feed_id=$_POST['feed_id'];  
              $sql="update t_feed set 
              autor = '$autor',date='$date',feed_content='$feed_content'
             WHERE feed_id=".$feed_id; 
              $update_info=mysql_query($sql);  
          }
      }
      echo '<script>location.href="http://localhost/CDMS/feedback.html"</script>'; 
?>