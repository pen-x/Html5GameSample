var cwidth = 900;
var cheight = 350;
var ctx;
var everything = [];
var curwall;
var wallwidth = 5;
var wallstyle = "rgb(200, 0, 200)";
var walls = [];
var inmotion = false;
var unit = 10;

function Token(sx, sy, rad, stylestring, n) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawtoken;
    this.n = n;
    this.angle = (2 * Math.PI) / n;
    this.moveit = movetoken;
    this.fillstyle = stylestring;
}

function drawtoken() {
    ctx.fillStyle = this.fillstyle;
    var i;
    var rad = this.rad;
    ctx.beginPath();
    ctx.moveTo(this.sx + rad * Math.cos(-0.5 * this.angle), this.sy + rad * Math.sin(-0.5 * this.angle));
    for (i = 1; i < this.n; i++) {
        ctx.lineTo(this.sx + rad * Math.cos((i - 0.5) * this.angle), this.sy + rad * Math.sin((i - 0.5) * this.angle));
    }
    ctx.fill();
}

function movetoken(dx, dy) {
    this.sx += dx;
    this.sy += dy;
    var i;
    var wall;
    for (i = 0; i < walls.length; i++) {
        wall = walls[i];
        if (intersect(wall.sx, wall.sy, wall.fx, wall.fy, this.sx, this.sy, this.rad)) {
            this.sx -= dx;
            this.sy -= dy;
            break;
        }
    }
}

function Wall(sx, sy, fx, fy, width, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.fx = fx;
    this.fy = fy;
    this.width = width;
    this.draw = drawAline;
    this.strokestyle = stylestring;
}

function drawAline() {
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.strokestyle;
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.fx, this.fy);
    ctx.stroke();
}

var mypent = new Token(100, 100, 20, "rgb(0, 0, 250)", 5);
everything.push(mypent);

function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    canvas1 = document.getElementById('canvas');
    canvas1.addEventListener('mousedown', startwall, false);
    canvas1.addEventListener('mousemove', stretchwall, false);
    canvas1.addEventListener('mouseup', finish, false);
    window.addEventListener('keydown', getkeyAndMove, false);
    drawall();
}

function startwall(ev) {
    var mx;
    var my;
    if (ev.layerX || ev.layerX == 0) {
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    
    curwall = new Wall(mx, my, mx+1, my+1, wallwidth, wallstyle);
    inmotion = true;
    everything.push(curwall);
    drawall();
}

function stretchwall(ev) {
    if (inmotion) {
        var mx;
        var my;
        if (ev.layerX || ev.layerX == 0) {
            mx = ev.layerX;
            my = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) {
            mx = ev.offsetX;
            my = ev.offsetY;
        }

        curwall.fx = mx;
        curwall.fy = my;
        drawall();
    }
}

function finish(ev) {
    inmotion = false;
    walls.push(curwall);
}

function drawall() {
    ctx.clearRect(0, 0, cwidth, cheight);
    var i;
    for (i = 0; i < everything.length; i++) {
        everything[i].draw();
    }
}

function getkeyAndMove(event) {
    var keyCode;
    if (event == null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    } else {
        keyCode = event.keyCode;
        event.preventDefault();
    }

    switch(keyCode) {
        case 37:
            mypent.moveit(-unit, 0);
            break;
        case 38:
            mypent.moveit(0, -unit);
            break;
        case 39:
            mypent.moveit(unit, 0);
            break;
        case 40:
            mypent.moveit(0, unit);
            break;
        default:
            window.removeEventListener('keydown', getkeyAndMove, false);
    }
    drawall();
}

function intersect(sx, sy, fx, fy, cx, cy, rad) {
    var dx;
    var dy;
    var t;
    var rt;
    dx = fx - sx;
    dy = fy - sy;
    t = 0.0 - ((sx - cx) * dx + (sy - cy) * dy) / ((dx * dx) + (dy * dy));
    if (t < 0.0) {
        t = 0.0;
    } else if (t > 1.0) {
        t = 1.0;
    }

    dx = (sx + t * (fx - sx)) - cx;
    dy = (sy + t * (fy - sy)) - cy;
    rt = (dx * dx) + (dy * dy);
    if (rt < (rad * rad)) {
        return true;
    } else {
        return false;
    }
}

function savewalls() {
    var w = [];
    var allw = [];
    var sw;
    var onewall;
    var i;
    var lsname = document.sf.slname.value;
    for (i = 0; i < walls.length; i++) {
        w.push(walls[i].sx);
        w.push(walls[i].sy);
        w.push(walls[i].fx);
        w.push(walls[i].fy);
        onewall = w.join("+");
        allw.push(onewall);
        w = [];
    }
    sw = allw.join(";");
    try {
        localStorage.setItem(lsname, sw);
    } catch (e) {
        alert("data not saved, error given: " + e);
    }
    return false;
}

function getwalls() {
    var swalls;
    var sw;
    var i;
    var sx;
    var sy;
    var fx;
    var fy;
    var curwall;
    var lsname = document.gf.glname.value;
    swalls = localStorage.getItem(lsname);
    if (swalls != null) {
        wallstgs = swalls.split(";");
        for (i = 0; i < wallstgs.length; i++) {
            sw = wallstgs[i].split("+");
            sx = Number(sw[0]);
            sy = Number(sw[1]);
            fx = Number(sw[2]);
            fy = Number(sw[3]);
            curwall = new Wall(sx, sy, fx, fy, wallwidth, wallstyle);
            walls.push(curwall);
            everything.push(curwall);
        }
        drawall();
    } else {
        alert("No data retrieved.");
    }
    window.addEventListener('keydown', getkeyAndMove, false);
    return false;
}
