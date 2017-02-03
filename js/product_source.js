 var productSource={
 	init_table:function(){
        var param={pagenum:0,pagesize:10};
        $.post('php/product_source.php',{source:param,searchs:""},function(data){
            var data=JSON.parse(data);
            console.log(data);
            var page_size=10;
            var flag=true;
            var sort_list=['source_id','source_name','address','tel'];
        	var thList=['商品源ID','商品源名称','商品源地址','电话号码','操作'];
            var tabdata={}
            tabdata['pageNum']=1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
            productSource.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productSource .tab').table(tabdata);
            $('#productSource').find('ul.pagination li').not('.disabled').find('a').click(function(){
            	var length= $('#productSource').find('[data-node="length"]').val()
                productSource.reset_table(($(this).attr('data-num')-1)*10,length)
            })
            $('#productSource').find('[data-node="length"]').change(function(){   
            	var length= $('#productSource').find('[data-node="length"]').val()         	
                productSource.reset_table(0,length)
                
            })
            productSource.delete_data()
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
                var href='<a href="check_source.html?source_id='+tdList[i]["source_id"]+'" target="_blank">查看</a>';
                href=href+'<a href="javascript:;" data-reveal-id="myModal" data-action="delete" data-id='+tdList[i]["source_id"]+' >删除</a>';
                href=href+'<a href="edit_source.html?source_id='+tdList[i]["source_id"]+'">编辑</a>';
                
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
  	reset_table:function(pageNum,page_size){
        var param={pagenum:pageNum,pagesize:page_size}
        var search=$('#productSource').find('[data-action="sourcename"]').val()
       $.post('php/product_source.php',{source:param,searchs:search},function(data){
            var data=JSON.parse(data);
            var flag=true;
           var sort_list=['source_id','source_name','address','tel'];
        	var thList=['商品源ID','商品源名称','商品源地址','电话号码','操作'];
            var tabdata={}
            tabdata['pageNum']=pageNum/10+1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productSource .tab').table(tabdata);
            $('#productSource').find('ul.pagination li').not('.disabled').find('a').click(function(){
            	var length= $('#productSource').find('[data-node="length"]').val()
                productSource.reset_table(($(this).attr('data-num')-1)*10,length)
            })
       		$('#productSource').find('[data-node="length"]').change(function(){
	            var length= $('#productSource').find('[data-node="length"]').val();
            	productSource.reset_table(0,length)
         	})
           productSource.delete_data()
        });     
    },
  	search:function(){
        $('#productSource').find('[data-action="search"]').click(function(){	
          	productSource.reset_table(0,10);
        })
   	},
   	delete_data:function(){
         $('#productSource').find('[data-action="delete"]').click(function(e){
             var id=$(this).attr('data-id')
             e.preventDefault();
             productSource.dialog_init(true,$(this));
             $('.yes').click(function(){
                 $.post('php/product_source.php',{source_id:id},function(data){
                     var length= $('#productSource').find('[data-node="length"]').val()
                     productSource.reset_table(0,length);
                 })

             })
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
    }
 }

