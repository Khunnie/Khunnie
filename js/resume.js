$(function(){
	function mousewheel(obj,upFn,downFn){//整屏切换
		onoff = true;
		obj.onmousewheel = fn;
		if(obj.addEventListener){
			obj.addEventListener("DOMMouseScroll",fn,false);
		}
		function fn(ev){
			var e = ev || event;
			var direction = true;
			if( e.wheelDelta ){ //chrome
				direction = e.wheelDelta > 0 ? true : false;
			}else{  //FF
				direction = e.detail < 0 ? true : false;
			}
			if( direction ){  //向上
				typeof upFn === "function" && onoff && upFn(e);
			}else{ //向下
				typeof downFn === "function" && onoff && downFn(e);
			}

			if(e.preventDefault){
				e.preventDefault();  //ie低版本不兼容
			}

			return false;
		}	
	}
	var S = 0;
	var H = $(window).height();
	var Bigbox = document.getElementById("Title");
	var Section = Bigbox.getElementsByTagName("section");
	var Hash =window.location.hash.split("=")[1] || "index";
	$("#Title section").css("height",H)
	mousewheel($("#Title")[0],function(){
		onoff=false;
		S--; 
		if(S<=0){
			S=0;
		}
		if(S!=1){
			if(Btns[0].className!="active"){
				
				qiehuan()
			}
		}		
		if(S!=2){
			picgame();
		}
		console.log(S)
		$("#Title").animate({top:-S*H},
		function(){
			onoff=true;
		})
	},function(){
		onoff=false;
		S++;
		if(S!=1){
			if(Btns[0].className!="active"){
				qiehuan()
			}
		}
		
		if(S!=2){
			picgame();
		}
		if(S==3){
			for(var i=0;i<Photos.length;i++){
				Photos[i].style.cssText = "transform: translateX("+(i-2)*150+"px) translateY("+(i-2)*50+"px) rotateX(-5deg) rotateY(15deg) scale("+(1+(i-2)*0.1)+");opacity: "+(1+(i-4)*0.2)+";"
			}
		}
		if(masking.innerHTML==""){
			if(S==4){
				print()
				
			}
		}
					
		if(S>=Section.length-1){
			S=Section.length-1
		}
//		console.log(S)
		$("#Title").animate({top:-S*H},
		function(){
			onoff=true;
		})

	})
	for(var i = 0;i<Section.length;i++){
		$("#navs div").click(function(){
			var hash = this.dataset.hash;
			window.location.hash = hash;
			S=$(this).index();
			$("#Title").animate({top:-S*H})
			if(S!=1){
				if(Btns[0].className!="active"){
					qiehuan()
				}
			}
			if(S!=2){
				picgame()
			}
//			$("#navs .two").eq($("#navs .navlist").index(this)).css("bottom","0")
		})
	}
	$("#navs").attr("onoff",false)//第一屏的图片自动播放
	var time = null;
	$("#navtext").click(function(){	
		if($("#navs").attr("onoff")==="false"){
			$("#navs")[0].style.right="0px";
			$("#navs").attr("onoff",true)
			
		}else{
			$("#navs")[0].style.right="-500px";
			$("#navs").attr("onoff",false)
		}
	})
	
	$("#navs .navlist").bind({
		mousemove:function(){
			$("#navs .two").eq($("#navs .navlist").index(this)).css("bottom","0")
		},
		mouseout:function(){
			$("#navs .two").eq($("#navs .navlist").index(this)).css("bottom","-45px")
		}
	})
	var n =0;
		
	$("#select").bind({
		mousemove:function(){
			$("#select").css("opacity","0.5")
		},
		mouseout:function(){
			$("#select").css("opacity","1")
		},
		click:function(){
			S=1;
			$("#Title").animate({top:-S*H})
		}
	})

	var WC=document.getElementById("welcome");
	var start = null;
	var w = 180;
	window.onload=function(){
		start = setInterval(function(){
			w++;
			WC.style.top=w+"px";
			if(w==200){
				WC.style.top="200px";
				clearInterval(start)
			}
		},10)
	}

	var Icoleft1 = $(".ball1").position().left;//第一屏的图标移动
	var Icotop1 = $(".ball1").position().top;
	var Icoleft2 = $(".ball2").position().left;
	var Icotop2 = $(".ball2").position().top;
	var Icoleft3 = $(".ball3").position().left;
	var Icotop3 = $(".ball3").position().top;
	var time = null;
	$(document).mousemove(function(ev){
		var X = ev.pageX - $(window).width()/2;
		var Y = ev.pageY - $(window).height()/2;
			$(".ball1").css({
				left:Icoleft1-X*0.09,
				top:Icotop1 +Y*0.05
			})
			$(".ball2").css({
				left:Icoleft2 -X*0.15,
				top:Icotop2 +Y*0.05
			})
			$(".ball3").css({
				left:Icoleft3 -X*0.05,
				top:Icotop3 +Y*0.10
			})
	})

	var Navtime = document.getElementById("navtime");//时间
	var Lis = Navtime.getElementsByTagName("li");
	function addZero(t){
		if(t<10){
			return "0"+t;
		}else{
			return t
		}
	}
	function getTimes(){
		var Data = new Date();//时间
		var H = Data.getHours();
		var M = Data.getMinutes();
		var S = Data.getSeconds();
		var str = addZero(H)+":"+addZero(M)+":"+addZero(S);
		return str;
	}
	var curTimes = "";
	setTime();
	setInterval(function(){
		setTime();
	},1000)
	function setTime(){
		var times = getTimes();
		for(var i=0;i<Lis.length;i++){
			if(times.charAt(i)===":"){
				Lis[i].innerHTML=":";
			}else{
				Lis[i].innerHTML=times.charAt(i)
			}
		}
		curTimes = times;
	}
	function qiehuan(){
		this.index=0;
		Btns[iNow].className="";
		tab(iNow,this.index);
		iNow=this.index;
		Btns[iNow].className="active";
	}
	var Center = document.getElementById("center");//点击切换3D内页的按钮
	var aLis = Center.children;
	var Btns = document.getElementById("btn").children;
	var iZ = $(document).width()/2;
	var iNow = 0;
	Center.style.WebkitTransformOrigin="center center "+iZ+"px";
	$(window).resize(function(){
		iZ=$(document).width()/2;
		Center.style.WebkitTransformOrigin="center center "+iZ+"px";
	})
	for(var i =0;i<Btns.length;i++){
		Btns[i].index=i;
		Btns[i].onclick=function(){
			if(iNow==this.index){
				return;
			}
			Btns[iNow].className="";
			tab(iNow,this.index);
			iNow=this.index;
			Btns[iNow].className="active";
		}
		
	}
	function tab(iOld,iNow){//3D内页
		Center.style.transition=".5s";
		Center.addEventListener("webkitTransitionEnd",end,false);
		if(iOld>iNow){
			aLis[iNow].className="prev";
			Center.style.WebkitTransform="rotateY(-90deg)";
		}else{
			aLis[iNow].className="next";
			Center.style.WebkitTransform="rotateY(90deg)";
		}
		function end(){
			aLis[iOld].className="";
			Center.style.transition="none";
			aLis[iNow].className="active";
			Center.style.WebkitTransform="rotateY(0deg)";
		}
	}
	
	function getStyle( obj,attr ){
		if( obj.currentStyle ){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}
	}
	function doMove(obj,attr,target,speed,callBack){
		var cur = parseInt( getStyle(obj,attr) );
		speed = cur < target ? Math.abs(speed) : -Math.abs(speed);
		clearInterval(obj.timer);  //先清除，在开启
		obj.timer = setInterval(function (){
			cur += speed;
			if(  cur >= target && speed > 0 ||  cur <= target && speed < 0){
				clearInterval(obj.timer);
				obj.timer = null;
				cur = target;
				obj.style[attr] = cur + "PX";	
				typeof callBack === "function" &&　callBack();
				}else{
					obj.style[attr] = cur + "PX";	
				}
		
				
			},30);
		};
	function shake(obj,attr,speed,callBack){
		//如果这个元素身上已经有定时器开着，那么下面代码就不执行了
		if( obj.timer ) return;
		var cur = parseInt(getStyle(obj,attr)); //找到元素的起始位置
		var arr = [];
		for( var i = speed; i > 0 ; i-=3 ){
			arr.push(-i,i);
		}
		arr.push(0);
		var n = 0;
		obj.timer = setInterval(function (){
			obj.style[attr] = arr[n]+cur + "px";
			n++;
			if( n >= arr.length ){
				clearInterval(obj.timer);
				obj.timer = null;
				if(typeof callBack === "function"){
					callBack();
				}
			}
		},30)	
	}
	function picgame(){
		clearInterval(Pic.timer);
		Pic.timer = null;
		Pic.style.display="none";
		SF = 0;
		DF = 0;
		Ap[0].innerHTML="得分："+ 0 +" 分";
		Ap[1].innerHTML="失分："+ 0 +" 分";
		Btn.disabled=false;
		Pic.style.top = 0;
	}
	var Btn = $("#btngame")[0];//点击
	var Pic = $("#img1")[0];//图片
	var Box = $("#float")[0];
	var Point = $("#fraction")[0];
	var Ap = $("p",Point);//得分失分
	var speed = 1;//速度
	var SF = 0;//失分
	var DF = 0;//得分
	Btn.onclick = function(){//点击按钮
		
		Btn.disabled=true;
		Pic.style.display="block";
		speed=1;
		game();
		return false;
	}
	Pic.onmousedown = function (){
		if( this.onOff ) return;
		this.onOff = true;
		clearInterval(Pic.timer);
		Pic.timer = null;
		Pic.src = "img/img6.gif";
		DF++;
		Ap[0].innerHTML = "得分："+DF+" 分";
		shake(this,"left",10,function (){
			Pic.onOff = false;
			Pic.style.top = 0;
			if(Win()){
				game()
			}
			
		})	
	};
	function Bonus(){//失分
		if( SF >= 5 ){
			Pic.style.display="none";
			alert("您输了！！");
			SF = 0;
			DF = 0;
			Ap[0].innerHTML="得分："+ 0 +" 分";
			Ap[1].innerHTML="失分："+ 0 +" 分";
			Btn.disabled=false;
//			return false;
		}
		
		return true;	
	}
	function Win(){
		if( DF >= 20 ){
			Pic.style.display="none";
			alert("恭喜您过关");
			SF = 0;
			DF = 0;
			Ap[0].innerHTML="得分："+ 0 +" 分";
			Ap[1].innerHTML="失分："+ 0 +" 分";
			Btn.disabled=false;
			clearInterval(Pic.timer);
			Pic.timer = null;
			return false;
		}
		return true;
	}
	function game(){//掉落
		Pic.style.left = Math.floor(Math.random()*580)+"px";
		Pic.src = "img/img"+(Math.round(Math.random()*4) + 1) +".gif";
		speed+=0.2;
		doMove(Pic,"top",340,speed,function(){
			shake(Box,"top",10,function(){
				SF++;
				Ap[1].innerHTML="失分："+ SF +" 分";
				Pic.style.top=0;
				if(Bonus()){
					game();
				}
				return false;
			})
		})
	}

	//第四屏的照片墙
	
	var Photo = $("#photo");
	var Photos = $("#photo div");
	var iTimer = null;
	for(var i=0;i<Photos.length;i++){
		Photos[i].index=i;
		Photos[i].onclick = function(){
			var k = Photos.length-1;//最后一张
			clearInterval(iTimer)
			var iNow = this.index//当前这一张
			iTimer = setInterval(function(){
				Photos[iNow].style.cssText = "transform: translateX("+(k-2)*150+"px) translateY("+(k-2)*50+"px) rotateX(-5deg) rotateY(15deg) scale("+(1+(k-2)*0.1)+");opacity: "+(1+(k-4)*0.2)+";"
				k--;
				if(k<0){
					clearInterval(iTimer);
				}
				iNow--;
				iNow = iNow<0?Photos.length-1:iNow;
				
			},100)
			
		}
	}	
			
			
		
	
	
	
	
//	function testPengzhuang( obj1,obj2 ){
//		var obj1W = obj1.offsetWidth;
//		var obj1H = obj1.offsetHeight;
//		var obj1L = obj1.offsetLeft;
//		var obj1T = obj1.offsetTop;
//
//		var obj2W = obj2.offsetWidth;
//		var obj2H = obj2.offsetHeight;
//		var obj2L = obj2.offsetLeft;
//		var obj2T = obj2.offsetTop;
//		//碰上返回true 否则返回false
//		if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
//			return true
//		}else{
//			false;
//		}
//
//	}
//	var Photo = document.getElementById("photo");
//	var arrphoto = ["img/miao7.jpg","img/miao2.jpg","img/miao3.jpg","img/miao4.jpg","img/miao5.jpg","img/miao6.jpg","img/miao1.jpg","img/miao8.jpg","img/miao9.jpg","img/miao10.jpg","img/miao11.jpg","img/miao12.jpg"]
//	var Number = "";
//	var photolt = [];
//	for(var i = 0;i<12;i++){
//		photoL=(i % 6)*210;
//		photoT=Math.floor(i/6)*210;
//		Number += "<li style='background:url("+ arrphoto[i % 12]+");top:"+ photoT +"px; left:"+ photoL +"px'></li>";
//	}
//	Photo.innerHTML = Number;
//	var arrLeftTop = [];
//
//	var Photol = Photo.children;
//	for(var i = 0;i<Photol.length;i++){
//		Photol[i].style.backgroundSize="100% 100%";
//	}
//	Photo.addEventListener("transitionend",function (ev){
//		ev.target.style.transition = 'none';
//		
//	},false);
//
//	var arrLeftTop = [];
//
//	for( var i = 0; i <Photol.length; i++ ){
//		arrLeftTop.push(
//			{
//				left:Photol[i].offsetLeft,
//				top:Photol[i].offsetTop
//			}
//		);
//	};
//
//	for( var j = 0; j < arrLeftTop.length; j++ ){
//		Photol[j].index = j;
//		Photol[j].style.left = arrLeftTop[j].left + 'px';
//		Photol[j].style.top = arrLeftTop[j].top + 'px';
//		Photol[j].style.margin = 0;
//	};
//		var ZIndex = 1;
//	Photo.onmousedown = function (ev){
//			var target = ev.target;
//			ZIndex++; // 提高层级
//			if( target.nodeName === "LI" ){
//				target.style.zIndex = ZIndex;  //提高层级
//				console.log(ZIndex)
//				target.style.transition = 'none';
//				var disX = ev.clientX - target.offsetLeft;
//				var disY = ev.clientY - target.offsetTop;
//
//				var arr = [],max = +Infinity,index = 0,
//					rockObj = null;  //存的是被碰撞的元素
//
//				document.onmousemove = function (ev){
//					max = +Infinity,index = 0;
//					arr.length = 0;  //还是操作以前的数组，并没有生成新的数组
//					target.style.left = ev.clientX - disX + "px";
//					target.style.top = ev.clientY - disY + "px";
//
//					for( var i = 0; i < Photol.length; i++ ){
//						//排除掉自己
//						if(Photol[i] !== target){
//							Photol[i].style.border = 'none';
//							Photol[i].style.margin = '0';
//							if(testPengzhuang(target,Photol[i])){ //target和listLi[i]碰到了 那么就放在数组中
//								arr.push(Photol[i])
//							}
//						
//						}
//					};
//
//					for( var j = 0; j < arr.length; j++ ){
//						var l = (target.offsetLeft+target.offsetWidth/2) - (arr[j].offsetLeft+arr[j].offsetWidth/2);
//						var t = (target.offsetTop+target.offsetHeight/2) - (arr[j].offsetTop+arr[j].offsetHeight/2);
//						var z = l*l + t * t;
//						if( max > z ){
//							max = z;
//							index = j;
//						}
//					}
//
//					if( arr[index] ){
//						arr[index].style.border = '1px solid yellow';
//						arr[index].style.margin = '-1px';
//					}
//
//					rockObj = arr[index];
//
//					if( ev.preventDefault ){
//						ev.preventDefault();
//					}
//
//					//return false;
//				};
//				document.onmouseup = function (ev){
//					document.onmousemove = document.onmouseup = null;
//
//					target.style.transition = 'left 1s,top 1s';
//					
//
//					if( rockObj ){  //碰上了交换位置
//						rockObj.style.transition = 'left 1s,top 1s';
//
//						target.style.left = arrLeftTop[rockObj.index].left+'px';
//						target.style.top = arrLeftTop[rockObj.index].top+'px';
//						rockObj.style.left = arrLeftTop[target.index].left+'px';
//						rockObj.style.top = arrLeftTop[target.index].top+'px';
//
//						rockObj.style.border = '0';
//
//
//
//						//交换位置之后 交换索引值
//
//						rockObj.index = [target.index,target.index = rockObj.index][0];
//
//					}else{
//						target.style.left = arrLeftTop[target.index].left+'px';
//						target.style.top = arrLeftTop[target.index].top+'px';
//					}
//
//
//				};
//
//
//			}
//		};

	
	var Person = document.getElementById("personal");//打字机
	var masking = document.getElementById("marking");
	var Typetext = document.getElementById("type");
	var Text = 0;
	var timer = null;
	var t = Typetext.innerHTML;
	Person.onclick = function(){
		
	}
	function print(){
		if(timer){
			return
		}
		timer = setInterval(function(){
			masking.innerHTML+=t.charAt(Text)+" ";
			Typetext.innerHTML=t.substring(Text+1);
			Text++;
			if(Text==t.length){
				clearInterval(timer);
				Text=0;
				timer=null;
			}
		},90)
	}
//	var Div = $("#accordion").children()//第五屏的切换图片
//	var W =Math.floor(($("#accordion").width()-350)/4) +"px";
//	$("#accordion div").mouseover(function(){
//		for(var i= 0;i<Div.length;i++){
//			Div[i].style.width=W;
//		}
//		this.style.width=350+"px";
//	})
//	$("#accordion div").mouseout(function(){
//		$("#accordion div").css("width","150px");
//	})
//	var LIpic = $("#rotate li");
//	var arr1 =[];
//	for(var i = 0 ;i<LIpic.length;i++){
//		arr1[i]={left:getStyle(LIpic[i],"left"),scale:getStyle(LIpic[i],"-webkit-transform"),zIndex:getStyle(LIpic[i],"z-index")}
//	}
//	$("#last").click(function(){
//		arr1.unshift(arr1.pop());
//		tostyle();
//	})
//	$("#first").click(function(){
//		arr1.push(arr1.shift());
//		tostyle()
//	})
//	function tostyle(){
//		for(var i =0;i<LIpic.length;i++){
//			LIpic[i].style.left=arr1[i].left;
//			LIpic[i].style.WebkitTransform=arr1[i].scale;	
//			LIpic[i].style.zIndex=arr1[i].zIndex;	
//		}
//	}
	var Rotate = document.getElementById("name")//倒影
	var Mask = document.getElementById("mask");
	var oXy=getXy(Mask);
	Mask.onmousemove=function(ev)
	{  
		var Y = oXy.y-(4*$(window).height())
		var iX=ev.clientX-oXy.x;
		var iY=ev.clientY-Y;
		Mask.style.WebkitMaskPosition=(iX-100)+"px "+(iY-100)+"px"
	};
	function getXy(obj)
	{
		var iLeft=0;
		var iTop=0;
		while(obj)
		{
			iLeft+=obj.offsetLeft;
			iTop+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return {x:iLeft,y:iTop}
	}
})



