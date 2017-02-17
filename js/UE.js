$(function(){
	var len =$(".citemimg li").length;
	var m = 0;//下标
	var iwidth = 580;
	var time = null;
	var onoff = false;
	var list = $("#move");
	function play(){
		time = setInterval(function(){
			m++;
			if(m>len-1){
				m=1;
			}
			$(".citemimg")[0].style.transition="1s";
			$(".citemimg")[0].style.left= -m*iwidth+"px";
			
		},1500)
	}
	play();
	$(".citemimg")[0].addEventListener("webkitTransitionEnd",function(){
		if(m>=len-1){   //如果记录值大于等于最后一张的时候，停掉动画，马上拉到第一张
			$(".citemimg")[0].style.transition="none";
			$(".citemimg")[0].style.left=0;
			m=0;
		}
		onoff = false;
	});
})