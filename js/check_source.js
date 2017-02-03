$(function(){
	check_source.init_table();
})
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); 
	return null;
} 
var check_source={
	init_table:function(){
		var source_id=getQueryString('source_id');
       $.post('php/edit_source.php',{source_id:source_id},function(data){
            var data=JSON.parse(data);
            $('[data-title="source_name"]').html(data[0].source_name);
            console.log(data);
            var sort_list=['source_id','source_name',"address","tel"];
          	var thList=['名字','信息']
            var tdLeft=['商品源ID','商品源名称','商品源地址','电话号码'];
            var tabdata={} 
            var tdList=[];
            check_source.setTabData(tabdata,thList,data[0],sort_list,tdLeft);
            $('.tab').table(tabdata);

          
        });
	},
	setTabData:function(data,thList,tdList,sort_list,tdLeft){
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
        for(var i=0;i<tdLeft.length;i++){
        	var td=[];
        	var content;
        	var thleft ={
                content: tdLeft[i],
                isCenter: "",
                sortName: "display"+i
            };
            if(tdLeft[i]=="服装图片"){           	
            	var content='<img src="./image/'+tdList[sort_list[i]]+'" width="200",height="180"/>';
            }else{
            	var content=tdList[sort_list[i]];
            }
            var tddata={
            	content: content,
                isCenter: "",
                sortName: "display"+i
            };
            td.push(thleft);
            td.push(tddata);
            _td.push(td);
        }
       
        data['th'] = _th;
        data['td'] = _td;
    }
}