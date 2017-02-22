<?php
	require_once "connect.php";
     class ResultSeries{
        public $data=array();
        public $xAxis=array();
        public $unit="";
    }
     class ResultNum{
        public $close_id=0;
        public $sell_num=0;
        public $sell_date="";
    }
     class ResultPrice{
        public $close_id=0;
        public $sale_price=0;
        public $cost_price=0;
        public $close_name="";
    }
    class ResultEarn{
      public $sell_date="";
      public $money=0;
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
    function earn($arr_num,$arr_money){
        $arr=array();
        for($x=0;$x<count($arr_num);$x++){
            $result_earn=new ResultEarn();
            $money=0;
            for($y=0;$y<count($arr_money);$y++){
                if($arr_num[$x]->close_id==$arr_money[$y]->close_id){
                    $money=($arr_money[$y]->sale_price-$arr_money[$y]->cost_price)*$arr_num[$x]->sell_num; 
                }
            }
            $result_earn->money=$money;
            $result_earn->sell_date=$arr_num[$x]->sell_date;
            $arr[]=$result_earn;
        }
        return $arr;
    }
    function ArrUnique($arr){ //数组去重和数组排序
        $result=array();
        $total_result=array();
        for($x=0;$x<count($arr);$x++){
            $_tag=new ResultEarn();
            $add_money=0;
            $flag=false;
            for($y=0;$y<count($result);$y++){
                if($arr[$x]->sell_date==$result[$y]->sell_date){
                    $flag=true;
                }else{
                    $add_money=$arr[$x]->money;
                }
           }
           if($flag==false){
                $_tag->sell_date=$arr[$x]->sell_date;
                $_tag->money=$arr[$x]->money;
                $result[]= $_tag;
           }else{
                for($z = 0;$z<count($result);$z++){
                  if($result[$z]->sell_date==$arr[$x]->sell_date){
                      $result[$z]->money=$result[$z]->money+$add_money;
                  }
                }
            }
        }
        
        //数组排序日期从前到后
        for($x=0;$x<count($result)-1;$x++){
            $min=$result[$x]->sell_date;
            $money=$result[$x]->money;
            $sell_date=$result[$x]->sell_date;
            $index=$x;
            for($y=$x+1;$y<count($result);$y++){
                if($min>$result[$y]->sell_date){
                    $min=$result[$y]->sell_date;
                    $index=$y;
                }
            }
            if($index!=$x){
                $result[$x]->sell_date=$result[$index]->sell_date;
                $result[$x]->money=$result[$index]->money;
                $result[$index]->sell_date=$sell_date;
                $result[$index]->money=$money;
            }
        }
        return $result;
    }
    function ChangeToSeries($arr){
        $result_series=new ResultSeries();
        $data=array();
        $xAxis=array();
        for($x=0;$x<count($arr);$x++){
            $data[]=$arr[$x]->money;
            $xAxis[]=$arr[$x]->sell_date;
        }
        $result_series->data=$data;
        $result_series->xAxis=$xAxis;
        $result_series->unit=urlencode("元");
        return $result_series;
    }
	$sql="select * from t_sellcon where sell_date>DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH) and TO_DAYS( sell_date)<=TO_DAYS(NOW())";
    $result = mysql_query($sql);
    $close_ids=array();
    $three_month_num=array();
    while($row = mysql_fetch_array($result))
    {   
        $data=new ResultNum();
        $close_ids[]=$row['close_id'];
        $data->close_id=$row['close_id'];
        $data->sell_num=$row['sell_number'];
        $data->sell_date=$row['sell_date'];
        $three_month_num[]=$data;
    }
    // for($x=0;$x<count($three_month_num);$x++){
    //     echo $three_month_num[$x]->close_id.' '.$three_month_num[$x]->sell_num.' '.$three_month_num[$x]->sell_date.'</br>';
    // }       
    $string=implode(",",$close_ids);
    $sql_price="select close_id,cost_price,sale_price,close_name from t_close where close_id in (".$string.")";
    $result1 = mysql_query($sql_price);
    $today_earn_price=array();
    while($row = mysql_fetch_array($result1))
    {   $data=new ResultPrice();
        $data->close_id=$row['close_id'];
        $data->sale_price=$row['sale_price'];
        $data->cost_price=$row['cost_price'];
        $data->close_name=$row['close_name'];
        $today_earn_price[]=$data;
    }
   $arr=earn($three_month_num,$today_earn_price);
  
   $arr1=ArrUnique($arr);
   $result_series=ChangeToSeries($arr1);
    echo urldecode(json_encode($result_series));




?>