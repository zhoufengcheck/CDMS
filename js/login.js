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
	 			localStorage.setItem("name",username)
	 			location.href = "http://localhost/CDMS/frontPage/index.html";
	 		}else{
	 			$('.warm').removeClass('hide');
	 		}
	 
	 	});
	})
})