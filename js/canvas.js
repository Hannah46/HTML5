var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');

//获取工具按钮的标签
var brush=document.getElementById('means_brush');
var eraser=document.getElementById('means_eraser');
var paint=document.getElementById('means_paint');
var straw=document.getElementById('means_straw');
var text=document.getElementById('means_text');
var magnifier=document.getElementById('means_magnifier');

//获取形状按钮标签
var line=document.getElementById('shape_line');
var arc=document.getElementById('shape_arc');
var rect=document.getElementById('shape_rect');
var poly=document.getElementById('shape_poly');
var arcfill=document.getElementById('shape_arcfill');
var rectfill=document.getElementById('shape_rectfill');
//把12个工具和形状按钮放到一个数组中
var actions=[brush,eraser,paint,straw,text,magnifier,line,arc,rect,poly,arcfill,rectfill];

//获取线宽按钮
var size_1 = document.getElementById('size_1');
var size_3 = document.getElementById('size_3');
var size_5 = document.getElementById('size_5');
var size_8 = document.getElementById('size_8');
//将4个线宽按钮放到一个数组中
var sizes=[size_1,size_3,size_5,size_8];

//获取颜色按钮
var colorRed=document.getElementById('red');
var colorGreen=document.getElementById('green');
var colorBlue=document.getElementById('blue');
var colorYellow=document.getElementById('yellow');
var colorWhite=document.getElementById('white');
var colorBlack=document.getElementById('black');
var colorPink=document.getElementById('pink');
var colorPurple=document.getElementById('purple');
var colorCyan=document.getElementById('cyan');
var colorOrange=document.getElementById('orange');
//把10种颜色放到一个数组中
var colors=[colorRed,colorGreen,colorBlue,colorYellow,colorWhite,colorBlack,colorPink,colorPurple,colorCyan,colorOrange];

//设置初始值
// 默认选中画笔工具
drawBrush(0);
//默认设置线宽和选中颜色
setSize(0); //默认选中1px
setColor(colorBlack,5); //默认

//状态设置函数
function setStatus(Arr, num, type){
    for (var i=0;i<Arr.length;i++) {
        //设置选中的标签改变css属性
        if(i==num) {
            //设置改变css的样式是背景色还是边框
            if (type==1) {
                Arr[i].style.background = "yellow";
            }else {
                Arr[i].style.border ="1px solid #fff";
            }
        }
        //设置未选中的组中的其他标签改变css
        else {
            if (type==1) {
                Arr[i].style.background = "#CCC";
            }
            else {
                Arr[i].style.border="1px solid #000";
            }
        }
    }
}

//设置图像功能函数 保存图片 清空画布
function saveimg(){
    //
}

//清空画布
function clearimg(){
    //画布清除方法
    cxt.clearRect(0,0,880,450);
}

var flag =0; //设置标识位，判断是否按下
//画笔方法
function drawBrush(num) {
    setStatus(actions,num,1);
    //鼠标按下的时候——设置开始点
    canvas.onmousedown=function(evt) {
        evt = window.event || evt;

        var startX=evt.pageX- this.offsetLeft;
        var startY=evt.pageY- this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX,startY);
        flag =1; //标记鼠标按下
    }

    //鼠标移动的时候——不停绘图（获取鼠标位置）
    canvas.onmousemove=function(evt){
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        //判断鼠标是否按下
        if (flag) {
            //移动的时候设置路径，并且画出来
            cxt.lineTo(endX,endY);
            cxt.stroke();;
        }
    }

    //鼠标抬起的时候结束绘图
    canvas.onmouseup=function(){
        flag =0;
    }

    //鼠标移出canvas的时候取消画图操作
    canvas.onmouseout=function(){
        flag=0; //标记鼠标抬起了
    }
}

//橡皮擦工具函数
function drawEraser(num) {
    setStatus(actions,num,1);
    canvas.onmousedown= function (evt) {
        evt = window.event || evt;
        var eraserX=evt.pageX- this.offsetLeft;
        var eraserY=evt.pageY- this.offsetTop;
        //canvas擦除方法 cxt.clearRect()
        cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,2*cxt.lineWidth,2*cxt.lineWidth);
        flag =1;
    }
    //随着鼠标移动不停擦除
    canvas.onmousemove= function (evt) {
        evt = window.event || evt;
        var eraserX=evt.pageX- this.offsetLeft;
        var eraserY=evt.pageY- this.offsetTop;
        //判断鼠标左键是否按下
        if (flag) {
            cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,2*cxt.lineWidth,2*cxt.lineWidth);
        }
    }
    
    canvas.onmouseup= function () {
        flag=0;
    }
    canvas.onmouseout= function () {
        flag=0;
    }
}

//油漆桶工具函数
function drawPaint(num) {
    setStatus(actions,num,1);
    canvas.onmousedown= function () {
        //把画布涂成指定的颜色——画一个填充颜色的矩形
        //更改canvas的背景色也可以用这种方式
        cxt.fillRect(0,0,880,450);
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=null;
}

//吸管工具作用
function drawStraw(num) {
    setStatus(actions,num,1);
    canvas.onmousedown=function(evt) {
        evt = window.event || evt;
        var strawX=evt.pageX- this.offsetLeft;
        var strawY=evt.pageY- this.offsetTop;
        //获取该点的颜色信息
        //获取图像信息的方法getImageData(开始点x,开始点y，宽度，高度)
        //获取的是一个ImageData对象，有三个属性width、height、data
        var obj=cxt.getImageData(strawX,strawY,1,1);
        var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';

        //将吸管吸取到的颜色赋给笔触和填充颜色
        cxt.strokeStyle=color;
        cxt.fillStyle=color;
        drawBrush(0);   //直接转换到画笔功能

    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=null;
}

//文本工具函数
function drawText(num) {
    setStatus(actions,num,1);
    canvas.onmousedown=function(evt) {
        evt = window.event || evt;
        var textX = evt.pageX - this.offsetLeft;
        var textY = evt.pageY - this.offsetTop;
        //获取用户输入的信息
        //两个参数：（提示信息，默认值）
        var userVal=window.prompt('请在这里输入文字','');
        //填充文字使用fillText方法
        //需要判断输入是否是空，否则会写入null
        if (!userVal) {
            cxt.fillText(userVal, textX, textY);
        }
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup=null;
}

//放大工具函数
function drawMagnifier(num) {
    setStatus(actions,num,1);
    //获取用户输入的数据大小
    var scale = window.prompt('请输入缩放倍数[只能是整形]','100');
    //把数据转成对应canvas画布的大小
    var scaleW=880*scale/100;
    var scaleH=450*scale/100;
    canvas.style.width=parseInt(scaleW)+'px';
    canvas.style.height=parseInt(scaleH)+'px';
}

//线形状函数
function drawLine(num) {
    setStatus(actions,num,1);
    canvas.onmousedown=function(evt){
        evt = window.event || evt;

        var startX=evt.pageX- this.offsetLeft;
        var startY=evt.pageY- this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX,startY);

    }
    //注销掉其他工具注册事件
    canvas.onmousemove=null;
    canvas.onmouseout=null;

    canvas.onmouseup=function(evt){
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        //设置路径把开始点和结束点链接起来，然后进行绘图
        cxt.lineTo(endX,endY);
        cxt.closePath();
        cxt.stroke();;
    }
}

//圆形形状函数
function drawArc(num) {
    setStatus(actions,num,1);
    var arcX,arcY;
    canvas.onmousedown=function(evt){
        evt = window.event || evt;

        arcX=evt.pageX- this.offsetLeft;
        arcY=evt.pageY- this.offsetTop;
    }

    canvas.onmouseup= function (evt) {
        //获取半径
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        var a=endX-arcX;
        var b=endY-arcY;
        var radius=Math.sqrt(a*a+b*b);
        cxt.beginPath();
        cxt.arc(arcX,arcY,radius,0,360,false);
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
}

//矩形形状函数
function drawRect(num) {
    setStatus(actions,num,1);
    var startX,startY;
    canvas.onmousedown= function (evt) {
        evt = window.event || evt;

        startX=evt.pageX- this.offsetLeft;
        startY=evt.pageY- this.offsetTop;
    }

    canvas.onmouseup= function (evt) {
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        var a = Math.abs(endX-startX);
        var b = Math.abs(endY-startY);
        cxt.beginPath();
        cxt.rect(startX,startY,a,b);
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
}

//三角形形状函数
function drawPoly(num) {
    setStatus(actions,num,1);
    var polyX,polyY;
    canvas.onmousedown= function (evt) {
        evt = window.event || evt;

        polyX=evt.pageX- this.offsetLeft;
        polyY=evt.pageY- this.offsetTop;
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
    canvas.onmouseup= function (evt) {
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        cxt.beginPath();
        //将画笔移动到右下角的顶点
        cxt.moveTo(endX,endY);
        //计算左下角的顶点坐标
        var lbX= 2*polyX-endX;
        cxt.lineTo(lbX, endY);
        //设置第三个顶点的坐标
        var thirdY=2*polyY-endY;
        cxt.lineTo(polyX,thirdY);
        cxt.closePath();
        cxt.stroke();
    }
}

//圆形填充函数
function drawArcfill(num) {
    setStatus(actions,num,1);
    var arcX,arcY;
    canvas.onmousedown=function(evt){
        evt = window.event || evt;

        arcX=evt.pageX- this.offsetLeft;
        arcY=evt.pageY- this.offsetTop;
    }

    canvas.onmouseup= function (evt) {
        //获取半径
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        var a=endX-arcX;
        var b=endY-arcY;
        var radius=Math.sqrt(a*a+b*b);
        cxt.beginPath();
        cxt.arc(arcX,arcY,radius,0,360,false);
        cxt.closePath();
        cxt.fill();
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;
}

//填充圆形形状函数
function drawRectfill(num) {
    setStatus(actions,num,1);
    var startX,startY;
    canvas.onmousedown= function (evt) {
        evt = window.event || evt;

        startX=evt.pageX- this.offsetLeft;
        startY=evt.pageY- this.offsetTop;
    }

    canvas.onmouseup= function (evt) {
        evt = window.event || evt;
        var endX=evt.pageX- this.offsetLeft;
        var endY=evt.pageY- this.offsetTop;
        var a = Math.abs(endX-startX);
        var b = Math.abs(endY-startY);
        cxt.beginPath();
        cxt.rect(startX,startY,a,b);
        cxt.closePath();
        cxt.fill();
    }
    canvas.onmousemove=null;
    canvas.onmouseout=null;

}

//线宽设置函数
function setSize(num) {
    setStatus(sizes,num,1);
    switch (num){
        case 0:
            cxt.lineWidth=1;
            break;
        case 1:
            cxt.lineWidth=3;
            break;
        case 2:
            cxt.lineWidth=5;
            break;
        case 3:
            cxt.lineWidth=8;
            break;
        default :
            cxt.lineWidth=1;
    }
}

//颜色设置函数
function setColor(obj,num) {
    setStatus(colors,num,0);
    //设置画笔颜色和填充颜色
    cxt.strokeStyle=obj.id;
    cxt.fillStyle=obj.id;
}

