$(function () {
	init_echarts.today_earn();
 });
 var init_echarts={
 	today_earn:function(){
 		$.get('php/today_earn.php',function(data){
 			console.log(data);
 			var dom=$('#today_earn').get(0);
 			var gauge_dom=echarts.init(dom, 'customed');
 			echart.init_gauge(gauge_dom,data);
 			
 		})
 	}
 }
 var echart={
 	init_gauge:function(dom,data){
 		var name="";
 		if(data>=600&&data<=1000){
 			name="收入良好"
 		}else if(data<600){
 			name="收入不好"
 		}else{
 			name="收入好"
 		}
 		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    series: [
			        {
			        	max:1000,
			            name: '业务指标',
			            type: 'gauge',
			            detail: {formatter:'{value}元'},
			            data: [{value: data, name: name}],
			            title:{
			            	offsetCenter: [0, '70%'],
			            	textStyle:{
			            		color:'red',
			            		fontSize:20
			            	}
			            },
			            pointer:{
			            	width:5,
			            	length:'30%'
			            }
			        }
			    ]
			};
		dom.setOption(option);
 	}
 }
