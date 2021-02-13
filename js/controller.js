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

function onDownload(elLink) {
    download(elLink)
}

function onShare(elForm, event) {
    share(elForm, event);
}

function onSelectImg(elImg){
    gMeme.selectedImgId=elImg.id
    onOpenMemeGenerator()
    renderMeme();
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

function onSwitchLines(){
    switchLines();
}
function onUpdateTxt(elTxt){
    updateTxt(elTxt);
    renderMeme();
}


function onMoveLine(direction){
moveLine(direction);
}


function onAlign(direction){
    align(direction);
}

function onChangeFontSize(sign){
changeFontSize(sign);
}

function onUpdateColor(changedItem,color){
    gCtx.save();
    updateColor(changedItem,color);
}




