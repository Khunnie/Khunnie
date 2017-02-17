$(function(){
	$(".navtop .f1").click(function(){
		if($(this).data("onoff")){
			$(this).next("ul").hide();
			$(this).data("onoff",false);
		}else{
			$(this).next("ul").show();
			$(this).data("onoff",true);
		}
		
	})
	$(".navtop ul").bind({
		mousemove:function(){
			$(this).show()
		},
		mouseout:function(){
			$(this).hide()
			$(".navtop .f1").data("onoff",false);
		}
	})
	//v榜图片播放
	var n = 0;
	var width = 1200;
	var time = null;
	function play(){
		time = setInterval(function(){
			n++;
			if(n==$(".showimg li").length){
				n=0;
			}
			$(".showimg").animate({
				left:-n*width
			},500);
			$(".PicDot a").removeClass("DOT");
 	    	$(".PicDot a").eq(n).addClass("DOT");
		},2500)
	}
	play();
	$(".VchartL").click(function(){
		clearInterval(time)
		n--;
		if(n==-1){
			n=$(".showimg li").length-1;
		}
		$(".showimg").animate({
			left:-n*width
		},500);
		console.log(n)
		$(".PicDot a").removeClass("DOT");
 	    $(".PicDot a").eq(n).addClass("DOT");
 	    play();
	})
	$(".VchartR").click(function(){
		clearInterval(time)
		n++;
		if(n==$(".showimg li").length){
			n=0;
		}
		$(".showimg").animate({
			left:-n*width
		},500);
		console.log(n)
		$(".PicDot a").removeClass("DOT");
 	    $(".PicDot a").eq(n).addClass("DOT");
 	    play();
	})
	$(".PicDot a").bind({
		mouseover:function(){
			clearInterval(time);
			$(".PicDot a").removeClass("DOT");
     	    $(this).addClass("DOT");
     	    n=$(this).index();
     	   $(".showimg").animate({
				left:-n*width
			},500);
		},
		mouseout:function(){
			play();
		}
	})
	$(".showimg").bind({
		mouseover:function(){
			clearInterval(time);
		},
		mouseout:function(){
			play();
		}
	})
})
