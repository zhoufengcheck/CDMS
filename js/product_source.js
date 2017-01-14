 var productSource={
 	init_table:function(){
        var param={pagenum:0,pagesize:10};
        $.post('php/product_source.php',{source:param,searchs:""},function(data){
            var data=JSON.parse(data);
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
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productSource .tab').table(tabdata);
//          $('ul.pagination li').not('.disabled').find('a').click(function(){
//              productInfo.reset_table(($(this).attr('data-num')-1)*10,$('[data-node="length"]').val())
//          })
//          $('[data-node="length"]').change(function(){
//              productInfo.reset_table(0,$('[data-node="length"]').val())
//          })
//          productInfo.delete_data()
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
//          $('ul.pagination li').not('.disabled').find('a').click(function(){
//              productInfo.reset_table(($(this).attr('data-num')-1)*10,$('[data-node="length"]').val())
//          })
//         $('[data-node="length"]').change(function(){
//             productInfo.reset_table(0,$('[data-node="length"]').val())
//         })
//         productInfo.delete_data()
        });     
    },
  	search:function(){
        $('#productSource').find('[data-action="search"]').click(function(){	
          	productSource.reset_table(0,10);
        })
    }
 }

