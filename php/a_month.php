<?php
	require_once "connect.php";
  class Result{
    public $close_name="";
    public $sell_num=0;
    public $close_id=0;
   }
  class Series{
    public $yAxis=array();
    public $unit="件";
    public $data=array();
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

  function ArrUnique($arr){//数组去重
    echo count($arr);
    $res=array();
    $close_id=array();
    for($x = 0;$x<count($arr);$x++){
      $_result=new Result();
      $flag=false;
      $add_num=0;
      for($y=0;$y<count($res);$y++){
        if($res[$y]->close_id==$arr[$x]->close_id){
            $flag=true;
        }else{
          $add_num=$arr[$x]->sell_num;
        }
      }
      if($flag==false){
        $_result->close_name="";
        $_result->close_id=$arr[$x]->close_id;
        $_result->sell_num=$arr[$x]->sell_num;
        $res[]= $_result;
        $close_id[]=$arr[$x]->close_id;
      }else{
        for($z = 0;$z<count($res);$z++){
          if($res[$z]->close_id==$arr[$x]->close_id){
              $res[$z]->sell_num=$res[$z]->sell_num+$add_num;
          }
        }
      }
    }
    $string=implode(",",$close_id);
    $sql="select close_id,close_name from t_close where close_id in (".$string.")";
    $close_name= mysql_query($sql);//今日售卖件数
    while($row = mysql_fetch_array($close_name)){ 
       for($x=0;$x<count($res);$x++){
          if($row['close_id']==$res[$x]->close_id){
            $res[$x]->close_name=urlencode($row['close_name']);
          }
       }
    }
    return $res;    
  }
  function ReturnSeries($arr){//数组去重
    $series=new Series();
    $yAxis=array();
    for($x=0;$x<count($arr)-1;$x++){
      $close_name=$arr[$x]->close_name;
      $close_id=$arr[$x]->close_id;
      $sell_num=$arr[$x]->sell_num;
      $max=$arr[$x]->sell_num;
      $index=$x;
      for($y=$x+1;$y<count($arr);$y++){
        if($arr[$y]->sell_num>$max){
           $max=$arr[$y]->sell_num;
           $index=$y;
        }
      } 
   
      $arr[$x]->close_name =$arr[$index]->close_name;
      $arr[$x]->close_id =$arr[$index]->close_id;
      $arr[$x]->sell_num =$arr[$index]->sell_num;
   
      $arr[$index]->close_name =$close_name;
      $arr[$index]->close_id =$close_id;
      $arr[$index]->sell_num =$sell_num;
    }
    if(count($arr)>10){
      $output = array_slice($arr, 10);
    }
    return $arr;
  }

  $sql="select * from t_sellcon where  sell_date>DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
	$result = mysql_query($sql);//今日售卖件数
  $select_data=array();
  while($row = mysql_fetch_array($result))
  { 
    $data=new Result();
    $data->close_id=$row['close_id'];
    $data->sell_num=$row['sell_number'];
    $select_data[]=$data;
  }
  echo(count($select_data));
  $a=array();
  $a=ArrUnique($select_data);
  $series=ReturnSeries($a);
  echo urldecode(json_encode($series));



	 // for($x = 0;$x<count($a);$x++){//遍历数组的值
  //   echo "</br>";
  //   echo $a[$x]->close_id."  ".$a[$x]->sell_num."  ".$a[$x]->close_name."</br>";
  // }





    // $res=array();
    // $res=data_instrctor($result);
    // echo urldecode(json_encode($res));

   
?>