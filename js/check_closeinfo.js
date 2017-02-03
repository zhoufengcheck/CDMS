$(function(){

	check_closeinfo.init_table();
})
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); 
	return null;
} 
var check_closeinfo={
	init_table:function(){
		var close_id=getQueryString('close_id');
       $.post('php/edit_closeinfo.php',{close_id:close_id},function(data){
            var data=JSON.parse(data);
            $('[data-title="close_name"]').html(data[0].close_name);
            console.log(data);
            var sort_list=['close_id','close_name',"source_name","cost_price","sale_price","color","size","classify_name","describle","img_path"];
          	var thList=['名字','信息']
            var tdLeft=['服装ID','服装名称','商品源','进价','建议零售价(元)','颜色','型号','服装类型','服装基本描述',"服装图片"];
            var tabdata={} 
            var tdList=[];
            check_closeinfo.setTabData(tabdata,thList,data[0],sort_list,tdLeft);
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
        console.log(data);
    }
}