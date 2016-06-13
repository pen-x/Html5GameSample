var cwidth = 800;
var cheight = 600;
var cardw = 75;
var cardh = 107;
var playerxp = 100;
var playeryp = 300;
var housexp = 500;
var houseyp = 100;
var housetotal;
var playertotal;
var pi = 0;
var hi = 0;
var deck = [];
var playerhand = [];
var househand = [];
var back = new Image();

function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "italic 20pt Georgia";
    ctx.fillStyle = "blue";
    builddeck();
    back.src = "images/back.png";
    canvas1 = document.getElementById('canvas');
    window.addEventListener('keydown', getkey, false);
    shuffle();
    dealstart();
}

function getkey(event) {
    var keyCode;
    if (event == null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    } else {
        keyCode = event.keyCode;
        event.preventDefault();
    }
    switch (keyCode) {
        case 68:
            deal();
            break;
        case 72:
            playerdone();
            break;
        case 78:
            newgame();
            break;
        default:
            alert("Press d, h or n.");
    }
}

function dealstart() {
    playerhand[pi] = dealfromdeck(1);
    ctx.drawImage(playerhand[pi].picture, playerxp, playeryp, cardw, cardh);
    playerxp += 30;
    pi ++;
    
    househand[hi] = dealfromdeck(2);
    ctx.drawImage(back, housexp, houseyp, cardw, cardh);
    housexp += 20;
    hi ++;

    playerhand[pi] = dealfromdeck(1);
    ctx.drawImage(playerhand[pi].picture, playerxp, playeryp, cardw, cardh);
    playerxp += 30;
    pi ++;

    househand[hi] = dealfromdeck(2);
    ctx.drawImage(househand[hi].picture, housexp, houseyp, cardw, cardh);
    housexp += 20;
    hi ++;
}

function deal() {
    playerhand[pi] = dealfromdeck(1);
    ctx.drawImage(playerhand[pi].picture, playerxp, playeryp, cardw, cardh);
    playerxp += 30;
    pi ++;
    if (more_to_house()) {
        househand[hi] = dealfromdeck(2);
        ctx.drawImage(househand[hi].picture, housexp, houseyp, cardw, cardh);
        housexp += 20;
        hi ++;
    }
}

function more_to_house() {
    var ac = 0;
    var i;
    var sumup = 0;
    for (i = 0; i < hi; i++) {
        sumup += househand[i].value;
        if (househand[i].value == 1) {
            ac ++;
        }
    }
    if (ac > 0) {
        if ((sumup + 10) <= 21) {
            sumup += 10;
        }
    }
    housetotal = sumup;
    if (sumup < 17) {
        return true;
    } else {
        return false;
    }
}

function dealfromdeck(who) {
    var card;
    var ch = 0;
    while ((deck[ch].dealt > 0) && (ch < 51)) {
        ch ++;
    }
    if (ch >= 51) {
        ctx.fillText("NO MORE CARDS IN DECK. RELOAD!!!", 200, 250);
        ch = 51;
    }
    deck[ch].dealt = who;
    card = deck[ch];
    return card;
}

function builddeck() {
    var n;
    var si;
    var suitnames = ["c", "h", "s", "d"];
    var i = 0;
    var picname;
    var nums = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    for (si = 0; si < 4; si++) {
        for (n = 0; n < 13; n++) {
            picname = "images/" + suitnames[si] + "-" + nums[n] + ".png";
            deck[i] = new MCard(n + 1, suitnames[si], picname);
            i ++;
        }
    }
}

function MCard (n, s, picname) {
    this.num = n;
    if (n > 10) {
        n = 10;
    }
    this.value = n;
    this.suit = s;
    this.picture = new Image();
    this.picture.src = picname;
    this.dealt = 0;
}

function add_up_player() {
    var ac = 0;
    var i;
    var sumup = 0;
    for (i = 0; i < pi; i++) {
        sumup == playerhand[i].value;
        if (playerhand[i].value == 1) {
            ac ++;
        }
    }
    if (ac > 0) {
        if ((sumup + 10) <= 21) {
            sumup += 10;
        }
    }
    return sumup;
}

function playerdone() {
    while (more_to_house()) {
        househand[hi] = dealfromdeck(2);
        ctx.drawImage(back, housexp, houseyp, cardw, cardh);
        housexp += 20;
        hi ++;
    }
    showhouse();
    playertotal = add_up_player();
    if (playertotal > 21) {
        if (housetotal > 21) {
            ctx.fillText("You and house both went over.", 30, 100);
        } else {
            ctx.fillText("You went over and lost.", 30, 100);
        }
    } else if (housetotal > 21) {
        ctx.fillText("You won. House went over.", 30, 100);
    } else {
        if (playertotal > housetotal) {
            ctx.fillText("You won.", 30, 100);
        } else if (playertotal == housetotal) {
            ctx.fillText("TIE!", 30, 100);
        } else {
            ctx.fillText("You lost.", 30, 100);
        }
    }
}

function newgame() {
    ctx.clearRect(0, 0, cwidth, cheight);
    pi = 0;
    hi = 0;
    playerxp = 100;
    housexp = 500;
    dealstart();
}

function showhouse() {
    var i;
    housexp = 500;
    for (i = 0; i < hi; i++) {
        ctx.drawImage(househand[i].picture, housexp, houseyp, cardw, cardh);
        housexp += 20;
   }
}    

function shuffle() {
    var i = deck.length - 1;
    var s;
    while (i > 0) {
        s = Math.floor(Math.random() * (i + 1));
        swapindeck(s, i);
        i --;
    }
}

function swapindeck(j, k) {
    var hold = new MCard(deck[j].num, deck[j].suit, deck[j].picture.src);
    deck[j] = deck[k];
    deck[k] = hold;
}

document.body.onload = init;
