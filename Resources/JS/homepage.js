//Variable Declarations and Function Definitions 

let viewBox = "",
    heading_Pos = [0, 0],
    displayState = ""
hamburger_display_button = Array.from($('.mobile_nav_sticky'))[0]
opened_nav_buttons = document.querySelector('.options')

MorphSVGPlugin.convertToPath("circle, ellipse");
var logo = $(".Actual_Logo_Svg");

window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox', '-350 -700 1274 1680') : logo.attr('viewBox', '-680 -380 2074 1080')

const logo_tl = new TimelineMax({
    onComplete: moveLogo,
    defaults: { ease: "power3.inOut", duration: 0.8 }
});

var firstAnimation = gsap.to('.shapes', {
    duration: 2,
    morphSVG: ".Logo_Proper_Background"
});

var secondAnimation = gsap.to('.textShape', {
    duration: 2,
    fill: '#1D373F',
    morphSVG: ".Logo_Proper_Text"
});

var shapes = Array.from($('.Logo_In_Shapes path'));

const changeViewBox = media_query => {
    media_query.matches ? viewBox = "-150 -180 2495 890" : viewBox = "-150 -350 3574 880"
    media_query.matches ? heading_Pos = [-511, -15] : heading_Pos = [-1540, 40];
    media_query.matches ? displayState = "none" : displayState = "block"
}


function moveLogo() {
    var x = window.matchMedia("(max-width: 600px)")
    changeViewBox(x)
    gsap.to(logo, {
        attr: { viewBox: viewBox },
        duration: 3
    })
    fadeIn()
}

const pageTransition = () => {
    // console.log('Well')
    // gsap.to(data.current.container, {
    //     opacity: 0

    // })
    // console.log('Well')
    // gsap.to(data.next.container, {
    //     opacity: 1
    // })
    var tl = gsap.timeline();
    tl.to('.loading_container' , {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    })
    .to('.loading_container' , {
        background: "#f0c368"
    })
    .to('.loading_container' , {
        duration: 1.2,
        width: "0%",
        right: "0%",
        ease: "Expo.easeInOut",
    })

    // .to('.loading_container' , {
    //     background: "#1d373f",
    //     width: "0vw",
    //     duration: 3
    // });
    // tl.set('.loading-screen', { transformOrigin: "middle left" });
    // tl.to('.loading-screen', { duration: .5, scaleY: 1 });
    // tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "middle left", ease: "power1.out", delay: 1 });
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        duration: 5
    }, "+=.7")
}


// Initialization Methods

logo_tl.staggerFrom(shapes, 1, {
    y: -600,
    autoAlpha: 0,
    ease: "bounce"
}, 0.15);
logo_tl.staggerTo(shapes, 1, {
    fill: '#F0C368'
}, 0.05)

logo_tl.add([firstAnimation, secondAnimation])

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
        async after(data) {
            // tl.pause(0);
            logo_tl.reversed() ? logo_tl.play() : logo_tl.reverse();
        },
        // async once(data) {
        //     contentAnimation();
        // }

    }]
});
