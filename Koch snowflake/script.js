var example = document.getElementById("example"),
    ctx     = example.getContext('2d');
    var x = window.innerWidth;
    var y = window.innerHeight;
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

function drawline(x1, y1, x2, y2, color, w){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2); 
    ctx.stroke();
}

var kek = 0;

function Koch(ax, ay, ex, ey, i, w){
    if (i == 0){
        drawline(ax, ay, ex, ey, 'rgb(255, 0, 255)', w);
       // drawline(ax, ay, ex, ey, getRndColor(), w);   
        return 0;                                  
    }
    else{
        var vx = (ex - ax) / 3;
        var vy = (ay - ey) / 3;
        var bx = ax + vx;
        var by = ay - vy;
        var dx = ax + 2 * vx;
        var dy = ay - 2 * vy;
        var c = Math.sin(Math.PI / 3);
        var d = Math.cos(Math.PI / 3);
        var l = Math.sqrt(vx * vx + vy * vy);
        var l1 = l / 2;
        var fx = bx + vx / 2;
        var fy = by - vy / 2;
        var lol = vx;
        vx = -vy;
        vy = lol;
        vx = vx / l;
        vy = vy / l;
        vx = vx * Math.sqrt(l * l - l1 * l1);
        vy = vy * Math.sqrt(l * l - l1 * l1);
        var cx = fx + vx;
        var cy = fy - vy; 
        //Koch(ax, ay, ex, ey, i - 1, w);
        Koch(ax, ay, bx, by, i - 1, w);
        Koch(bx, by, cx, cy, i - 1, w);
        Koch(cx, cy, dx, dy, i - 1, w);
        Koch(dx, dy, ex, ey, i - 1, w);                 
        return 0;                     
    }
}
       
draw(); 
var x1 = 0;
var x2 = x;
var y1 = y - y / 7;
var y2 = y - y / 7;
kek = 0;
//Koch(0, y1, x2, y2, 7, 0);


var timerid;          
timerid = setInterval(function(){
    draw();
    //Koch(0, y2, x2, y2, kek, 0);
    var len = x * y / 2000;
    var len1 = Math.sqrt(len * len - (len * len) / 4);
    var t = 1.5;         
    Koch(x / 2, y / 8, x / 2 + len / 2, y / 8 + len1, kek, t);
    Koch(x / 2 + len / 2, y / 8 + len1, x / 2 - len / 2, y / 8 + len1, kek, t);
    Koch(x / 2 - len / 2, y / 8 + len1, x / 2, y / 8, kek, t); 
    //alert(timerid);
    if (kek == 7){
        kek = 0;
        //clearInterval(timerid);
    }
    else{
        kek = kek + 1;
        
    }     
}, 1250);

var lol = 1;
    
function mstop(){
    if (lol == 1){
        clearInterval(timerid);
    }
    else{
        timerid = setInterval(function(){
            draw();
            //Koch(0, y2, x2, y2, kek, 0);
            var len = x * y / 2000;
            var len1 = Math.sqrt(len * len - (len * len) / 4);
            var t = 1.5;         
            Koch(x / 2, y / 8, x / 2 + len / 2, y / 8 + len1, kek, t);
            Koch(x / 2 + len / 2, y / 8 + len1, x / 2 - len / 2, y / 8 + len1, kek, t);
            Koch(x / 2 - len / 2, y / 8 + len1, x / 2, y / 8, kek, t); 
            //alert(timerid);
            if (kek == 7){
                kek = 0;
                //clearInterval(timerid);
            }
            else{
                kek = kek + 1;
            }     
        }, 1250);
    }       
    lol = 1 - lol;
}
  