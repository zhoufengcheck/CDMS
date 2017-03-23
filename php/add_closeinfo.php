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
    if(isset($_POST["flag"])){
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
    }else{
      $hidden=$_POST["hidden"];
      $close_name=$_POST["close_name"];
      $cost_price=$_POST["cost_price"];
      $sale_price=$_POST["sale_price"];
      $source_id=$_POST["source_id"];
      $color=$_POST["color"];
      $size_arr=array();
      $size_arr=$_POST["size"];
      $size=implode(",",$size_arr);
      $classify_id=$_POST["classify_id"];
      $describle=$_POST["describle"];
      $rest=$_POST["rest"];
      $img_path="";
      if (($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/pjpeg")){
          if($_FILES["file"]["error"] > 0){
            echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
            }
          else{
              $img_path=$_FILES["file"]["name"];         
              move_uploaded_file($_FILES["file"]["tmp_name"],
              "../image/" . $_FILES["file"]["name"]);
            }
       }
      $flag1=$close_name==""||$cost_price==""||$sale_price==""||$cost_price==""||$source_id=="";
      $flag2=$color==""||$size==""||$classify_id==""||$describle==""||$img_path==""||$rest="";
       
      if(!$flag1||!$flag2){
          if($hidden=="add"){
              $sql="insert into t_close (close_name,source_id,cost_price,sale_price,color,size,describle,classify_id,img_path,rest)values
              ('$close_name','$source_id','$cost_price','$sale_price','$color','$size','$describle','$classify_id','$img_path','$rest')";
              $add_info=mysql_query($sql);
              // echo $hidden;
              
          }else{
              $close_id=$_POST['close_id'];
              if($img_path=="") {
                   $sql="update t_close set 
                close_name = '$close_name',source_id='$source_id',cost_price='$cost_price',sale_price='$sale_price',
                color='$color',size='$size',describle='$describle',classify_id='$classify_id',rest='$rest'
               WHERE close_id=".$close_id; 
              }else{
                   $sql="update t_close set 
                  close_name = '$close_name',source_id='$source_id',cost_price='$cost_price',sale_price='$sale_price',
                  color='$color',size='$size',describle='$describle',classify_id='$classify_id',img_path='$img_path',rest='$rest'
                 WHERE close_id=".$close_id; 
              }
              $update_info=mysql_query($sql);  
          }
      }
       echo '<script>location.href="http://localhost/CDMS/index.html"</script>';
    }
  
?>