//Variable Declarations and Function Definitions 
let viewBox = "",
    heading_Pos = [0, 0],
    displayState = ""
    hamburger_display_button = Array.from($('.mobile_nav_sticky'))[0]
    opened_nav_buttons = document.querySelector('.options')
    logo = $(".Actual_Logo_Svg");
    // Morphing Circles and ellipses to paths to be able to morph them and checking the viewbox for device size
    MorphSVGPlugin.convertToPath("ellipse");
    shapes = Array.from($('.Logo_In_Shapes path'))

const init = () => {
    viewBox = "",
    heading_Pos = [0, 0],
    displayState = ""
    hamburger_display_button = Array.from($('.mobile_nav_sticky'))[0]
    opened_nav_buttons = document.querySelector('.options')
    logo = $(".Actual_Logo_Svg");
    // Morphing Circles and ellipses to paths to be able to morph them and checking the viewbox for device size
    MorphSVGPlugin.convertToPath("ellipse");
    shapes = Array.from($('.Logo_In_Shapes path'))
}
    
const logo_tl_func = () => {
    let logo_tl = gsap.timeline({
        onComplete: moveLogo,
    })
    // Morphing into the Logo
    logo_tl.from(shapes, 1, {
        y: -600,
        autoAlpha: 0,
        ease: "bounce",
        stagger: 0.15
    })
    logo_tl.to(shapes, 1, {
        fill: '#F0C368',
        stagger: 0.05
    })
    let firstAnimation = gsap.to('.shapes', {
        duration: 2,
        morphSVG: ".Logo_Proper_Background"
    });
    let secondAnimation = gsap.to('.textShape', {
        duration: 2,
        fill: '#1D373F',
        morphSVG: ".Logo_Proper_Text"
    });
    logo_tl.add([firstAnimation, secondAnimation])
}

const changeViewBox = media_query => {
    media_query.matches ? viewBox = "-150 -180 2495 890" : viewBox = "-150 -350 3574 880"
    media_query.matches ? heading_Pos = [-511, -15] : heading_Pos = [-1540, 40];
    media_query.matches ? displayState = "none" : displayState = "block"
}

const moveLogo = () => {
    gsap.to(logo, {
        attr: { viewBox: viewBox },
        duration: 3
    })
    fadeInHeadingAndLinks();
}

const fadeInHeadingAndLinks = () => {
    gsap.to('.nav_links', {
        display: displayState,
        scale: 1,
        duration: 3
    })
    gsap.to('.logo_heading', {
        display: "block",
        x: heading_Pos[0],
        y: heading_Pos[1],
        // scale:1,
        duration: 3
    })
    gsap.to('.mobile_nav_sticky', {
        display: "block",
        scale: 1,
        duration: 5
    }, "+=.7")
}

const pageTransition = () => {
    var tl = gsap.timeline();
    tl.set('.loading_container img' , {
        scale: 0.5
    })
    tl.to('.loading_container', {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "circ.out",
    })
    .to('.loading_container img' , {
        scale : 0.7,
        duration: 1
    } , "-=1.2")
    
    .to('.loading_container', {
        duration: 1.2,
        width: "0%",
        right: "0%",
        ease: "circ.out",
    })
    .to('.loading_container img' , {
        scale : 0.3,
        duration: 1.2
    }, "-=1.3")
}

// Helper Functions

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialization Methods
$(document).ready(() => {
    window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox', '-350 -700 1274 1680') : logo.attr('viewBox', '-680 -380 2074 1080')
    var viewbox = window.matchMedia("(max-width: 600px)")
    changeViewBox(viewbox)
})

hamburger_display_button.onclick = () => {
    opened_nav_buttons.classList.toggle('open')
};

barba.init({
    sync: true,
    transitions: [{
        async leave(data) {
            const done = this.async();
            pageTransition();
            await delay(1000);
            done();
        },
        async enter(data) {
            window.scrollTo(0, 0);
        },
    }]
});

// barba.hooks.enter(() => {
    
// });
barba.hooks.afterEnter(() => {
    init()
    window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox', '-350 -700 1274 1680') : logo.attr('viewBox', '-680 -380 2074 1080')
    var viewbox = window.matchMedia("(max-width: 600px)")
    changeViewBox(viewbox)
    console.log(hamburger_display_button)
    logo_tl_func();
    hamburger_display_button.onclick = () => {
        opened_nav_buttons.classList.toggle('open')
    };
});

