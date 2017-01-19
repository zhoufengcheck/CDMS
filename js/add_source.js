$(function(){
	if($('#source_form').attr('data-status')=='edit'){
 		add_source.form_edit();
	 }
	$('[data-action="save"]').click(function(){	
	 	var flag=add_source.submit();
	 	return flag;
	 })
	 $('[data-action="cancel"]').click(function(){
		 location.href = "http://localhost/CDMS/index.html";
		 return false;
	 })
    
});
    

var add_source={
	is_valid:function(value,dom){
		if(value==""){
			dom.siblings('span').removeClass('hide');		
		}else{
			dom.siblings('span').addClass('hide');		
		}
	},
	submit:function(){
		var flag=true;
		var source_name=$('#source_name').val();
		var address=$('#address').val();
		var tel=$('#tel').val();
		add_source.is_valid(source_name,$('#source_name'));
		add_source.is_valid(address,$('#address'));
		add_source.is_valid(tel,$('#tel'));
		if(source_name==""||address==""||tel==""){
			flag=false;
		}
		return flag;
	},
	form_edit:function(){
		var source_id=getQueryString('source_id');
		$('form').find('[name="source_id"]').val(source_id);
		$.post('php/edit_source.php',{source_id:source_id},function(data){
			var data=JSON.parse(data);
			$('#source_name').val(data[0].source_name);
			$('#address').val(data[0].address);
			$('#tel').val(data[0].tel);
		})
	}
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); 
	return null;
} 