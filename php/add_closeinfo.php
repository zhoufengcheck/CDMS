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
      $close_name=$_POST["close_name"];
      $cost_price=$_POST["cost_price"];
      $sale_price=$_POST["sale_price"];
      $source_id=$_POST["source_id"];
      $color=$_POST["color"];
      $size=$_POST["size"];
      $classify_id=$_POST["classify_id"];
      $describle=$_POST["describle"];
      
      echo "close_name".$close_name;  
      echo "cost_price".$cost_price;
      echo "sale_price".$sale_price;  
      echo "color".$color;
       echo "source_id".$source_id;  
      echo "classify_id".$classify_id;
      echo "describle".$describle; 

      if ((($_FILES["file"]["type"] == "image/gif")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/pjpeg"))
        && ($_FILES["file"]["size"] < 20000))
          {
          if ($_FILES["file"]["error"] > 0)
            {
            echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
            }
          else
            {
            echo "Upload: " . $_FILES["file"]["name"] . "<br />";
            echo "Type: " . $_FILES["file"]["type"] . "<br />";
            echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
            echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

              move_uploaded_file($_FILES["file"]["tmp_name"],
              "../image/" . $_FILES["file"]["name"]);
              echo "Stored in: " . "image/" . $_FILES["file"]["name"];
            }
          }
        else
          {
          echo "图片太大";
          } 
      // echo $close_name;
       // echo '<script>location.href="http://localhost/CDMS/index.html"</script>';
    }
       

?>