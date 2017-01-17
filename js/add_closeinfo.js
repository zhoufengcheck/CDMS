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
	}
}

$(function(){
	 $('.selectpicker').selectpicker({
	        'selectedText': 'cat'
	    });
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
	 	return false;
	 })
	 $('[data-action="cancel"]').click(function(){
	 	location.href = "http://localhost/CDMS/index.html";
	 	return false;
	 })
    Add_close_Info.init_select();
})

