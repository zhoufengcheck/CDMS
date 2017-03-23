var feedBack={
 	init_table:function(){  
        var arr=[];
        var param={pagenum:0,pagesize:10};
        $.post('php/feedback.php',{feed:param},function(data){
            var data=JSON.parse(data);
            var page_size=10;
            var flag=true;
            var sort_list=['feed_id','autor','date','feed_content'];
        	var thList=['意见ID','提交者','提交日期','意见内容','操作'];
        	var tabdata={};
            tabdata['pageNum']=1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
            feedBack.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('.tab').table(tabdata);
           $('.contentBox').find('ul.pagination li').not('.disabled').find('a').click(function(){
           	    var length= $('.contentBox').find('[data-node="length"]').val();
                feedBack.reset_table(($(this).attr('data-num')-1)*10,length);
            })
            $('.contentBox').find('[data-node="length"]').change(function(){
           	    var length= $('.contentBox').find('[data-node="length"]').val();
                feedBack.reset_table(0,length);
            })
            feedBack.oper_data()
        });
 	},
 	dialog_init:function(bool,dom){
        $('#myModal').empty();
        if(bool){
          $mess= $('<p>您确定要删除这条信息?</p>')
            $yes=$('<span class="yes">确定</span>');
            $no=$('<span class="no">取消</span>');
            $('#myModal').append($mess);
          	$('#myModal').append($yes);
            $('#myModal').append($no);
        }else{
            $mess= $('<p>删除成功</p>')
            $yes=$('<span class="yes">确定</span>');
            $('#myModal').append($mess);
            $('#myModal').append($yes);
        }
        var modalLocation = dom.attr('data-reveal-id');
        $('#'+modalLocation).reveal(dom.data());
    },
    oper_data:function(){
         $('.contentBox').find('[data-action="delete"]').click(function(e){
             var id=$(this).attr('data-id');
             e.preventDefault();
             feedBack.dialog_init(true,$(this));
             $('.yes').click(function(){
                 $.post('php/feedback.php',{delete_id:id},function(data){
                    var length= $('.contentBox').find('[data-node="length"]').val()
                    feedBack.reset_table(0,length);
                    var modalLocation = "error";
					$('#'+modalLocation).reveal($('#error').data());
                 })

             })
         })
    },
 	setTabData:function(data,thList,tdList,flag,sort_list){
        var _th=[];
        var _td=[];
        for(var i=0;i<thList.length;i++){
            var th ={
                content: thList[i],
                isCenter: "",
                sortName: "display"+i
            }
            _th.push(th);
        }
        for(var i=0;i<tdList.length;i++){
            var td=[];
            for(var j=0;j<sort_list.length;j++) {
                if(sort_list[j] instanceof Array){

                    var content=''
                    for(var d=0;d<sort_list[j].length;d++){
                        content=content+tdList[i][sort_list[j][d]]
                    }
                    var td_opt ={
                        content: content,
                        isCenter: "",
                        isSorting: "sorting",
                        sortName: "display"
                    }
                    td.push(td_opt);
                }else{
                    var td_opt = {
                        content: tdList[i][sort_list[j]],
                        isCenter: "",
                        isSorting: "sorting",
                        sortName: "display"
                    }
                    td.push(td_opt);
                }
            }
            if(flag==true){
                var href='<a href="javascript:;" data-reveal-id="myModal" data-action="delete" data-id='+tdList[i]["feed_id"]+' >删除</a>';
                href=href+'<a href="edit_feed.html?feed_id='+tdList[i]["feed_id"]+'" >编辑</a>';
                
                var hreftd ={
                    content: href,
                    isCenter: "",
                    isSorting: "sorting",
                    sortName: "display"
                }
                td.push(hreftd);
            }

            _td.push(td);
        }
        data['th'] = _th;
        data['td'] = _td;
 	},
 	reset_table:function(pageNum,page_size){
        var param={pagenum:pageNum,pagesize:page_size};       
       	$.post('php/feedback.php',{feed:param},function(data){
            var data=JSON.parse(data);
            var flag=true;
            var sort_list=['feed_id','autor','date','feed_content'];
        	var thList=['意见ID','提交者','提交日期','意见内容','操作'];
            var tabdata={}
            tabdata['pageNum']=pageNum/10+1;//当前页
            tabdata['pageCount'] = page_size;
            tabdata['totalPage'] = data.totalpage==0?1:data.totalpage;
            tabdata['totalShow']='每页显示'+page_size+'条';
            var tdList=[];
             feedBack.setTabData(tabdata,thList,data.arr,flag,sort_list);
            $('.tab').table(tabdata);
             $('.contentBox').find('ul.pagination li').not('.disabled').find('a').click(function(){
           	    var length= $('.contentBox').find('[data-node="length"]').val();
                feedBack.reset_table(($(this).attr('data-num')-1)*10,length);
            })
             $('.contentBox').find('[data-node="length"]').change(function(){
           	    var length= $('.contentBox').find('[data-node="length"]').val();
                feedBack.reset_table(0,length);
            })
             feedBack.oper_data()
        });     
    },
 }
 $(function () {
    $('#wele_user').html("欢迎"+localStorage.getItem("name"))
 	feedBack.init_table();

 });
