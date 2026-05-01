function showMenu(){
    el = document.getElementsByClassName("settings-wrapper")[0];

    el.classList.remove("hide");
    el.classList.add("show");
}

function hideMenu(){
    el = document.getElementsByClassName("settings-wrapper")[0];

    el.classList.add("hide");
    el.classList.remove("show");
}