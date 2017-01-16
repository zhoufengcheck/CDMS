var Add_close_Info={
	form_test:function(){
		var flag=true;
		var close_name=$('#close_name').val();
		var source_id=$('#source_id').val()
		var source_id=$('#source_id').val()
		var color=$('#color').val()
		if(close_name==""){
			$('#close_name').siblings('span').removeClass('hide');
			flag=false;			
		}
		if(source_id==""){
			$('#source_id').siblings('span').removeClass('hide');
			flag=false;	
		}
		if(color==""){
			$('#color').siblings('span').removeClass('hide');
			flag=false;	
		}
		return flag;
	},
	init_select:function(){
		$.post('php/add_closeinfo.php',{flag:"1"},function(data){
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
	 $('.selectpicker').selectpicker({
	        'selectedText': 'cat'
	    });
	 $('[data-action="save"]').click(function(){
	 	var flag=Add_close_Info.form_test();
	 	return flag;
	 })
    Add_close_Info.init_select();
})

