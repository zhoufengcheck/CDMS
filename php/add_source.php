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
      $source_name=$_POST["source_name"];
      $address=$_POST["address"];
      $tel=$_POST["tel"];
    
      $flag1=$source_name==""||$address==""||$tel=="";    
      if(!$flag1){
          if($hidden=="add"){
              $sql="insert into t_source (source_name,address,tel)values
              ('$source_name','$address','$tel')";
              $add_info=mysql_query($sql);             
          }else{
              $source_id=$_POST['source_id'];  
              $sql="update t_source set 
              source_name = '$source_name',address='$address',tel='$tel'
             WHERE source_id=".$source_id; 
              $update_info=mysql_query($sql);  
          }
      }
      echo '<script>location.href="http://localhost/CDMS/index.html"</script>';
    
  
?>