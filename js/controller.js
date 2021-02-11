'use strict';


var gElAbout = document.querySelector('.creator');
var gElMemeGenerator = document.querySelector('.meme-generator-container');
var gElGallery = document.querySelector('.img-gallery-container');
var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.font='impact';
    // console.log(txt);
    // console.log(gCtx);
    // initHendlers()
    loadImgs();
}

function loadImgs(){ 
var strHTML='';
var elImgContainer=document.querySelector('.img-grid-container');
for (var i=1;i<19;i++){
    strHTML+=` <article><img class="img-item" id="${i}" src="img/${i}.jpg" onclick="onSelectImg(this)"></article>`
}
elImgContainer.innerHTML=strHTML;
}


function onSave() {
    save()
}

function onDownload(elLink) {
    download(elLink)
}

function onShare(elForm, event) {
    share(elForm, event);
}

// function drawImg() {
//     const elImg = document.querySelector('img')
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }

function onSelectImg(elImg){
    gMeme.selectedImgId=elImg.id
    onOpenMemeGenerator()
    drawMeme(gMeme.selectedImgId);
}

function onOpenMemeGenerator(){
    gElMemeGenerator.style='display: flex'
    gElGallery.style='display: none'
    gElAbout.style='display: none'
}

function onOpenGallery(){
    gElMemeGenerator.style='display: none'
    gElGallery.style='display: flex'
    gElAbout.style='display: flex'
}

function onAdd(){
    addLine();
}

function onDelete(){
    deleteLine();
}

function onMoveLine(direction){
moveLine(direction);
}

function onSwitchLines(){
    switchLines();
}

function onAlign(direction){
    align(direction);
}

function onChangeFontSize(sign){
changeFontSize(sign);
}

function onUpdateTxt(){
    var newText=document.querySelector('input[name=text]').value;
    // if (!newText) newText=document.querySelector('input[name=text]').value;
    // console.log(newText);
    gMeme.lines[gMeme.selectedLineIdx].txt= newText;
    drawMeme(gMeme.selectedImgId);
}

function onUpdateMeme(changedItem){
    update(changedItem);
}




// drawText(text,50,250)

// function drawImgFromRemote() {
    //     const img = new Image()
    //     img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    //     img.onload = () => {
        //         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
//     }
// }


