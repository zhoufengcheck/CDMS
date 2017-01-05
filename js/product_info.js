 var productInfo={
 	init_table:function(){
 		var flag=false;
 		var page_size=10;
        var sort_list=['dataBaseName','dataBaseNum'];
        var thList=['服装ID','服装名称','商品源ID','进价','建议零售价','基本材质','操作'];
        var data={}
        data['pageNum']=1;//当前页
        data['pageCount'] = 10;
        data['totalPage'] = 10*5;
        data['totalShow']='每页显示10条';
        var tdList=[];
        this.setTabData(data,thList,tdList,flag,sort_list);
        $('#productInfo .tab').table(data);
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
                if(sort_list[j] instanceof Array){

                    var content=''
                    for(var d=0;d<sort_list[j].length;d++){
                        content=content+tdList[i][sort_list[j][d]]
                    }
                    var td_opt ={
                        content: content,
                        isCenter: "",
                        isSorting: "sorting",
                        sortName: "display"
                    }
                    td.push(td_opt);
                }else{
                    var td_opt = {
                        content: tdList[i][sort_list[j]],
                        isCenter: "",
                        isSorting: "sorting",
                        sortName: "display"
                    }
                    td.push(td_opt);
                }
            }
            if(flag==true){
                var href=_content = '<a href="javascript:;" data-total="'+tdList[i]["dataBaseNum"]+'" data-name="'+tdList[i]["dataBaseName"]+'" data-action="dialogShow" data-id='+tdList[i]["dbsizeid"]+' >查看</a>'
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
 	}
 }
 $(function () {
 	productInfo.init_table();
 	productSource.init_table();
    $('#select').chosen({
        width:"150px",
        disable_search:true
    });

 });