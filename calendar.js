/**
 * 初始化各项参数
 */
function ini(){

	// 获取当前年月日星期
	time=new Date();
	nowYear=time.getYear()+1900;
	nowMonth=time.getMonth()+1;
	nowDay=time.getDate();
	nowWeek=time.getDay();

	// 获取显示年月的标签
	monthSpan=document.getElementById("m");
	yearSpan=document.getElementById("y");
}

/**
  * 显示日历
  */
function showCal(year,month,day){
	// 获得显示日历的div并设置其可见性为可见
	calendar=document.getElementById("calendar");
	calendar.style.display="block";

	// 将当前时间设置进显示年月的标签中
	monthSpan.value=month;
	yearSpan.value=year;
	
	
	// 获取当前月份的第一天是星期几
	var s=Date.parse(year+"/"+month+"/"+1);
	var times=new Date(s);
	var firstWeek=times.getDay();

	// 绘制日期的表格
	dateTable=document.getElementById("date");// 获取显示日期的表格
	var m = 0;
	var flag = true;// 用于固定选中日期的背景色
	for(var i=0;i<6;i++){
		var trs = dateTable.insertRow();// 插入一行
		for(var j=0;j<7;j++){
			var tds = trs.insertCell();// 插入一列
			m++;
			tds.id = "c"+m;// 设置每一列的id值
			//alert("a"+tds.style.backgroundColor+"a");
			tds.onmouseover=function (event){
				event.target.style.cursor="pointer";// 鼠标变手型
				if(event.target.style.backgroundColor==""){
					flag=false;
				}else{
					flag=true;
				}
				event.target.style.backgroundColor="#BDEBEE";
				//alert(flag);
			};
			tds.onmouseout=function (event){
				if(!flag){
					event.target.style.backgroundColor="";
				}
				
			};
			tds.onclick=function (event){
				// 获得日期的文本输入框
				var riqi = document.getElementById("riqi");
				// 获取当前td的字体颜色
				var colors = event.target.style.color;
				// 获取当前td的日期并将其转成数字型
				var dayInt = parseInt(event.target.innerHTML);
				var monthStr = monthSpan.value;
				var yearStr = yearSpan.value;
				if(colors=="cyan"&&dayInt>=24&&monthStr==1){
					// 当点击的是上月在本月的余日，且当前月为1月时，对文本框输出的年份需减1，月份改为12月
					riqi.value = (yearStr-1)+"-"+12+"-"+addZero(event.target.innerHTML);

				}else if(colors=="cyan"&&dayInt>=24&&monthStr!=1){
					// 当点击的是上月在本月的余日，且当前月不为1月时，月份减1
					riqi.value = yearStr+"-"+addZero(monthStr-1)+"-"+addZero(event.target.innerHTML);

				}else if(colors=="cyan"&&dayInt<=11&&monthStr==12){
					// 当点击的是下月在本月的开始日，且当前月为12月时，对文本框输出的年份需加1，月份改为1月
					riqi.value = (yearStr-(-1))+"-0"+1+"-"+addZero(event.target.innerHTML);

				}else if(colors=="cyan"&&dayInt<=11&&monthStr!=12){
					// 当点击的是下月在本月的开始日，且当前月不为12月时，月份加1
					riqi.value = yearStr+"-"+addZero(monthStr-(-1))+"-"+addZero(event.target.innerHTML);

				}else{
					// 当点击本月时，年月日正常输出
					riqi.value = yearStr+"-"+addZero(monthStr)+"-"+addZero(event.target.innerHTML);
				}
				hiddenCal();
			};
		}
	}

	// 显示具体的日期
	var days=getDays(year,month);
	for(var i=1;i<=42;i++){
		if(i<=(firstWeek==0?firstWeek=7:firstWeek)){// 显示本月1号前的日期(当firstWeek为0时，打印七个前一月的日期)

			// 显示本月1号前的前月日期
			//-------------------------------------------------------------------------------------------
			var tn=document.getElementById("c"+(firstWeek+1-i));
			var t = Date.parse(yearSpan.value+"/"+monthSpan.value+"/"+1);
			var tim = new Date(t);
			var preDate = new Date(tim.getTime() - i*24*60*60*1000);
			tn.innerHTML=preDate.getDate()+"";
			tn.style.color="cyan";
			//-------------------------------------------------------------------------------------------

		}else if(i-firstWeek<=days){// 显示本月日期
			var tn=document.getElementById("c"+i);
			if(i-firstWeek==day){
				tn.style.backgroundColor="#BDEBEE";
			}else{
				tn.style.backgroundColor="";
			}
			tn.innerHTML=i-firstWeek;
			tn.style.color="black";
		}else{// 显示本月后的日期
			var tn=document.getElementById("c"+i);
			tn.innerHTML=i-firstWeek-days+"";// 显示本月后的下月日期
			tn.style.color="cyan";
		}
	}
}

/**
  *隐藏日历
  */
function hiddenCal(){
	calendar.style.display="none";
}

/** 
 * 传入年月，获得该年该月有多少天
 */
function getDays(year,month){
	var time=new Date();
	time.setYear(year);
	time.setMonth(month);
	time.setDate(0);
	return time.getDate();
}

/**
 * 将年份减一的函数
 */
function subYear(){
	yearSpan.value -= 1;
	showCal(yearSpan.value,monthSpan.value,nowDay);
}
/**
 * 将月份减一的函数
 */
function subMonth(){
	if(monthSpan.value==1){// 当月份减到1时需要对月份重新赋值
		yearSpan.value -= 1;
		monthSpan.value = 12;
	}else{
		monthSpan.value -= 1;
	}
	showCal(yearSpan.value,monthSpan.value,nowDay);
}

/**
 * 将年份加一的函数
 */
function addYear(){
	yearSpan.value -= -1;// yearSpan.innerHTML的类型为：string。所以使用-(-1)的形式实现加1
	showCal(yearSpan.value,monthSpan.value,nowDay);

}
/**
 * 将月份加一的函数
 */
function addMonth(){
	if(monthSpan.value==12){// 当月份加到12时需要对月份重新赋值
		yearSpan.value -= -1;
		monthSpan.value = 1;
	}else{
		monthSpan.value -= -1;
	}
	showCal(yearSpan.value,monthSpan.value,nowDay);
}

/**
 * 在一位数前加0
 */
function addZero(n){
	var m = "0";
	n=parseInt(n);
	if(n<10){
		n=m+n;
	}
	return n;
}

/** 
 * 当获得焦点输入年月时显示边框
 */
function showBorder(e){
	e.target.style.border="1px solid #C5D9E8";
}

/** 
 * 当失去焦点时隐藏边框
 */
function hiddenBorder(e){
	e.target.style.border="0px";
}

/**
 * 显示日历前先判断日期框中是否有值
 */
function show(){
	var riqi = document.getElementById("riqi");
	if(riqi.value=="请选择一个日期"){
		riqi.value="";
		riqi.style.color="black";
		showCal(nowYear,nowMonth,nowDay);// 没有值就显示当前日期
	}else if(riqi.value==""){
		showCal(nowYear,nowMonth,nowDay);// 没有值就显示当前日期
	}else{
		dateArray = riqi.value.split("-");
		showCal(dateArray[0],parseInt(dateArray[1]),parseInt(dateArray[2]));// 有值就显示该值对应的日历
	}
}

function change(){
	var riqi = document.getElementById("riqi");
	var reg=/^[1-9]\d*$|^0$/; // 匹配纯数字的正则表达式
	if(parseInt(monthSpan.value)<=0||parseInt(monthSpan.value)>12||!reg.test(monthSpan.value)){
		alert("请输入1-12的月份！");
		// 打印当前月的日历
		yearSpan.value=nowYear;
		monthSpan.value=nowMonth;
		showCal(nowYear,nowMonth,nowDay);
		
	}else if(parseInt(yearSpan.value)<=0||parseInt(yearSpan.value)>9999||!reg.test(yearSpan.value)){
		alert("请输入1-9999的年份！");
		// 打印当前月的日历
		yearSpan.value=nowYear;
		monthSpan.value=nowMonth;
		showCal(nowYear,nowMonth,nowDay);
	}else{
		// 打印指定日期的日历
		showCal(yearSpan.value,monthSpan.value,dateArray[2]);
	}
}