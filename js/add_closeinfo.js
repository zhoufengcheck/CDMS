
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); 
	return null;
} 
var Add_close_Info={
	is_valid:function(value,dom){
		if(value==""){
			dom.siblings('span').removeClass('hide');		
		}else{
			dom.siblings('span').addClass('hide');		
		}
	},
	form_test:function(){
		var flag=true;
		var close_name=$('#close_name').val();
		var color=$('#color').val()
		var describle=$('#describle').val()
		var file=$('#file').val()
		var cost_price=$('#cost_price').val()
		var sale_price=$('#sale_price').val()	
		Add_close_Info.is_valid(close_name,$('#close_name'));
		Add_close_Info.is_valid(color,$('#color'));
		Add_close_Info.is_valid(describle,$('#describle'));
		Add_close_Info.is_valid(cost_price,$('#cost_price'));
		Add_close_Info.is_valid(file,$('#file'));
		Add_close_Info.is_valid(describle,$('#describle'));
		Add_close_Info.is_valid(sale_price,$('#sale_price'));

		if(close_name==""||color==""||describle==""||file==""||cost_price==""||sale_price==""){
			flag=false;
		}

		return flag;
	},
	init_select:function(){
		$.post('php/add_closeinfo.php',{flag:"1"},function(data){
			var data=JSON.parse(data);
			var option_source=""
			var option_classify=""
			for(var i=0;i<data.arrs_source.length;i++){
				option_source=option_source+'<option label="'+data.arrs_source[i]["source_name"]+'" value="'+data.arrs_source[i]["source_id"]+'">'+data.arrs_source[i]["source_name"]+'</option>'
			}
			for(var i=0;i<data.arrs_classify.length;i++){
				option_classify=option_classify+'<option label="'+data.arrs_classify[i]["classify_name"]+'" value="'+data.arrs_classify[i]["classify_id"]+'">'+data.arrs_classify[i]["classify_name"]+'</option>'
			}
			$('[data-action="source-select"]').html(option_source);
			$('[data-action="classify-select"]').html(option_classify);
			
			$('[data-action="source-select"]').chosen({
		        width:"150px"
		    });
		    $('[data-action="classify-select"]').chosen({
		        width:"130px"
		    });
		})
	},
	//主要用于编辑信息是使用
	form_edit:function(){
		var close_id=getQueryString('close_id');
		$.post('php/edit_closeinfo.php',{close_id:close_id},function(data){
			var data=JSON.parse(data);
			var size= new Array(); //定义一数组
			size=data[0].size.split(",") 

			console.log(data)
			console.log(size)
			$('#close_name').val(data[0].close_name);
			$('#cost_price').val(data[0].cost_price);
			$('#sale_price').val(data[0].sale_price);
			$('#color').val(data[0].color);
			$('#describle').val(data[0].describle);
			// for(var i=0;i<size.length;i++){
			// 	$('#id_select>option:eq('+i+')').attr("selected",'true');
			// }

			$('#id_select>option:eq(0)').get(0).selected=true;
		})
	}
}

$(function(){
	 Add_close_Info.init_select();
	 $('.selectpicker').selectpicker({
	        'selectedText': 'cat'
	  });
	  if($('#close_form').attr('data-status')=="edit"){
	 	Add_close_Info.form_edit();
	 }
	 $('[data-action="save"]').click(function(){
		 	var flag=Add_close_Info.form_test();
		   	_im        	 = document.getElementById('imghead'),
	         im          = document.createElement('img');
	         im.src      = _im.src,
	         real_width  = im.width,
	         real_height = im.height;
	     	if(real_width>1000||real_height>1000){
	     		$('#imghead').parent().siblings('span').html('图片尺寸太大').removeClass('hide');
	     	}else{
	     		$('#imghead').parent().siblings('span').html('请上传服装图片').addClass('hide');
	     	}
	     	console.log($('#id_select').val());
		 	return true;
	 })
	 $('[data-action="cancel"]').click(function(){
		 location.href = "http://localhost/CDMS/index.html";
		 return false;
	 })
    

})

