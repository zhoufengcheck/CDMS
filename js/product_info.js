 var productInfo={
 	init_table:function(){
        var arr=[];
        $('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
        var param={pagenum:0,pagesize:10,arr:arr};
        $.post('php/product_info.php',{name:param,search:""},function(data){
            var data=JSON.parse(data);
            var page_size=10;
            var flag=true;
            var sort_list=['close_id','close_name',"source_name","cost_price","sale_price","color","size","classify_name"];
            var thList=['服装ID','服装名称','商品源','进价','建议零售价(元)','颜色','型号','服装类型','操作'];
            var tabdata={}
            tabdata['pageNum']=1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productInfo .tab').table(tabdata);
           $('#productInfo').find('ul.pagination li').not('.disabled').find('a').click(function(){
           	    var length= $('#productInfo').find('[data-node="length"]').val();
                productInfo.reset_table(($(this).attr('data-num')-1)*10,length);
            })
            $('#productInfo').find('[data-node="length"]').change(function(){
            	var length= $('#productInfo').find('[data-node="length"]').val();
                productInfo.reset_table(0,length);
            })
            productInfo.oper_data()
        });

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
               
                var td_opt = {
                    content: tdList[i][sort_list[j]],
                    isCenter: "",
                    isSorting: "sorting",
                    sortName: "display"
                }
                td.push(td_opt);
                
            }
            if(flag==true){
                var href='<a href="javascript:;" data-action="check" data-id='+tdList[i]["close_id"]+' >查看</a>';
                href=href+'<a href="javascript:;" data-reveal-id="myModal" data-action="delete" data-id='+tdList[i]["close_id"]+' >删除</a>';
                href=href+'<a href="javascript:;" data-action="edit"  data-id='+tdList[i]["close_id"]+' >编辑</a>';
                
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
    reset_table:function(pageNum,page_size,arr){
        $('.select').val()==0?arr=[1,2,3]:arr=[$('.select').val()];
        var param={pagenum:pageNum,pagesize:page_size,arr:arr}
        var search=$('#productInfo').find('[data-action="closename"]').val()
       $.post('php/product_info.php',{name:param,search:search},function(data){
            var data=JSON.parse(data);
            var flag=true;
            var sort_list=['close_id','close_name',"source_name","cost_price","sale_price","color","size","classify_name"];
            var thList=['服装ID','服装名称','商品源','进价','建议零售价','颜色','型号','服装类型','操作'];
            var tabdata={}
            tabdata['pageNum']=pageNum/10+1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productInfo .tab').table(tabdata);
            $('#productInfo').find('ul.pagination li').not('.disabled').find('a').click(function(){
                var length= $('#productInfo').find('[data-node="length"]').val();
                productInfo.reset_table(($(this).attr('data-num')-1)*10,length);
            })
           $('#productInfo').find('[data-node="length"]').change(function(){
           		var length= $('#productInfo').find('[data-node="length"]').val()
               	productInfo.reset_table(0,length);
           })
           productInfo.oper_data()
        });     
    },
    search:function(){
        $('.select').change(function(){
        	var length= $('#productInfo').find('[data-node="length"]').val()
            productInfo.reset_table(0,length);
        })
        $('#productInfo').find('[data-action="search"]').click(function(){
        	var length= $('#productInfo').find('[data-node="length"]').val()
            productInfo.reset_table(0,length);
        })
    },
    dialog_init:function(bool,dom){
        $('#myModal').empty();
        if(bool){
          $mess= $('<p>您确定要删除这条信息?</p>')
            $yes=$('<span class="yes">确定</span>');
            $no=$('<span class="no">取消</span>');
            $('#myModal').append($mess);
          $('#myModal').append($yes);
            $('#myModal').append($no);
        }else{
            $mess= $('<p>删除成功</p>')
            $yes=$('<span class="yes">确定</span>');
            $('#myModal').append($mess);
            $('#myModal').append($yes);
        }
        var modalLocation = dom.attr('data-reveal-id');
        $('#'+modalLocation).reveal(dom.data());
    },
    oper_data:function(){
         $('#productInfo').find('[data-action="delete"]').click(function(e){
             var id=$(this).attr('data-id')
             e.preventDefault();
             productInfo.dialog_init(true,$(this));
             $('.yes').click(function(){
                 $.post('php/product_info.php',{delete_id:id},function(data){
                    var length= $('#productInfo').find('[data-node="length"]').val()
                    productInfo.reset_table(0,length);
                 })

             })
         })
          $('#productInfo').find('[data-action="edit"]').click(function(e){
             var id=$(this).attr('data-id')
             e.preventDefault();
             location.href = "http://localhost/CDMS/edit_closeinfo.html?close_id="+id;
         })
    },
 	add_info:function(){
 		var url="index.html"
 		location.href = "http://localhost/CDMS/add_closeinfo.html?url="+url;
 	}
 }

 $(function () {
 	productInfo.init_table();
    productInfo.search();
    $('#productInfo').find('[data-action="add"]').click(function(){
    	productInfo.add_info();
    })
 	productSource.init_table();
 	productSource.search();
    $('.select').chosen({
        width:"150px",
        disable_search:true
    });

 });