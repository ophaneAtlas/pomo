function highlight(){
    highlightElArr = document.getElementsByClassName("highlight-flag");

    var flag = document.createTextNode("   ⚪");

    for(let i =0; i<highlightElArr.length; i++){
        highlightElArr[i].appendChild(flag);
    }
}

//highlight();