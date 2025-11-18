// Write JavaScript here
//カードの配列
let cards = [];
let kinds=["A","B","C","D","E","F"];
let pairNum=1;
for(let kind of kinds){
    for(let i = 0;i < pairNum * 2 ; i++){
        cards.push(kind);
    }
}
let openedIds=[];
let openedNum=0;
let turn=0;
 //カードを裏返す
 function openCard(clickCard){
    if(clickCard.dataset.opened==1){
        return;
    }
    if(openedIds.length<2){
    clickCard.dataset.opened=1;
    clickCard.innerHTML=clickCard.dataset.value;
    openedIds.push(clickCard);
    turn++;
    if(openedIds.length==2){
        setTimeout(checkMatch,500);
       }
    } 
 }

function checkMatch() {
    if(openedIds[0].dataset.value==openedIds[1].dataset.value){
        openedNum+=2;
        if(openedNum==cards.length){
            const resultText=document.querySelector("#resultText");
            resultText.textContent=turn+"ターンでクリア！！！！！！！！！！！！！！！！"
            resultText.setAttribute("style","font-size:50px")
        }
    }else{
        openedIds[0].dataset.opened=0;
        openedIds[0].innerHTML="";
        openedIds[1].dataset.opened=0;
        openedIds[1].innerHTML="";
    }
    openedIds=[];
}
 //シャッフル
 
    let shuffledCards=cards.sort(()=>{
    return 0.5-Math.random();
 })
 
 
//HTMLを作る
let html="";
for(let card of shuffledCards){
    html+='<div data-value="'+card+'" data-opened="0"></div>';
}
//カードを設定する
let gameBoard=document.querySelector("#gameBoard");
gameBoard.innerHTML=html;
//イベント設定
let cardElements=gameBoard.querySelectorAll("div");
for (let cardElem of cardElements){
    cardElem.addEventListener("click",(e)=>{
        openCard(e.target);
    })
}
