var shift = false;
var calculation = '';
var trail = [''];
var prevOp = ' ';
var length;
var delCalc = false;
var count;
var places;
var m;
var n;
var a;
var b;
var prev;
var brackets = 0;
var prevAns = '0';
var Rand = Math.floor((Math.random() * 10) + 1);
var mode = 'Deg';
var storeA = 0;
var storeB = 0;
var storeC = 0;
var store = false;
var base = 10;
var graph = [''];
var currentNum = 0;

var c = document.getElementById('calc');
var ctx = c.getContext('2d');

ctx.font = "10px Monaco";

ctx.scale(2,2);
ctx.translate(0.1, 0.1);
ctx.textAlign="right";

function before(data,i) {
    count = i - 1;
    places = 0;
    while ((isNaN(data[count]) == false) || (data[count] == '.')) {
        places += 1;
        count -= 1;
    }
    return places;
}

function after(data,i) {
    count = i + 2;
    places = 0;
    while ((isNaN(data[count]) == false) || (data[count] == '.') || (data[count] == ')')) {
        places += 1;
        count += 1;
    }
    return places;
}

function fact(data) {
    if (Math.round(Math.abs(data)) != data) {
        return 'error';
    }
    else {
        var v = 1;
        for (var u = 0; u < data; u++) {
            v = v * (data - u);
        }
        return v;
    }
}

function calculate(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] === 'a') {
            data = data.slice(0,i) + '/' + data.slice(i + 1,data.length);
        }
        if (data[i] === 'b') {
            data = data.slice(0,i) + '*' + data.slice(i + 1,data.length);
        }
        if (data[i] === 'c') {
            data = data.slice(0,i) + '+' + data.slice(i + 1,data.length);
        }
        if (data[i] === 'd') {
            data = data.slice(0,i) + '-' + data.slice(i + 1,data.length);
        }
        if (data[i] === '¥') {
            if ((isNaN(data[data.length - 2]) == false) || (data[data.length-2] == ')')) {
                data = data.slice(0,i) + '*' + storeA + data.slice(i + 1,data.length);
            }
            else {
                data = data.slice(0,i) + storeA + data.slice(i + 1,data.length);
            }
        }
        if (data[i] === '©') {
            if ((isNaN(data[data.length - 2]) == false) || (data[data.length-2] == ')')) {
                data = data.slice(0,i) + '*' + storeB + data.slice(i + 1,data.length);
            }
            else {
                data = data.slice(0,i) + storeB + data.slice(i + 1,data.length);
            }
        }
        if (data[i] === '®') {
            if ((isNaN(data[data.length - 2]) == false) || (data[data.length-2] == ')')) {
                data = data.slice(0,i) + '*' + storeC + data.slice(i + 1,data.length);
            }
            else {
                data = data.slice(0,i) + storeC + data.slice(i + 1,data.length);
            }
        }
        if ((data[i] == '(') && (isNaN(data[i-1]) == false)) {
            data = data.slice(0,i) + '*' + data.slice(i,data.length);
        }
        if (data[i] == 'π') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            if ((isNaN(r[r.length - 1]) == false) || (r[r.length-1] == ')')) {
                r = r + '*';
            }
            var s = '';
            for (var j = i + 1; j < data.length; j++) {
                s = s + data[j];
            }
            data = r + Math.PI + s;
        }
        if (data[i] == '@') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            if ((isNaN(r[r.length - 1]) == false) || (r[r.length-1] == ')')) {
                r = r + '*';
            }
            var s = '';
            for (var j = i + 1; j < data.length; j++) {
                s = s + data[j];
            }
            data = r + prevAns + s;
        }
        if (data[i] == '<') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            if ((isNaN(r[r.length - 1]) == false) || (r[r.length-1] == ')')) {
                r = r + '*';
            }
            var s = '';
            for (var j = i + 1; j < data.length; j++) {
                s = s + data[j];
            }
            data = r + Rand + s;
            Rand = Math.floor((Math.random() * 10) + 1);
        }
        if (data[i] == 'q') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            if ((isNaN(r[r.length - 1]) == false) || (r[r.length-1] == ')')) {
                r = r + '*';
            }
            var s = '';
            for (var j = i + 1; j < data.length; j++) {
                s = s + data[j];
            }
            data = r + currentNum + s;
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '|') {
            var r = '';
            var previous = '';
            j = i - 1;
            var exitLoop = false;
            var brack = 1;
            while ((isNaN(data[j]) == false) || (data[j] == '.') || (data[j] == '!') || (data[j] == '%')) {
                previous = data[j] + previous;
                j -= 1;
            }
            for (var k = 0; k <= j; k ++) {
                r = r + data[k];
            }
            l = i + 1;
            var next = '';
            while ((isNaN(data[l]) == false) || (data[l] == '.') || (data[l] == '!') || (data[j] == '%')) {
                next = next + data[l];
                l += 1;
            }
            if (previous == '') {
                previous = '2';
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            var f1 = fact(previous);
            var f2 = fact(previous - next);
            var f3 = fact(next);
            var f4 = f2 * f3;
            var f5 = f1/f4;
            data = r + f5 + s;
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '^') {
            var r = '';
            var previous = '';
            j = i - 1;
            var exitLoop = false;
            var brack = 1;
            if (data[j] == ')') {
                while (exitLoop == false) {
                    previous = data[j] + previous;
                    j -= 1;
                    if (data[j] == ')') {
                        brack += 1;
                    }
                    else if (data[j] == '(') {
                        brack -= 1;
                        if (brack == 0) {
                            previous = data[j] + previous;
                            exitLoop = true;
                            j -= 1;
                        }
                    }
                }
            }
            else {
                var exitLoop = false;
                while ((isNaN(data[j]) == false) || (data[j] == '.') || (data[j] == '!')) {
                    previous = data[j] + previous;
                    j -= 1;
                }
            }
            for (var k = 0; k <= j; k ++) {
                r = r + data[k];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            if (previous == '') {
                previous = '2';
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            data = r + 'Math.pow(' + previous + ',' + next + ')' + s;
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '√') {
            var r = '';
            var previous = '';
            j = i - 1;
            var exitLoop = false;
            var brack = 1;
            if (data[j] == ')') {
                while (exitLoop == false) {
                    previous = data[j] + previous;
                    j -= 1;
                    if (data[j] == ')') {
                        brack += 1;
                    }
                    else if (data[j] == '(') {
                        brack -= 1;
                        if (brack == 0) {
                            previous = data[j] + previous;
                            exitLoop = true;
                            j -= 1;
                        }
                    }
                }
            }
            else {
                while ((isNaN(data[j]) == false) || (data[j] == '.') || (data[j] == '!')) {
                    previous = data[j] + previous;
                    j -= 1;
                }
            }
            for (var k = 0; k <= j; k ++) {
                r = r + data[k];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            if (previous == '') {
                previous = '2';
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            data = r + 'Math.pow(Math.abs(' + next + '),' + '1/(' + previous + ')' + ')' + s;
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == ':') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (mode == 'Deg') {
                data = r + 'Math.sin(Math.PI*' + next + '/180.0' + ')' + s;
            }
            else {
                data = r + 'Math.sin(' + next + ')' + s;
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == ';') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (mode == 'Deg') {
                data = r + 'Math.cos(Math.PI*' + next + '/180.0' + ')' + s;
            }
            else {
                data = r + 'Math.cos(' + next + ')' + s;
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '#') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (next == '(90)') {
                data = 'Invalid';
            }
            else if (mode == 'Deg') {
                data = r + 'Math.tan(Math.PI*' + next + '/180.0' + ')' + s;
            }
            else {
                data = r + 'Math.tan(' + next + ')' + s;
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '£') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (mode == 'Deg') {
                data = r + 'Math.asin(' + next + ')*(180/Math.PI)' + s;
            }
            else {
                data = r + 'Math.asin(' + next + ')' + s;
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '$') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (mode == 'Deg') {
                data = r + 'Math.acos(' + next + ')*(180/Math.PI)' + s;
            }
            else {
                data = r + 'Math.acos(' + next + ')' + s;
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '€') {
            var r = '';
            for (var j = 0; j < i; j++) {
                r = r + data[j];
            }
            l = i + 1;
            var next = '';
            var exitLoop = false;
            var brack = 0;
            while (exitLoop == false) {
                next = next + data[l];
                if (data[l] == '(') {
                    brack += 1;
                }
                else if (data[l] == ')') {
                    brack -= 1;
                    if (brack == 0) {
                        exitLoop = true;
                    }
                }
                l += 1;
            }
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            if (mode == 'Deg') {
                data = r + 'Math.atan(' + next + ')*(180/Math.PI)' + s;
            }
            else {
                data = r + 'Math.atan(' + next + ')' + s;
            }
        }
    }
    
    for (var i = 0; i < data.length; i++) {
        if (data[i] == '!') {
            var r = '';
            var previous = '';
            j = i - 1;
            var exitLoop = false;
            var brack = 1;
            if (data[j] == ')') {
                while (exitLoop == false) {
                    previous = data[j] + previous;
                    j -= 1;
                    if (data[j] == ')') {
                        brack += 1;
                    }
                    else if (data[j] == '(') {
                        brack -= 1;
                        if (brack == 0) {
                            previous = data[j] + previous;
                            exitLoop = true;
                            j -= 1;
                        }
                    }
                }
            }
            else {
                while ((isNaN(data[j]) == false) || (data[j] == '.')) {
                    previous = data[j] + previous;
                    j -= 1;
                }
            }
            for (var k = 0; k <= j; k ++) {
                r = r + data[k];
            }
            l = i + 1;
            var s = '';
            for (var k = l; k < data.length; k++) {
                s = s + data[k];
            }
            previous = fact(eval(previous));
            data = r + previous + s;
        }
    }
    start = false;
    prevAns = eval(data);
    return eval(data);
}

function replaceOps(data) {
    for (var j = 0; j < data.length; j++) {
        if ((data[j] === 'a') && (data[j+1] != 'n')) {
            data = data.slice(0,j) + '÷' + data.slice(j + 1,data.length);
        }
        else if (data[j] === 'b') {
            data = data.slice(0,j) + 'x' + data.slice(j + 1,data.length);
        }
        else if ((data[j] === 'c') && (data[j+1] != 'o')) {
            data = data.slice(0,j) + '+' + data.slice(j + 1,data.length);
        }
        else if ((data[j] === 'd') && (data[j-3] != 'R')) {
            data = data.slice(0,j) + '-' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '@') {
            data = data.slice(0,j) + 'Ans' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '<') {
            data = data.slice(0,j) + 'Rand' + data.slice(j + 1,data.length);
        }
        else if (data[j] == ':') {
            data = data.slice(0,j) + 'sin' + data.slice(j + 1,data.length);
        }
        else if (data[j] == ';') {
            data = data.slice(0,j) + 'cos' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '#') {
            data = data.slice(0,j) + 'tan' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '£') {
            data = data.slice(0,j) + 'asin' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '$') {
            data = data.slice(0,j) + 'acos' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '€') {
            data = data.slice(0,j) + 'atan' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '¥') {
            data = data.slice(0,j) + 'A' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '©') {
            data = data.slice(0,j) + 'B' + data.slice(j + 1,data.length);
        }
        else if (data[j] == '®') {
            data = data.slice(0,j) + 'C' + data.slice(j + 1,data.length);
        }
    }
    return data;
}

function draw() {
    if ((trail[trail.length - 1] == '') || (shift == true)) {
        document.getElementById('canc').innerHTML = 'Clear';
    }
    else if (shift == false){
        document.getElementById('canc').innerHTML = 'Canc';
    }
    ctx.fillStyle = '#333333';
    ctx.fillRect(220,0,600,400);
    ctx.fillStyle = '#ededed';
    for (var i = 0; i < trail.length; i++) {
        prev = trail[i - 1];
        if (i > 0) {
            if (prev[prev.length-1] == '=') {
                ctx.fillText('---------------',297,208 - 20 * (trail.length - i));
                ctx.fillText(trail[i],293,218 - 20 * (trail.length - i));
                ctx.fillText('---------------',297,228 - 20 * (trail.length - i));
            }
            else {
                current = trail[i];
                if ((current[current.length-1] == '=') || (current[current.length-1] == '+') || (current[current.length-1] == '-') || (current[current.length-1] == 'x') || (current[current.length-1] == '÷')) {
                    current = current.slice(0,current.length - 1);
                }
                ctx.fillText(replaceOps(current) + prevOp,299,218 - 20 * (trail.length - i));
                current = trail[i];
                if ((current[current.length-1] == '+') || (current[current.length-1] == '-') || (current[current.length-1] == 'x') || (current[current.length-1] == '÷')) {
                    prevOp = current[current.length-1];
                }
                else {
                    prevOp = ' ';
                }
            }
        }
        else {
            current = trail[i];
            if ((current[current.length-1] == '=') || (current[current.length-1] == '+') || (current[current.length-1] == '-') || (current[current.length-1] == 'x') || (current[current.length-1] == '÷')) {
                current = current.slice(0,current.length - 1);
            }
            ctx.fillText(replaceOps(current) + prevOp,297,218 - 20 * (trail.length - i));
            current = trail[i];
            if ((current[current.length-1] == '+') || (current[current.length-1] == '-') || (current[current.length-1] == 'x') || (current[current.length-1] == '÷')) {
                prevOp = current[current.length-1];
            }
            else {
                prevOp = ' ';
            }
        }
    }
    if (delCalc == true) {
        calculation = '';
        delCalc = false;
    }
}

draw();

function findIfGraph(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == 'q') {
            return true;
        }
    }
    return false;
}

function clicker(type) {
    baseChanged = false;
    var g = trail[trail.length-2];
    if ((type == 'Canc') && (shift == true)) {
        ctx.fillStyle = '#333333';
        ctx.fillRect(0,0,250,400);
        trail = [' '];
        calculation = '';
        length = -1;
        shift = false;
        document.getElementById('Shift').style.backgroundColor = '#ffce00';
        document.getElementById('Shift').style.borderColor = '#ffe200';
        document.getElementById('sin').innerHTML = 'sin';
        document.getElementById('cos').innerHTML = 'cos';
        document.getElementById('tan').innerHTML = 'tan';
        document.getElementById('canc').innerHTML = 'Canc';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        document.getElementById('c').innerHTML = 'C';
    }
    if ((type == '=') && (calculation.length > 0) && (brackets == 0)) {
        if (findIfGraph(calculation) == false) {
            trail[trail.length-1] = trail[trail.length-1] + '=';
            m = calculate(calculation);
            if (m < 1) {
            m = Math.round(m*1000000)/1000000;
            }
            if (m.toString().length > 8) {
                m = Math.round(m*1000000)/1000000;
            }
            m = m.toString();
            trail.push(m);
        }
        else {
            ctx.fillStyle = '#333333';
            ctx.fillRect(0,0,250,400);
            trail[trail.length-1] = trail[trail.length-1] + '=';
            var e = [];
            for (var p = -10; p <= 10; p++) {
                currentNum = '(' + p + ')';
                e.push(calculate(calculation));
            }
            var current = trail[trail.length-1];
            trail.push('Plotted');
            ctx.strokeStyle = "#88ff8d";
            ctx.save();
            ctx.translate(50/2,50/2);
            ctx.moveTo(0/2,150/2);
            ctx.lineTo(300/2,150/2);
            ctx.stroke();
            ctx.moveTo(150/2,0/2);
            ctx.lineTo(150/2,300/2);
            ctx.stroke();
            ctx.translate(0/2,150/2);
            var max = 0;
            var min = 0;
            for (var h = 0; h < e.length; h++) {
               if (e[h] > e[max]) {
                  max = h;
               }
               if (e[h] < e[min]) {
                  min = h;
               }
            }
            var t = Math.max(Math.abs(e[max]),Math.abs(e[min]));
            for (var h = 0; h < 21; h++) {
               ctx.beginPath();
               ctx.arc(15 * h/2, -(e[h] * 150/t/2), 1, 0, 2 * Math.PI);
               ctx.strokeStyle = "#00d8ff";
               ctx.fillStyle = "#00d8ff";
               if (h == min) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 + 30, -(e[h] * 150/t/2) + 10);
               }   
               else if (h == max) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 + 30, -(e[h] * 150/t/2) - 5);
               }
               else if (h == 0) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 - 1, -(e[h] * 150/t/2) - 3);
               }
               else if (e[h] == 0) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 - 1, -(e[h] * 150/t/2) - 3);
               }
               else if (h == 20) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 + 30, -(e[h] * 150/t/2) - 5);
               }   
               else if (h == 10) {
                   ctx.fillText('(' + (h - 10) + ',' + (e[h]) + ')',15 * h/2 - 1, -(e[h] * 150/t/2) - 3);
               }
               ctx.fill();
               ctx.stroke();
            }
            ctx.stroke();
            ctx.restore();
        }
        trail.push('');
        draw();
        calculation = '';
        length = -1;
    }
    else if ((type == '=') && (brackets != 0)) {
        trail[trail.length-1] = '';
        calculation = '';
        length = 0;
        brackets = 0;
    }
    else if ((type == '4') && (store == true) && (g[g.length - 3] != '>')) {
        trail[trail.length-2] = trail[trail.length-2] + ' -> A';
        storeA = prevAns;
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
    }
    else if ((type == '5') && (store == true) && (g[g.length - 3] != '>')) {
        trail[trail.length-2] = trail[trail.length-2] + ' -> B';
        storeB = prevAns;
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
    }
    else if ((type == '6') && (store == true) && (g[g.length - 3] != '>')) {
        trail[trail.length-2] = trail[trail.length-2] + ' -> C';
        storeC = prevAns;
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
    }
    else if ((type == '/') && (calculation.length > 0) && (brackets == 0)) {
        if ((calculation[calculation.length - 1] == '/') || (calculation[calculation.length - 1] == '*') || (calculation[calculation.length - 1] == '+') || (calculation[calculation.length - 1] == '-')) {
            m = trail[trail.length-2];
            m = m.slice(0,m.length - 1) + '÷';
            trail[trail.length-2] = m;
            calculation = calculation.slice(0,calculation.length - 1) + '/';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + '÷';
            trail.push('');
            calculation = calculation + '/';
            length = -1;
        }
    }
    else if ((type == '*') && (calculation.length > 0) && (brackets == 0)) {
        if ((calculation[calculation.length - 1] == '/') || (calculation[calculation.length - 1] == '*') || (calculation[calculation.length - 1] == '+') || (calculation[calculation.length - 1] == '-')) {
            m = trail[trail.length-2];
            m = m.slice(0,m.length - 1) + 'x';
            trail[trail.length-2] = m;
            calculation = calculation.slice(0,calculation.length - 1) + '*';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + 'x';
            trail.push('');
            calculation = calculation + '*';
            length = -1;
        }
    }
    else if ((type == '+') && (calculation.length > 0) && (brackets == 0)) {
        if ((calculation[calculation.length - 1] == '/') || (calculation[calculation.length - 1] == '*') || (calculation[calculation.length - 1] == '+') || (calculation[calculation.length - 1] == '-')) {
            m = trail[trail.length-2];
            m = m.slice(0,m.length - 1) + '+';
            trail[trail.length-2] = m;
            calculation = calculation.slice(0,calculation.length - 1) + '+';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + '+';
            trail.push('');
            calculation = calculation + '+';
            length = -1;
        }
    }
    else if ((type == '-') && (calculation.length > 0) && (brackets == 0)) {
        if ((calculation[calculation.length - 1] == '/') || (calculation[calculation.length - 1] == '*') || (calculation[calculation.length - 1] == '+') || (calculation[calculation.length - 1] == '-')) {
            m = trail[trail.length-2];
            m = m.slice(0,m.length - 1) + '-';
            trail[trail.length-2] = m;
            calculation = calculation.slice(0,calculation.length - 1) + '-';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + '-';
            trail.push('');
            calculation = calculation + '-';
            length = -1;
        }
    }
    else if ((type == '/') && (calculation.length > 0)) {
        if ((calculation[calculation.length - 1] == 'a') || (calculation[calculation.length - 1] == 'b') || (calculation[calculation.length - 1] == 'c') || (calculation[calculation.length - 1] == 'd')) {
            m = trail[trail.length-1];
            m = m.slice(0,m.length - 1) + 'a';
            trail[trail.length-1] = m;
            calculation = calculation.slice(0,calculation.length - 1) + 'a';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + 'a';
            calculation = calculation + 'a';
            length = -1;
        }
    }
    else if ((type == '*') && (calculation.length > 0)) {
        if ((calculation[calculation.length - 1] == 'a') || (calculation[calculation.length - 1] == 'b') || (calculation[calculation.length - 1] == 'c') || (calculation[calculation.length - 1] == 'd')) {
            m = trail[trail.length-1];
            m = m.slice(0,m.length - 1) + 'b';
            trail[trail.length-1] = m;
            calculation = calculation.slice(0,calculation.length - 1) + 'b';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + 'b';
            calculation = calculation + 'b';
            length = -1;
        }
    }
    else if ((type == '+') && (calculation.length > 0)) {
        if ((calculation[calculation.length - 1] == 'a') || (calculation[calculation.length - 1] == 'b') || (calculation[calculation.length - 1] == 'c') || (calculation[calculation.length - 1] == 'd')) {
            m = trail[trail.length-1];
            m = m.slice(0,m.length - 1) + 'c';
            trail[trail.length-1] = m;
            calculation = calculation.slice(0,calculation.length - 1) + 'c';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + 'c';
            calculation = calculation + 'c';
            length = -1;
        }
    }
    else if ((type == '-') && (calculation.length > 0)) {
        if ((calculation[calculation.length - 1] == 'a') || (calculation[calculation.length - 1] == 'b') || (calculation[calculation.length - 1] == 'c') || (calculation[calculation.length - 1] == 'd')) {
            m = trail[trail.length-1];
            m = m.slice(0,m.length - 1) + 'd';
            trail[trail.length-1] = m;
            calculation = calculation.slice(0,calculation.length - 1) + 'd';
        }
        else {
            trail[trail.length-1] = trail[trail.length-1] + 'd';
            calculation = calculation + 'd';
            length = -1;
        }
    }
    else if ((type == 'Del') && (trail[trail.length-1] != '')) {
        if (calculation[calculation.length-1] == '(') {
            brackets -= 1;
        }
        else if (calculation[calculation.length-1] == ')') {
            brackets += 1;
        }
        trail[trail.length-1] = trail[trail.length-1].slice(0,trail[trail.length-1].length-1);
        calculation = calculation.slice(0,calculation.length-1);
        length -= 2;
    }
    else if ((type == 'Canc') && (trail[trail.length-1] > 0)) {
        trail[trail.length-1] = '';
        calculation = '';
        length = 0;
        brackets = 0;
        ctx.fillStyle = '#333333';
    }
    else if ((store == true) && ((type != '4') || (type != '5') || (type != '6'))) {
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
        length -= 1;
    }
    else if (length > 7) {
        length -= 1;
    }
    else if (shift == true) {
        if (type == 'Canc') {
            trail = [' '];
            calculation = '';
            length = -1;
            ctx.fillStyle = '#333333';
            ctx.fillRect(0,0,250,400);
        }
        else if (type == 'sin') {
            trail[trail.length-1] = trail[trail.length-1] + '£(';
            calculation = calculation + '£(';
            brackets += 1;
        }
        else if (type == 'cos') {
            trail[trail.length-1] = trail[trail.length-1] + '$(';
            calculation = calculation + '$(';
            brackets += 1;
        }
        else if (type == 'tan') {
            trail[trail.length-1] = trail[trail.length-1] + '€(';
            calculation = calculation + '€(';
            brackets += 1;
        }
        else if (type == '4') {
            trail[trail.length-1] = trail[trail.length-1] + '¥';
            calculation = calculation + '¥';
        }
        else if (type == '5') {
            trail[trail.length-1] = trail[trail.length-1] + '©';
            calculation = calculation + '©';
        }
        else if (type == '6') {
            trail[trail.length-1] = trail[trail.length-1] + '®';
            calculation = calculation + '®';
        }
        else if (type == '|') {
            trail[trail.length-1] = trail[trail.length-1] + 'X';
            calculation = calculation + 'q';
        }
        else {
            length -= 1;
        }
        shift = false;
        document.getElementById('Shift').style.backgroundColor = '#ffce00';
        document.getElementById('Shift').style.borderColor = '#ffe200';
        document.getElementById('sin').innerHTML = 'sin';
        document.getElementById('cos').innerHTML = 'cos';
        document.getElementById('tan').innerHTML = 'tan';
        document.getElementById('canc').innerHTML = 'Canc';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        document.getElementById('c').innerHTML = 'C';
    }
    else if ((type == 'Shift') && (store == false)) {
        document.getElementById('Shift').style.backgroundColor = '#ff8000';
        document.getElementById('Shift').style.borderColor = '#ff9d00';
        shift = true;
        document.getElementById('sin').innerHTML = 'sin-1';
        document.getElementById('cos').innerHTML = 'cos-1';
        document.getElementById('tan').innerHTML = 'tan-1';
        document.getElementById('canc').innerHTML = 'Clear';
        document.getElementById('four').innerHTML = 'A';
        document.getElementById('five').innerHTML = 'B';
        document.getElementById('six').innerHTML = 'C';
        document.getElementById('c').innerHTML = 'X';
        length -= 1;
    }
    else if ((type == 'Store') && (store == false)) {
        document.getElementById('Store').style.backgroundColor = '#ff8000';
        document.getElementById('Store').style.borderColor = '#ff9d00';
        document.getElementById('four').innerHTML = '-> A';
        document.getElementById('five').innerHTML = '-> B';
        document.getElementById('six').innerHTML = '-> C';
        store = true;
        length -= 1;
    }
    else if (type == 'Store') {
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
        length -= 1;
    }
    else if (store == true) {
        document.getElementById('Store').style.backgroundColor = '#ffce00';
        document.getElementById('Store').style.borderColor = '#ffe200';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        store = false;
        length -= 1;
    }
    else if (type == 'RadDeg') {
        if (mode == 'Deg') {
            mode = 'Rad';
            document.getElementById('RadDeg').innerHTML = 'Rad';
        }
        else {
            mode = 'Deg';
            document.getElementById('RadDeg').innerHTML = 'Deg';
        }
    }
    else if (type == 'Canc') {
        trail = [' '];
        calculation = '';
        length = 0;
        brackets = 0;
        shift = false;
        document.getElementById('Shift').style.backgroundColor = '#ffce00';
        document.getElementById('Shift').style.borderColor = '#ffe200';
        document.getElementById('sin').innerHTML = 'sin';
        document.getElementById('cos').innerHTML = 'cos';
        document.getElementById('tan').innerHTML = 'tan';
        document.getElementById('canc').innerHTML = 'Canc';
        document.getElementById('four').innerHTML = '4';
        document.getElementById('five').innerHTML = '5';
        document.getElementById('six').innerHTML = '6';
        document.getElementById('c').innerHTML = 'C';
        ctx.fillStyle = '#333333';
        ctx.fillRect(0,0,250,400);
    }
    else if (type == 1) {
        trail[trail.length-1] = trail[trail.length-1] + '1';
        calculation = calculation + '1';
    }
    else if (type == 2) {
        trail[trail.length-1] = trail[trail.length-1] + '2';
        calculation = calculation + '2';
    }
    else if (type == 3) {
        trail[trail.length-1] = trail[trail.length-1] + '3';
        calculation = calculation + '3';
    }
    else if (type == 4) {
        trail[trail.length-1] = trail[trail.length-1] + '4';
        calculation = calculation + '4';
    }
    else if (type == 5) {
        trail[trail.length-1] = trail[trail.length-1] + '5';
        calculation = calculation + '5';
    }
    else if (type == 6) {
        trail[trail.length-1] = trail[trail.length-1] + '6';
        calculation = calculation + '6';
    }
    else if (type == 7) {
        trail[trail.length-1] = trail[trail.length-1] + '7';
        calculation = calculation + '7';
    }
    else if (type == 8) {
        trail[trail.length-1] = trail[trail.length-1] + '8';
        calculation = calculation + '8';
    }
    else if (type == 9) {
        trail[trail.length-1] = trail[trail.length-1] + '9';
        calculation = calculation + '9';
    }
    else if (type == 0) {
        trail[trail.length-1] = trail[trail.length-1] + '0';
        calculation = calculation + '0';
    }
    else if ((type == '.') && (calculation.length == 0)) {
        trail[trail.length-1] = trail[trail.length-1] + '0.';
        calculation = calculation + '0.';    
    }
    else if (type == '.') {
        trail[trail.length-1] = trail[trail.length-1] + '.';
        calculation = calculation + '.';
    }
    else if (type == 'pi') {
        trail[trail.length-1] = trail[trail.length-1] + 'π';
        calculation = calculation + 'π';
    }
    else if (type == '!') {
        trail[trail.length-1] = trail[trail.length-1] + '!';
        calculation = calculation + '!';
    }
    else if ((type == 'Bin') && (trail[trail.length-1].length == 0)) {
        if (trail[trail.length-2] !== undefined) {
            var u = trail[trail.length-2];
            u = parseInt(u,base);
            u = u.toString(2);
            trail[trail.length-2] = u;
            base = 2;
            baseChanged = true;
        }
    }
    else if ((type == 'Oct') && (trail[trail.length-1].length == 0)) {
        if (trail[trail.length-2] !== undefined) {
            var u = trail[trail.length-2];
            u = parseInt(u,base);
            u = u.toString(8);
            trail[trail.length-2] = u;
            base = 8;
            baseChanged = true;
        }
    }
    else if ((type == 'Dec') && (trail[trail.length-1].length == 0)) {
        if (trail[trail.length-2] !== undefined) {
            var u = trail[trail.length-2];
            u = parseInt(u,base);
            u = u.toString(10);
            trail[trail.length-2] = u;
            base = 10;
            baseChanged = true;
        }
    }
    else if ((type == 'Hex') && (trail[trail.length-1].length == 0)) {
        if (trail[trail.length-2] !== undefined) {
            var u = trail[trail.length-2];
            u = parseInt(u,base);
            u = u.toString(16);
            trail[trail.length-2] = u;
            base = 16;
            baseChanged = true;
        }
    }
    else if (type == 'sin') {
        trail[trail.length-1] = trail[trail.length-1] + ':(';
        calculation = calculation + ':(';
        brackets += 1;
    }
    else if (type == 'cos') {
        trail[trail.length-1] = trail[trail.length-1] + ';(';
        calculation = calculation + ';(';
        brackets += 1;
    }
    else if (type == 'tan') {
        trail[trail.length-1] = trail[trail.length-1] + '#(';
        calculation = calculation + '#(';
        brackets += 1;
    }
    else if (type == '^') {
        trail[trail.length-1] = trail[trail.length-1] + '^(';
        calculation = calculation + '^(';
        brackets += 1;
    }
    else if (type == 'root') {
        trail[trail.length-1] = trail[trail.length-1] + '√(';
        calculation = calculation + '√(';
        brackets += 1;
    }
    else if (type == '|') {
        trail[trail.length-1] = trail[trail.length-1] + 'C';
        calculation = calculation + '|';
    }
    else if (type == '(') {
        trail[trail.length-1] = trail[trail.length-1] + '(';
        calculation = calculation + '(';
        brackets += 1;
    }
    else if ((type == ')') && (brackets > 0)) {
        trail[trail.length-1] = trail[trail.length-1] + ')';
        calculation = calculation + ')';
        brackets -= 1;
    }
    else if (type == 'Rand') {
        trail[trail.length-1] = trail[trail.length-1] + '<';
        calculation = calculation + '<';
    }
    else if ((type == '%') && (calculation.length > 0)) {
        trail[trail.length-1] = trail[trail.length-1] + '%';
        calculation = calculation + '/100';
    }
    else if ((type == '%') && (trail.length > 1)) {
        m = trail[trail.length-2];
        if (m[m.length-1] != '%') {
            m = m*100 + '%';
            trail[trail.length-2] = m;
            calculation = calculation.slice(0,calculation.length - 1)*100 + '%';
            delCalc = true;
        }
    }
    else if (type == 'Ans') {
        trail[trail.length-1] = trail[trail.length-1] + '@';
        calculation = calculation + '@';
    }
    else {
        length -= 1;
    }
    length += 1;
    if (trail[trail.length-1].length == 0) {
        length = 0;
    }
    if (baseChanged == false) {
        base = 10;
    }
    draw();
}

window.onerror = function(error) {
    trail[trail.length-1] = '';
    calculation = '';
    draw();
    alert('An error has occurred - reloading automatically');
    location.reload();
};

document.addEventListener('keydown', function(event) {
    setTimeout(function(){
        if(event.keyCode == 49) {
            if (shift == true) {
                shift = false;
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                clicker('!');
            }
            else {
                clicker(1);
            }
        }
        else if(event.keyCode == 50) {
            clicker(2);
        }
        else if(event.keyCode == 51) {
            clicker(3);
        }
        else if(event.keyCode == 52) {
            if (shift == false) {
                clicker(4);
            }
            else {
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                shift = false;
            }
        }
        else if(event.keyCode == 53) {
            if (shift == true) {
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                shift = false;
                clicker('%');
            }
            else {
                clicker(5);
            }
        }
        else if(event.keyCode == 54) {
            if (shift == true) {
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                shift = false;
                clicker('^');
            }
            else {
                clicker(6);
            }
        }
        else if(event.keyCode == 55) {
            clicker(7);
        }
        else if(event.keyCode == 56) {
            if (shift == true) {
                shift = false;
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                clicker('*');
            }
            else {
                clicker(8);
            }
        }
        else if(event.keyCode == 57) {
            if (shift == true) {
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                shift = false;
                clicker('(');
            }
            else {
                clicker(9);
            }
        }
        else if(event.keyCode == 48) {
            if (shift == true) {
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                document.getElementById('c').innerHTML = 'C';
                shift = false;
                clicker(')');
            }
            else {
                clicker(0);
            }
        }
        else if(event.keyCode == 97) {
            clicker(1);
        }
        else if(event.keyCode == 98) {
            clicker(2);
        }
        else if(event.keyCode == 99) {
            clicker(3);
        }
        else if(event.keyCode == 100) {
            clicker(4);
        }
        else if(event.keyCode == 101) {
            clicker(5);
        }
        else if(event.keyCode == 102) {
            clicker(6);
        }
        else if(event.keyCode == 103) {
            clicker(7);
        }
        else if(event.keyCode == 104) {
            clicker(8);
        }
        else if(event.keyCode == 105) {
            clicker(9);
        }
        else if(event.keyCode == 96) {
            clicker(0);
        }
        else if(event.keyCode == 88) {
            clicker('*');
        }
        else if(event.keyCode == 187) {
            clicker('+');
        }
        else if(event.keyCode == 189) {
            clicker('-');
        }
        else if(event.keyCode == 191) {
            if (shift == true) {
                shift = false;
                document.getElementById('Shift').style.backgroundColor = '#ffce00';
                document.getElementById('Shift').style.borderColor = '#ffe200';
                document.getElementById('sin').innerHTML = 'sin';
                document.getElementById('cos').innerHTML = 'cos';
                document.getElementById('tan').innerHTML = 'tan';
                document.getElementById('canc').innerHTML = 'Canc';
                document.getElementById('four').innerHTML = '4';
                document.getElementById('five').innerHTML = '5';
                document.getElementById('six').innerHTML = '6';
                clicker('Rand');
            }
            else {
                clicker('/');
            }
        }
        else if(event.keyCode == 106) {
            clicker('*');
        }
        else if(event.keyCode == 107) {
            clicker('+');
        }
        else if(event.keyCode == 109) {
            clicker('-');
        }
        else if(event.keyCode == 111) {
            clicker('/');
        }
        else if(event.keyCode == 13) {
            clicker('=');
        }
        else if(event.keyCode == 46) {
            clicker('Del');
        }
        else if(event.keyCode == 27) {
            clicker('Canc');
        }
        else if(event.keyCode == 16) {
            clicker('Shift');
        }
        else if(event.keyCode == 67) {
            clicker('|');
        }
        else if(event.keyCode == 65) {
            clicker('Ans');
        }
        else if(event.keyCode == 190) {
            clicker('.');
        }
        else if(event.keyCode == 80) {
            clicker('pi');
        }
        else if(event.keyCode == 82) {
            clicker('root');
        }
    }, 5);
});