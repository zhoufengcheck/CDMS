
(function($) {

/*---------------------------
 Defaults for Reveal
----------------------------*/
	 
/*---------------------------
 Listener for data-reveal-id attributes
----------------------------*/


/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.reveal = function(options) {
    	 //火狐阻止页面滚动
        if(document.addEventListener){
           document.addEventListener('DOMMouseScroll',scrollFunc,false);
        } //谷歌阻止页面滚动
        document.body.onmousewheel = function(){return false;}
        
        
        var defaults = {  
	    	animation: 'none', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'yes' //close-reveal-modal the class of a button or element that will close an open modal
    	}; 
    	
        //Extend dem' options
        var options = $.extend({}, defaults, options); 
	
        return this.each(function() {
        
/*---------------------------
 Global Variables
----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = $('.reveal-modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
			}		    
     
/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
			  modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": $(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible'});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('reveal:open');
			}); 	

			//Closing Animation
			modal.bind('reveal:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('reveal:close');
			});     
   	
/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        	//Open Modal Immediately
    	modal.trigger('reveal:open')

            	//Close Modal Listeners

            $('.yes').click(function(){
                modal.trigger('reveal:close');
                modal.off()         
				 //谷歌开启页面滚动
				document.body.onmousewheel = function(){return true;}
				//火狐开启页面滚动
				if(document.addEventListener){
				  document.removeEventListener('DOMMouseScroll', scrollFunc, false);
				}
            })
            $('.no').click(function(){
                modal.trigger('reveal:close');
                 modal.off()
                  //谷歌开启页面滚动
				document.body.onmousewheel = function(){return true;}
				//火狐开启页面滚动
				if(document.addEventListener){
				  document.removeEventListener('DOMMouseScroll', scrollFunc, false);
				}
            })
             $('.closebtn').click(function(){
                modal.trigger('reveal:close');
                 modal.off()
                  //谷歌开启页面滚动
				document.body.onmousewheel = function(){return true;}
				//火狐开启页面滚动
				if(document.addEventListener){
				  document.removeEventListener('DOMMouseScroll', scrollFunc, false);
				}
            })
			
			
/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
        });//each call
    }//orbit plugin call
})(jQuery);
function scrollFunc(e){
        e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{
            return false;
        }
    }

