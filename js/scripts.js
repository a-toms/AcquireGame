function drawBoard(){
    console.log('LOADED');
    var link = document.getElementById('demo');
    link.textContent = 'Mozilla Developer Network';
}


window.addEventListener('load', drawBoard);