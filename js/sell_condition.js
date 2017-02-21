var fontFamily='"PingFang SC","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Microsoft Yahei","微软雅黑",STHeiti,"华文细黑",sans-serif';
$(function () {
	init_echarts.today_earn();
	init_echarts.a_month();
    init_echarts.three_month();
 });
 var init_echarts={
 	today_earn:function(){
 		$.get('php/today_earn.php',function(data){
 			var dom=$('#today_earn').get(0);
 			var gauge_dom=echarts.init(dom, 'customed');
 			echart.init_gauge(gauge_dom,data);
 			
 		})
 	},
 	a_month:function(){
 		$.get('php/a_month.php',function(data){
 			var data=JSON.parse(data);
 			var dom=$('#a_month_list').get(0);
 			var a_month_dom=echarts.init(dom, 'customed');
 			echart.init_single_bar(data,a_month_dom);
 		})
 	},
    three_month:function(){
        $.get('php/three_month.php',function(data){
            var data=JSON.parse(data);
            var dom=$('#three_month_line').get(0);
            var three_month_dom=echarts.init(dom, 'customed');
            echart.init_line(data,three_month_dom);
             three_month_dom.on('click', function (params) {
                alert(1);
            })
        })
    }
 }
 var tab_init={
    init:function(date){
        
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
 	},
 	init_single_bar:function(data,id){
        unit=data.unit||"";
        var option={
            color:['#A9C7CF'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {type : 'shadow'},
                formatter: function (params, ticket, callback) {
            	   return '<span style="background-color:'+option.color[0]+'" class="echart_circle" ></span>'+
                       "名字:"+params[0]['name']+'</br><span style="background-color:'+option.color[0]+'" class="echart_circle" ></span>'+
                       "件数:"+params[0]['data']+unit;
               		 }
            },
            grid: {left: 20, right: 50, bottom:5, top:27,containLabel: true},
            xAxis:  {//x轴
                type: 'value',
                axisLine:{show:false},
                axisTick:{show:false},
                axisLabel:{show:false},
                splitLine:{show:false}
            },
            yAxis: {//yz轴
                type: 'category', 
                data: data.yAxis,
                axisLine:{show:false},
                axisTick:{show:false},
                axisLabel:{
                    margin:7,
                    inside:true,
                    textStyle:{color:'#57768F',fontFamily:fontFamily,fontSize:12} ,
                       formatter:function(value,index) {
                        return  value+'  '+data.data[index]+data.unit
                       }
                }
            },
            series: [
                {
                    name: '售卖数量',
                    type: 'bar',//这个图表的样式
                    label: {normal: {show: false}},
                    itemStyle:{normal:{ barBorderRadius :2}},
                    barGap:6,
                    barWidth:22,
                    data:data.data,
                    z:-1//控制层级
                }
            ]
        }
        id.setOption(option);
    },
    init_line:function(data,id){     
        option = {
            color:['#A9C7CF'],
            tooltip : {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                 return '<span>'+params[0]['name']+'</span></br>'+'<span style="background-color:'+option.color[0]+'" class="echart_circle" ></span>'+
                   "收入:"+params[0]['data']+data.unit;
                 }
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '10%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :data.xAxis,
                    axisTick:{
                        show:true,
                        lineStyle:{
                            color:'#ccc'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    type:'line',
                    areaStyle: {normal: {}},
                    data:data.data
                }
             
            ]
        };
        id.setOption(option);
    }
 }
