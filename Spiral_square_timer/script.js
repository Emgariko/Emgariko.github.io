var example = document.getElementById("example"),
    ctx     = example.getContext('2d');
    var x = window.innerWidth;
    var y = window.innerHeight - 30;
    example.height = window.innerHeight - 30;
    example.width  = window.innerWidth;

function draw(){   
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, x, y);       
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}   


function pt(x, y){
    var p = {x, y};
    p.x = x;
    p.y = y;
    return p;       
}

function drawline(a, b, color, w){
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y;
    y1 = y - y1;
    y2 = y - y2;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2); 
    ctx.stroke();
    //alert(x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
}

function drawrect(a1, a2, a3, a4, col, w){
    drawline(a1, a2, col, w);
    drawline(a2, a3, col, w);
    drawline(a3, a4, col, w);
    drawline(a4, a1, col, w);
}
            
function setlen(a, len){
    var x1 = a.x;
    var y1 = a.y;
    var l = Math.sqrt(x1 * x1 + y1 * y1);
    x1 = x1 / l;
    y1 = y1 / l;
    x1 = x1 * len;
    y1 = y1 * len;
    var res = {};
    res.x = x1;
    res.y = y1;
    //alert(x1 + ' ' + y1);
    return res;
}


function rotate(a, an){
    //alert(a.x + ' ' + a.y);
    var x1 = a.x;
    var y1 = a.y;                
    var s = Math.sin(an);
    var c = Math.cos(an);
    /*if (alpha > 0.0){
        s = 0.707106781;
        c = 0.707106781;
    }
    else{
        s = -0.707106781;
        c = -0.707106781;
    } */    
    //alert(s + ' ' + ' ' + c);
    var res = {};
    res.x = x1 * s - y1 * c;
    res.y = x1 * c + y1 * s;
    //alert(res.x + ' ' + res.y + ' alpha = ' + alpha);
    return res;
}

function rotate90(a){
    var x1 = a.x;
    var y1 = a.y;
    var res = pt(-y1, x1);
    return res;
}                 

function dist(a, b){
    var x1 = a.x;
    var x2 = b.x;
    var y1 = a.y;
    var y2 = b.y;
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
 
function drawr(a, b, c, d, col, w, alpha, i){
    var dd = dist(a, b);
    if (dd < 1)
        return;
    else{
    drawrect(a, b, c, d, col[i % col.length], w);
    var ab = pt(b.x - a.x, b.y - a.y);
    var ad = pt(d.x - a.x, d.y - a.y);
    var l1 = dd / (Math.sin(alpha) + Math.cos(alpha));
    var l2 = Math.cos(alpha) * l1;
    var l3 = Math.sin(alpha) * l1;
    ab = setlen(ab, l2);
    ad = setlen(ad, l3);     
    var a1, b1, c1, d1;
    a1 = pt(a.x + ab.x, a.y + ab.y);
    d1 = pt(a.x + ad.x, a.y + ad.y);
    c1 = pt(c.x - ab.x, c.y - ab.y);
    b1 = pt(c.x - ad.x, c.y - ad.y); 
    //alert(a1.x + ' ' + a1.y + "\n" + a2.x + ' ' + a2.y + "\n" + a3.x + ' ' + a3.y + "\n" + a4.x + ' ' + a4.y);
    drawr(a1, b1, c1, d1, col, w, alpha, i + 1);     
    }
} 
  
draw();            

var col = [];
var i;
for (i = 0; i < 1000; i++){
    col.push(getRndColor());   
}

alpha = 0.000000001;
var delta = 0.008;
var au = 0;

function plus(){    
    if (au != 1)
        delta *= 1.5;
    delta = min(delta, 0.5);
}

function minus(){
    if (au != 1)
        delta /= 1.5;
    delta = max(delta, 0.000000000000001);
}

function auto(){
    au = 1 - au;
}

var timerid = setInterval(function(){
    draw();                
    alpha += delta;
    if (alpha + delta - Math.PI / 2 > 0.0000000001)  {
        delta *= -1;
        alpha = Math.PI / 2 - 0.0000000000001;        
    }
    if (alpha + delta < 0.000000001){
        delta *= -1;
        alpha = 0.0000000001;    
    }
    var c = pt(0, 0);
    var w = 1.75;
    var a1, a2, a3, a4;
    if (x > y){
        c = pt(x / 2, y / 2);
        a1 = pt(c.x - y / 2, w);
        a2 = pt(c.x + y / 2, w);
        a3 = pt(c.x + y / 2, y - w);
        a4 = pt(c.x - y / 2, y - w);    
    }
    else{
        c = pt(x / 2, y / 2);
        a1 = pt(x - 2, c.y - x / 2);
        a2 = pt(x - 2, c.y + x / 2);
        a3 = pt(0, c.y + x / 2);
        a4 = pt(0, c.y - x / 2);
    }                  
    //drawrect(a1, a2, a3, a4, "rgb(255, 0, 0)", 2);  
    //alert(a1.x + ' ' + a1.y + "\n" + a2.x + ' ' + a2.y + "\n" + a3.x + ' ' + a3.y + "\n" + a4.x + ' ' + a4.y); 
    drawr(a1, a2, a3, a4, col, w, alpha, 0);
}, 200);

drawfr();