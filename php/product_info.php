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

   if(isset($_POST['name'])){
      $data=new Result();
      $name=$_POST['name'];
      $search=$_POST['search'];
      $str=implode(",",$name['arr']);
       if($search==""){
              $result = mysql_query("select * from t_close a,t_source b,t_classify c 
                where 
                a.source_id=b.source_id and 
                a.classify_id=c.classify_id and 
                a.classify_id in (".$str.") 
                limit ".$name['pagenum'].",".$name['pagesize']
                );
              $count = mysql_query("select count(*) from t_close a,t_source b,t_classify c 
                where 
                a.source_id=b.source_id and 
                a.classify_id=c.classify_id and 
                a.classify_id in (".$str.")"    
                );

              $data=data_instrctor($count,$result);
              echo urldecode(json_encode($data));
       }else{
               $search=$_POST["search"];
              $result = mysql_query("select * from t_close a,t_source b,t_classify c 
                where 
                a.source_id=b.source_id and 
                a.classify_id=c.classify_id and 
                a.classify_id in (".$str.") and 
                a.close_name like '%".$search."%' 
                limit ".$name['pagenum'].",".$name['pagesize']
                );

              $count = mysql_query("select count(*) from t_close a,t_source b,t_classify c 
                where 
                a.source_id=b.source_id and 
                a.classify_id=c.classify_id and 
                a.classify_id in (".$str.")"    
                );
              $data=data_instrctor($count,$result);
              echo urldecode(json_encode($data));
       }
   }
   if(isset($_POST['delete_id'])){
        $delete_id=$_POST['delete_id'];
        $del = mysql_query("delete from t_close where close_id=".$delete_id);
   }



?>