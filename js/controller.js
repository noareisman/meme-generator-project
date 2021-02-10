'use strict';


var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.font='impact';
    gCurrLine = 0;
    // console.log(txt);
    // console.log(gCtx);
    // initHendlers()
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

function onSelectImg(elImg){
    gMeme.selectedImgId=elImg.id
    drawMeme(gMeme.selectedImgId);
}

function onAdd(){
    addLine();
}

function onChangeFontSize(sign){
onChangeFontSize(sign);
}

function onUpdateTxt(){
    var newText=document.querySelector('input[name=text]').value;
    console.log(newText);
    if (!newText) newText=document.querySelector('input[name=text]').value;
    console.log(newText);
    gMeme.lines[gMeme.selectedLineIdx].txt= newText;
    drawMeme(gMeme.selectedImgId);
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


