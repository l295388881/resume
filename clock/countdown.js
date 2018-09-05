var WINDOW_WIDTH =1024;
var WINDOW_HEIGHT =500;
var RADIUS=7;
var MARGIN_LEFT=0;
var MARGIN_TOP=100;
// var LAST_TIME= new Date(2018,7,26,23,30,12);
var LAST_TIME= new Date()
LAST_TIME.setTime(LAST_TIME.getTime() + 5*1000)
// 两小时倒计时
var SHOW_TIME;
var balls = [];
var colors = ['red','blue','yellow','black','purple','green','gray'];

window.onload = function() {

	WINDOW_WIDTH=document.body.clientWidth;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

	var canvas = document.getElementById('canvas');
	var context =canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
    SHOW_TIME=getShowTime();
	setInterval(
		function(){
			render(context);
			update();
		},
		50
		)

	}

function update(){
	var nextShowTime=getShowTime();

	var nexthours=parseInt(nextShowTime/3600);
	var nextminutes = parseInt((nextShowTime-nexthours*3600)/60);
	var nextseconds = nextShowTime%60;

	var showhours=parseInt(SHOW_TIME/3600);
	var showminutes = parseInt((SHOW_TIME-showhours*3600)/60);
	var showseconds = SHOW_TIME%60;

	if(nextseconds!=showseconds){
		if(parseInt(showhours/10)!=parseInt(nexthours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(showhours/10))
		}
		if(parseInt(showhours%10)!=parseInt(nexthours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(showhours/10))
		}
        if(parseInt(showminutes/10)!=parseInt(nextminutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(showminutes/10))
		}
		if(parseInt(showminutes%10)!=parseInt(nextminutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(showminutes%10))
		}
		if(parseInt(showseconds/10)!=parseInt(nextseconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(showseconds/10))
		}
		if(parseInt(showseconds%10)!=parseInt(nextseconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(showseconds%10))
		}
		SHOW_TIME=nextShowTime;
	}
	updateBalls();
	console.log(balls.length)
	
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.6;
		}		
	}
    var aa=0;
    for(var i=0;i<balls.length;i++)
    	if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)
    		balls[aa++]=balls[i];

    while(balls.length>Math.min(200,aa))
    	balls.pop();

}

function addBalls(x,y,num){
	for(var i=0;i<digit1[num].length;i++)
		for(var j=0;j<digit1[num][i].length;j++)
			if(digit1[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*100))*4,
					vy:-15,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall)
			}
}

function getShowTime(){
	var nowtime =new Date();
	var ret=LAST_TIME.getTime()-nowtime.getTime();
	ret = Math.round(ret/1000);

	return ret>=0? ret:0;
}
// 计算绘制数字：
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(SHOW_TIME/3600);
	var minutes = parseInt((SHOW_TIME-hours*3600)/60);
	var seconds = parseInt(SHOW_TIME%60);

	painting(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	painting(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	painting(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	painting(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	painting(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	painting(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	painting(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	painting(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
}
	
// 绘制数字函数：
function painting(x,y,num,cxt){
	cxt.fillStyle = "gray";

	for(var i=0;i<digit1[num].length;i++)
		for(var j=0;j<digit1[num][i].length;j++)
			if(digit1[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
}