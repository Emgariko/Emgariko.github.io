var example = document.getElementById("example"),
    ctx     = example.getContext('2d');
    var x = window.innerWidth;
    var y = window.innerHeight;
    example.height = window.innerHeight - 30;
    example.width  = window.innerWidth;

function draw(){   
    ctx.fillStyle = colb;
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

function drawrect(a, b, c, d, color, w, i){
   /* drawline(a, b, color, w);
    drawline(b, c, color, w);
    drawline(c, d, color, w);
    drawline(d, a, color, w); */
    var x1 = a.x;
    var y1 = a.y;
    var x2 = b.x;
    var y2 = b.y;
    var x3 = c.x;
    var y3 = y - c.y;
    var x4 = d.x;
    var y4 = y - d.y;
    y1 = y - y1;
    y2 = y - y2;       
    if (i > 0){ 
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.moveTo(x2, y2);
        ctx.lineTo(x3, y3);
        //ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        //ctx.moveTo(x4, y4);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        if (z == 1){
            ctx.fillStyle = color;
            ctx.fill();
        }
        ctx.stroke();     
    }
    else{
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.moveTo(x1, y1);    
        ctx.lineTo(x2, y2);
        //ctx.moveTo(x2, y2);
        ctx.lineTo(x3, y3);
        //ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        //ctx.moveTo(x4, y4);
        ctx.lineTo(x1, y1);
        if (z == 1){
            ctx.fillStyle = color;
            ctx.fill();
        }
        ctx.stroke();
    }                     
}

function drawtr(a, b, c, color, w){
    var x1 = a.x;
    var y1 = y - a.y;
    var x2 = b.x;
    var y2 = y - b.y;
    var x3 = c.x;
    var y3 = y - c.y;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    if (z == 1){
        ctx.fillStyle = colb;
        ctx.fill();
    }
    ctx.stroke();
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

function tree(a, b, an, len, i){
    if (len < 3){
        //alert(i);
        return;  
    }
    else{
        //alert('x1 = ' + a.x + ' ' + 'y1 = ' + a.y + '\n' + 'x2 = ' + b.x + ' ' + 'y2 = ' + b.y);
        //alert(a.x + ' ' + a.y + ' ' + b.x + ' ' + b.y);
        var x1 = a.x;
        var y1 = a.y;
        var x2 = b.x;
        var y2 = b.y;                          
        var ad = rotate90(pt(x2 - x1, y2 - y1));  
        var d = pt(x1 + ad.x, y1 + ad.y); 
        var c = pt(x2 + ad.x, y2 + ad.y);
        //alert('x1 = ' + x1 + ' y1 = ' + y1 + ' x2 = ' + x2 + ' y2 = ' + y2 + '\n x3 = ' + c.x + ' y3 = ' + c.y + ' x4 = ' + d.x + ' y4 = ' + d.y);
        drawrect(a, b, c, d, cola, ww, i);
        var l1 = len * Math.sin(an);
        var l2 = len * Math.cos(an);
        var dc = pt(c.x - d.x, c.y - d.y);
        dc = rotate(dc, an);    
        dc = setlen(dc, l1);
        var e = pt(d.x + dc.x, d.y + dc.y);
        //alert('x5 = ' + e.x + ' y5 = ' + e.y);
        drawtr(d, c, e, cola, ww);
        tree(d, e, an, l1, i + 1);
        tree(e, c, an, l2, i + 1); 
    }
}           

var alpha;


draw();                     
var col = 'rgb(255, 0, 255)';
var z = 0;
var ww = 1;
alpha = Math.PI / 4;
var cola = 'rgb(0, 255, 0)';
var colb = 'rgb(0, 0, 0)';

function rnd(){
    cola = getRndColor();
}

function setcolor(){
    var x = document.getElementById("myColor").value;
    cola = x;
}

function setcolorbg(){
    var x = document.getElementById("mybgColor").value;
    colb = x;
}

function drawtree(){
    alpha = document.getElementById("angle").value;
    //x = window.innerWidth;
    //y = (1 + Math.abs(alpha - 45)) / 20 *  window.innerHeight - 30;
    //example.height =(1 + Math.abs(alpha - 45)) *  window.innerHeight - 30;
    //example.width  = window.innerWidth;
    alpha = alpha * Math.PI / 180;
    //alert(alpha);
    draw();
    var k = (Math.PI) / alpha;
    var x1 = x / 2;
    var y1 = y / 6;        
    //var len = (x / Math.abs(4 - k)) / 4;
    var len = 120; 
    var ll1 = x / 2;
    var a = {};
    var ll1 = (alpha * (x / 2 - len / 2)) / (Math.PI / 4);
    var ll2 = ll1 + len;
    if (ll1 > ll2){
        var kek = ll2;
        ll2 = ll1;
        ll1 = kek;
    }                                     
    a.x = ll1;
    a.y = y1;
    var b = {};
    b.x = ll2; 
    b.y = y1;           
    tree(a, b, alpha, len, 0);
}
                    
drawtree();