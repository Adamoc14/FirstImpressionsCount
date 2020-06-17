//Variable Declarations and Function Definitions 

let viewBox = "", 
    heading_Pos = [0,0],
    displayState = ""
MorphSVGPlugin.convertToPath("circle, ellipse");
var logo = $(".Actual_Logo_Svg");

window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox' , '-350 -700 1274 1680') : logo.attr('viewBox' , '-680 -380 2074 1080')

var firstAnimation = gsap.to('.shapes', {
    duration: 2,
    morphSVG: ".Logo_Proper_Background"
});

var secondAnimation = gsap.to('.textShape', {
    duration: 2,
    fill: '#1D373F',
    morphSVG: ".Logo_Proper_Text"
});

const tl = new TimelineMax({
    onComplete: moveLogo,
    defaults: { ease: "power3.inOut", duration: 0.8 }
});

var shapes = Array.from($('.Logo_In_Shapes path'));

const changeViewBox = media_query => {
    media_query.matches ? viewBox = "-150 -180 2495 890" : viewBox = "-150 -350 3574 880"
    media_query.matches ? heading_Pos = [-511 , -15] : heading_Pos = [-1540, 40];
    console.log(heading_Pos);
    media_query.matches ? displayState = "none" : displayState = "block"
}

function moveLogo() {
    var x = window.matchMedia("(max-width: 600px)")
    changeViewBox(x)
    gsap.to(logo, {
        attr: { viewBox: viewBox},
        duration: 3
    })
    fadeIn()
}

function fadeIn() {
    gsap.to('.nav_links', {
        display: displayState,
        scale: 1,
        duration: 3
    })
    gsap.fromTo('.logo_heading', {
        x: 1340,
        y: 20
    },
    {
        display: "block",
        x: heading_Pos[0],
        y: heading_Pos[1],
        // scale:1,
        duration: 3
    })
    gsap.to('.mobile_nav_sticky', {
        display: "block",
        scale: 1,
        duration: 3
    })
}


// Initialization Methods

tl.staggerFrom(shapes, 1, {
    y: -600,
    autoAlpha: 0,
    ease: "bounce"
}, 0.15);
tl.staggerTo(shapes, 1, {
    fill: '#F0C368'
}, 0.05)

tl.add([firstAnimation, secondAnimation]);