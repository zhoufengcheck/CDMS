<?php
	require_once "connect.php";
	class ResultNum{
        public $close_id=0;
        public $sell_num=0;
    }
    class ResultPrice{
        public $close_id=0;
        public $sale_price=0;
        public $cost_price=0;
        public $close_name="";
    }
    class ResultTab{
    	public $name_id="";
    	public $sell_num=0;
    	public $money=0;
    }
    class ResultData{
    	public $total=0;
    	public $arr=array();
    }
    function resultTab($arrnum,$arrprice){
  		$result=array();
    	for($x=0;$x<count($arrnum);$x++){
    		$result_tab=new ResultTab();
    		$money=0;
    		$close_name="";
    		for($y=0;$y<count($arrprice);$y++){
    			if($arrnum[$x]->close_id==$arrprice[$y]->close_id){
    				$close_name=$arrprice[$y]->close_name;
    				$money=($arrprice[$y]->sale_price-$arrprice[$y]->cost_price)*$arrnum[$x]->sell_num;
    			}
    		}
			$result_tab->name_id=urlencode($close_name."(ID:".$arrnum[$x]->close_id.")");
			$result_tab->sell_num=urlencode($arrnum[$x]->sell_num.'(件)');
			$result_tab->money=urlencode($money.'(元)');
			$result[]=$result_tab;
    	}
    	return $result;
    }

    $dates=$_POST['time'];
	$index=$_POST['index']*7;
	$count=mysql_query("select count(*) from t_sellcon where date(sell_date)='".$dates."'");
	$total=0;
	$rs=mysql_fetch_array($count);
    if($rs[0]!=0){         
     	$total=$rs[0];      
		$sql="select close_id,sell_number from t_sellcon where date(sell_date)='".$dates."'LIMIT ".$index.",7";
		$result = mysql_query($sql);
		$arr=array();
		$close_id=array();
		while($row = mysql_fetch_array($result))
		{	$data=new ResultNum();
			$close_id[]=$row['close_id'];
			$data->close_id=$row['close_id'];
			$data->sell_num=$row['sell_number'];
			$arr[]=$data;
		}
		$string=implode(",",$close_id);
		$sql_price="select close_id,close_name,cost_price,sale_price from t_close where close_id in (".$string.")";
		$result1 = mysql_query($sql_price);
		$today_earn_price=array();
		while($row = mysql_fetch_array($result1))
		{	$data=new ResultPrice();
			$data->close_id=$row['close_id'];
			$data->sale_price=$row['sale_price'];
			$data->cost_price=$row['cost_price'];
			$data->close_name=$row['close_name'];
			$today_earn_price[]=$data;
		}
		$tab=resultTab($arr,$today_earn_price);
		// for($x=0;$x<count($tab);$x++){
		// 	echo $tab[$x]->name_id." ".$tab[$x]->sell_num." ".$tab[$x]->money.'</br>';
		// }
		$result_data=new ResultData();
		$result_data->total=$total;
		$result_data->arr=$tab;
		echo urldecode(json_encode($result_data));       
    }else{     
        $total=0;
        $result_data=new ResultData();
		$result_data->total=$total;
		$result_data->arr=array();
		echo urldecode(json_encode($result_data));        
    }
  
	

?>