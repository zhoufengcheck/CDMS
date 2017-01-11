 var productInfo={
 	init_table:function(){
        var param={pagenum:0,pagesize:10};
        $.post('php/product_info.php',{name:param},function(data){
            
            var data=JSON.parse(JSON.parse(data))
            // console.log(data);
            var flag=true;
            var page_size=10;
            var sort_list=['close_id','close_name',"source_id","cost_price","sale_price","color","size"];
            var thList=['服装ID','服装名称','商品源ID','进价','建议零售价','颜色','型号','操作'];
            var tabdata={}
            tabdata['pageNum']=1;//当前页
            tabdata['pageCount'] = 10;
            tabdata['totalPage'] = data.totalpage;
            tabdata['totalShow']='每页显示10条';
            var tdList=[];
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productInfo .tab').table(tabdata);
            $('ul.pagination li').not('.disabled').find('a').click(function(){
                // console.log($(this).attr('data-num'))
                // console.log($('[data-node="length"]').val(),$(this).attr('data-num'))
                productInfo.reset_table(($(this).attr('data-num')-1)*10,10)
            })
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
                var href='<a href="javascript:;" data-total="'+tdList[i]["dataBaseNum"]+'" data-name="'+tdList[i]["dataBaseName"]+'" data-action="dialogShow" data-id='+tdList[i]["dbsizeid"]+' >查看</a>';
                href=href+'<a href="javascript:;" data-total="'+tdList[i]["dataBaseNum"]+'" data-name="'+tdList[i]["dataBaseName"]+'" data-action="dialogShow" data-id='+tdList[i]["dbsizeid"]+' >删除</a>';
                href=href+'<a href="javascript:;" data-total="'+tdList[i]["dataBaseNum"]+'" data-name="'+tdList[i]["dataBaseName"]+'" data-action="dialogShow" data-id='+tdList[i]["dbsizeid"]+' >编辑</a>';
                
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
        console.log(pageNum)
         var param={pagenum:pageNum,pagesize:page_size};
       $.post('php/product_info.php',{name:param},function(data){
            // console.log(data);
             var data=JSON.parse(JSON.parse(data))
             console.log(data);
            var flag=true;
            var page_size=10;
            var sort_list=['close_id','close_name',"source_id","cost_price","sale_price","color","size"];
            var thList=['服装ID','服装名称','商品源ID','进价','建议零售价','颜色','型号','操作'];
            var tabdata={}
            tabdata['pageNum']=pageNum/10+1;//当前页
            tabdata['pageCount'] = 10;
            tabdata['totalPage'] = data.totalpage;
            tabdata['totalShow']='每页显示10条';
            var tdList=[];
            productInfo.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('#productInfo .tab').table(tabdata);
            $('ul.pagination li').not('.disabled').find('a').click(function(){
              
                productInfo.reset_table(($(this).attr('data-num')-1)*10,10)
            })
        });     
    }
        
 }

 $(function () {
 	productInfo.init_table();
 	productSource.init_table();
    $('.select').chosen({
        width:"150px",
        disable_search:true
    });

 });