//JQuery plug-in - 10%
//function - 2%
//using slick jquery plug-in to built automated slider

function styling(){
    $('.demo').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        slidesToShow: 1,
        adaptiveHeight: false,
        arrows: false,
    });
}

styling();