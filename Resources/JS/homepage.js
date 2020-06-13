//Variable Declarations and Function Definitions 

MorphSVGPlugin.convertToPath("circle, ellipse");
var logo = $(".Actual_Logo_Svg");

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


function moveLogo() {
    gsap.to(logo, {
        attr: { viewBox: "-150 -350 3574 880" },
        duration: 3
    })
    fadeIn()
}

function fadeIn() {
    gsap.to('.nav_links', {
        display: "block",
        scale: 1,
        duration: 3
    })
    gsap.fromTo('.logo_heading', {
        x: 1340,
        y: 20
    },
        {
            display: "block",
            x: -1540,
            y: 40,
            // scale:1,
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