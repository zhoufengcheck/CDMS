var Add_close_Info={
	add_info:function(){
		var info={};
		info['close_name']=$('#close_name').val();
		info['source_id']=$('#source_id').val();
		info['close_price']=$('#close_price').val();
		info['sale_price']=$('#sale_price').val();
		info['close_price']=$('#close_price').val();
		info['color']=$('#color').val();
		info['size']=$('#size').val();
		info['describle']=$('#describle').val();
		info['classify_id']=$('#classify_id').val();
		info['img_path']=$('#img_path').val();
	},
	init_select:function(){
		$.get('php/add_closeinfo.php',function(data){
			var data=JSON.parse(data);
			console.log(data)
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

    Add_close_Info.init_select();
})

