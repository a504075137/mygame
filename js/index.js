$(function(){
	//1.监听游戏规则点击
	$(".rules").click(function(){
		$(".rule").stop().fadeIn(100)
	})

	//2.监听关闭按钮
	$(".close").click(function(){
		$(".rule").stop().fadeOut(100)

	});

	//3.监听开始按钮
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		//处理进度条
		progressHandler()
		//调用处理动画方法
		startwolfAnimation()

	})
	
	$(".reStart").click(function(){
		$(".mask").stop().fadeOut(100);
		progressHandler()
		startwolfAnimation()
		
	})



	function progressHandler(){

		$(".progress").css({
				width:180
			})
		//开启定时器
		var timer = setInterval(function(){
			//重新设置宽度



			var progressWidth=$(".progress").width()
			progressWidth -= 1;

			$(".progress").css({
				width:progressWidth

			});
			//坚挺进度条
			if(progressWidth <=0){
				clearInterval(timer);
				//显示重新开始
				$(".mask").stop().fadeIn(100)
				//停止动画
				stopWolfAnimation()
			}
		},100);


	}


	var wolfTimer
	function startwolfAnimation(){
		//1.定义一个数组专门保存灰太狼和小灰灰图片
		var wolf_1 = ['../images/h0.png','../images/h1.png','../images/h2.png',
		'../images/h3.png','../images/h4.png','../images/h5.png','../images/h6.png',
		'../images/h7.png','../images/h8.png','../images/h9.png'];
		var wolf_2 = ['../images/x0.png','../images/x1.png','../images/x2.png',
		'../images/x3.png','../images/x4.png','../images/x5.png','../images/x6.png',
		'../images/x7.png','../images/x8.png','../images/x9.png'];

		//2.定义一个数组保存所有肯出现的位置
		var arrPos = [
		{left:"100px",top:"115px"},
		{left:"20px",top:"160px"},
		{left:"190px",top:"142px"},
		{left:"105px",top:"193px"},
		{left:"19px",top:"221px"},
		{left:"202px",top:"212px"},
		{left:"120px",top:"275px"},
		{left:"30px",top:"295px"},
		{left:"209px",top:"297px"}
		];

		//创建图片
		var $wolfImage = $("<img src='' class='wolfImage'>");
		//随机获取图片位置
		var posIndex=Math.round(Math.random()*8)


		//设置位置
		$wolfImage.css({
			position:"absolute",
			left:arrPos[posIndex].left,
			top:arrPos[posIndex].top

		});
		//随机获取数组类型
		var wolfType=Math.round(Math.random()) ==0 ? wolf_1 : wolf_2;
		window.wolfIndex=0
		window.wolfIndexEnd=5;
		//设置图片内容
		wolfTimer=setInterval(function(){
			if(wolfIndex>wolfIndexEnd){
				$wolfImage.remove()
				clearInterval(wolfTimer);
				startwolfAnimation()
			}
			$wolfImage.attr("src", wolfType[wolfIndex++]);

		},300);
		
		//添加到界面
		$(".container").append($wolfImage)

	
		//处理游戏规则
		gameRules($wolfImage)
	}




	function stopWolfAnimation(){
		$(".wolfImage").remove();
		clearInterval(wolfTimer);


	}

	function gameRules($wolfImage){
		$wolfImage.one("click",function(){
			//修改索引
			window.wolfIndex = 5;
			window.wolfIndexEnd = 9;
			//拿到点击的地址
			var $src = $(this).attr("src");
			//判断是谁
			var flag=$src.indexOf("h")>=0;
			
			//根据图片类型增减分数
			if(flag){
				
				$(".score").text(parseInt($(".score").text()) +10);

			}else{

				$(".score").text(parseInt($(".score").text()) -10);
			}

		})

	}


});