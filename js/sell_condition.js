$(function () {
	init_echarts.today_earn();
 });
 var init_echarts={
 	today_earn:function(){
 		$.get('php/today_earn.php',function(data){
 			var dom=$('#today_earn').get(0);
 			var gauge_dom=echarts.init(dom, 'customed');
 			echart.init_gauge(gauge_dom,50);
 		})
 	}
 }
 var echart={
 	init_gauge:function(dom,data){
 		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    toolbox: {
			        feature: {
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    series: [
			        {
			            name: '业务指标',
			            type: 'gauge',
			            detail: {formatter:'{value}%'},
			            data: [{value: data, name: '完成率'}]
			        }
			    ]
			};
		dom.setOption(option);
 	}
 }
