$(function(){
	$('#login').click(function(){
		var username=$('#username').val()
		var pwd=$('#pwd').val()
		var param={user_name:username,pwd:pwd}
		$.post('php/login.php',{name:param},function(data){
	 		data=JSON.parse(data)
	 		if(data.length==1){
	 			$('.warm').addClass('hide');
	 			$('#login').attr("href","http://localhost/CDMS/index.html")
	 			location.href = "http://localhost/CDMS/index.html?username="+username;
	 			// location.href = "NewList.aspx?pagenum="+pn
	 		}else{
	 			$('.warm').removeClass('hide');
	 		}
	 
	 	});
	})
})