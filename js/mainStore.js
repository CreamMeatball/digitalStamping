window.onload = function() {

    stampImageHeight();

}

window.addEventListener("resize", function() {

    stampImageHeight();

})

function stampImageHeight() {

    var stampWidthNumber = 4;
    var stampContainerWidth = $('.stampContainer').width();
    console.log(stampContainerWidth);
    var stampImage = $('.stampImage');
    stampImage.height(stampContainerWidth/stampWidthNumber);
    console.log(stampImage.height());

}