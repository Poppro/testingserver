/**
 * Created by Popinator on 8/8/2017.
 */
window.addEventListener('hashchange', function() {
    console.log(window.location.hash);
});

function getFile(fileid, fileStr) {
    $.ajax({
        url: "/handle",
        type: "POST",
        data: {fileSel: fileid, fileStr: fileStr},
        success: function (data) {
            if(data.redirect != undefined) {
                window.location = data.redirect;
            }
        },
        dataType: "json"
    });
}

function openNav() {
    document.getElementById("navmen").style.width = "10%";
    document.getElementById("navmen").style.animationName = "navslidein";
    document.getElementById("main").style.animationName = "mainslidein";
    document.getElementById("main").style.left = "10%";
    document.getElementById("main").style.width = "90%";
    document.getElementById("changer").style.animationName = "rotate90";
    document.getElementById("changer").style.animationDuration = ".5s";
    document.getElementById("changer").style.transform = "rotate(90deg)";
    document.getElementById("changer").onclick = closeNav;
    console.log(document.getElementById("changer").onclick);
}
function closeNav() {
    document.getElementById("navmen").style.width = "0px";
    document.getElementById("navmen").style.animationName = "navslideout";
    document.getElementById("main").style.animationName = "mainslideout";
    document.getElementById("changer").style.animationName = "rotaten90";
    document.getElementById("changer").style.animationDuration = ".5s";
    document.getElementById("changer").style.transform = "rotate(0deg)";
    document.getElementById("main").style.left = "0%";
    document.getElementById("main").style.width = "100%";
    document.getElementById("changer").onclick = openNav;
    console.log(document.getElementById("changer").onclick);
}