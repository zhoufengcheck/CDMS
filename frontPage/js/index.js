var _search=""
$(function(){
	var arr=[];
	$('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
	 var param={pagenum:0,pagesize:10,arr:arr};
	Init.init_table(param,_search);
})
var Init={
	init_table:function(param,search){
		_search=search;
		console.log(search);
		$.post('php/index.php',{name:param,search:search},function(data){
			$('.tab').off();
			var data=JSON.parse(data);
			var page_size=10;
            var flag=true;
            var sort_list=['close_id','close_name',"img_path","source_name","cost_price","sale_price","classify_name","rest"];
            var thList=['服装ID','服装名称','图片','商品源','进价(元)','建议零售价(元)','种类','库存(件)','操作'];
            var tabdata={}
            tabdata['pageNum']=param.pagenum/10+1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='服装信息总条数:'+data.totalpage+'条';
            var tdList=[];
            Init.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('.tab').table(tabdata);
            $('.tab').find('ul.pagination li').not('.disabled').find('a').click(function(){
           	    var arr=[];
				$('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
				 var param={pagenum:($(this).attr('data-num')-1)*10,pagesize:10,arr:arr};
                Init.init_table(param,search);
            })
            $('.tab').find('[data-action="sale"]').click(function(e){
            	 var $this=$(this);
	             var id=$this.attr('data-id')
	             var rest=parseInt($this.parent().parent().find('[sortName="rest"]').html());
	             e.preventDefault();
	             Init.dialog_init(id,$this);
	             $('.yes').click(function(){
	             	var sell_number=$('#sell_number').val();
	             	if(sell_number>rest){
	             		$('#error p').html('该服装内存不足')
						var modalLocation = "error";
        				$('#'+modalLocation).reveal($('#error').data());
	             	}else{
	             		$('#error p').html('售卖成功')
	             		 $.post('php/sell.php',{close_id:id,sell_number:sell_number,rest:rest},function(data){
							var param={pagenum:0,pagesize:10,arr:[1,2,3]};
							Init.init_table(param,"");
							var modalLocation = "error";
        					$('#'+modalLocation).reveal($('#error').data());
	                 	})
	             	}
	             })
         	})
            Init.search();	
		})
	},
	setTabData:function(data,thList,tdList,flag,sort_list){
        var _th=[];
        var _td=[];
        for(var i=0;i<thList.length;i++){
            var th ={
                content: thList[i],
                isCenter: "",
                sortName: "display"+i
            }
            _th.push(th);
        }
        for(var i=0;i<tdList.length;i++){
            var td=[];
            for(var j=0;j<sort_list.length;j++) {
            	var _content= tdList[i][sort_list[j]]
               if(sort_list[j]=="img_path"){
               	   _content= "<img width=150 height=100 src=../../CDMS/image/"+tdList[i][sort_list[j]]+">";
               }
                var td_opt = {
                    content: _content,
                    isCenter: "",
                    isSorting: sort_list[j],
                    sortName: sort_list[j]
                }
                td.push(td_opt);
                
            }
            if(flag==true){
                var href='<a href="#" data-reveal-id="myModal" data-action="sale" data-id='+tdList[i]["close_id"]+'  target="_blank">售卖</a>';             
                var hreftd ={
                    content: href,
                    isCenter: "",
                    isSorting: "sorting",
                    sortName: "display"
                }
                td.push(hreftd);
            }

            _td.push(td);
        }
        data['th'] = _th;
        data['td'] = _td;
    },
    search:function(){
        $('.select').change(function(){
        	var arr=[];
			$('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
			var param={pagenum:0,pagesize:10,arr:arr};
            Init.init_table(param,_search);
        })
        $('[data-action="search"]').click(function(){
        	var arr=[];
			$('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
			var param={pagenum:0,pagesize:10,arr:arr};
			_search=$('[data-action="closename"]').val();
            Init.init_table(param,_search);
        })
    },
    dialog_init:function(id,dom){ 	
    	$tr=dom.parent().parent();
    	$myModal=$('#myModal');
    	console.log($tr.find('[sortName="close_name"]').html());
		$myModal.find('[data-type="close_name"]').html($tr.find('[sortName="close_name"]').html());
		$myModal.find('[data-type="sale_price"]').html($tr.find('[sortName="sale_price"]').html()+"元");
		$myModal.find('[data-type="cost_price"]').html($tr.find('[sortName="cost_price"]').html()+"元");
        var modalLocation = dom.attr('data-reveal-id');
        $('#'+modalLocation).reveal(dom.data());
        
    },
}
