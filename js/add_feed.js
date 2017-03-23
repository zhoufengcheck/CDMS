$(function(){
	$('#wele_user').html("欢迎"+localStorage.getItem("name"))
	var d = new Date();
	var today = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	 $(".form_datetime input").val(today)
	 $(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd",
         autoclose: true,
         startView:"month",
         minView:"month",
         language:  'zh',
    });
    $('.form_datetime').datetimepicker('setStartDate', '2016/01/01');
    $(".form_datetime").datetimepicker("setEndDate",new Date());
	
	if($('#feed_form').attr('data-status')=='edit'){
 		add_feed.form_edit();
	}
			
	 
	$('[data-action="save"]').click(function(){	
	 	var flag=add_feed.submit();
	 	return flag;
	 })
	 $('[data-action="cancel"]').click(function(){
		 location.href = "http://localhost/CDMS/feedback.html";
		 return false;
	 })
    
});
    

var add_feed={
	is_valid:function(value,dom){
		if(value==""){
			dom.siblings('span').removeClass('hide');		
		}else{
			dom.siblings('span').addClass('hide');		
		}
	},
	submit:function(){
		var flag=true;
		var autor=$('#autor').val();
		var dates=$('#date').val();
		var feed_content=$('#feed_content').val();
		add_feed.is_valid(autor,$('#autor'));
		add_feed.is_valid(dates,$('#date'));
		add_feed.is_valid(feed_content,$('#feed_content'));
		if(autor==""||dates==""||feed_content==""){
			flag=false;
		}
		return flag;
	},
	form_edit:function(){
		var feed_id=getQueryString('feed_id');
		$('form').find('[name="feed_id"]').val(feed_id);
		$.post('php/edit_feed.php',{feed_id:feed_id},function(data){		
			var data=JSON.parse(data);
			$('[data-title="feed_name"]').html(data[0].autor);
			$('#autor').val(data[0].autor);
			$('#date').val(data[0].date);
			$('#feed_content').val(data[0].feed_content);
		})
	}
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); 
	return null;
} 
