<?php
	require_once "connect.php";
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
    function today_eran_money($price,$num){
    	$total=0;
    	for($y=0;$y<count($price);$y++){
    		for($x=0;$x<count($price);$x++){
    			if($price[$y]->close_id==$num[$x]->close_id){
    				$total=$total+($price[$x]->sale_price-$price[$x]->cost_price)*$num[$x]->sell_number;
    			}
    		}
    	}
    	return $total;
    }
    class ResultNum{
        public $close_id=0;
        public $sell_num=0;
    }
    class ResultPrice{
        public $close_id=0;
        public $sale_price=0;
        public $cost_price=0;
    }
    $close_ids=array();
    $today_earn_num=array();
    $sql="SELECT close_id,sell_number FROM t_sellcon WHERE TO_DAYS( NOW( ) ) - TO_DAYS(sell_date) <= 1";
	// $sql="select close_id,sell_number from t_sellcon where sell_date='".date("Y-m-d")."'";
	$result = mysql_query($sql);//今日售卖件数
	while($row = mysql_fetch_array($result))
	{	$data=new ResultNum();
		$close_ids[]=$row['close_id'];
		$data->close_id=$row['close_id'];
		$data->sell_number=$row['sell_number'];
		$today_earn_num[]=$data;
	}
	
	$string=implode(",",$close_ids);
	$sql_price="select close_id,cost_price,sale_price from t_close where close_id in (".$string.")";
	$result1 = mysql_query($sql_price);
	$today_earn_price=array();
	while($row = mysql_fetch_array($result1))
	{	$data=new ResultPrice();
		$data->close_id=$row['close_id'];
		$data->sale_price=$row['sale_price'];
		$data->cost_price=$row['cost_price'];
		$today_earn_price[]=$data;
	}
	$total=today_eran_money($today_earn_price,$today_earn_num);
	echo $total;
?>