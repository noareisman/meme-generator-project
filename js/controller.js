'use strict';


var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    drawMeme(1);
    // console.log(txt);
    // console.log(gCtx);
}


function onSave() {
    save()
}

function onDownload() {
    download()
}


function onShare() {
    share()
}

// function drawImg() {
//     const elImg = document.querySelector('img')
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function drawMeme(imgNum) {
    const img = new Image()
    img.src = `./img/${imgNum}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        var txt = gMeme.lines[0].txt;
        drawText(txt, 250, 50);

    }
}

function onAdd(){
    var text = document.querySelector('input[name=text]').value;
    console.log(text);
    gMeme.lines[0].txt=text;
    console.log(gMeme.lines[0]);
    drawMeme(1);
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

var font = document.querySelector('.font-selector').value;
var textColor = document.querySelector('input[name=text-fill-color]').value;
var textStrokeColor = document.querySelector('input[name=text-stroke-color]').value;
var chosenFont = document.querySelector('.font-selector').value;
var lineAlignment = 'left';
var text = document.querySelector('input[name=text]').value;

// drawText(text,50,250)

// function drawImgFromRemote() {
    //     const img = new Image()
    //     img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    //     img.onload = () => {
        //         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
//     }
// }


