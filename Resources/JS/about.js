// Variable Declarations and Function Definitions

const face_tl_func = () => {
    let face_tl = gsap.timeline(),
        paths = document.querySelectorAll('.My_Face path'),
        filledYellowElements = ['.Main_Hair_Part', '.Eyeball_2', '.Eyeball_1', '.Nostril_1', '.Nostril_2', '.Tongue_Part'],
        filledNavyElements = ['.Pupil_2', '.Pupil_1'];
    face_tl.set(filledNavyElements, { fill: 'unset' }),
        face_tl.set(filledYellowElements, { fill: 'unset' }),
        face_tl.fromTo(paths, { drawSVG: "0%" }, { duration: 1, drawSVG: "100% ", stagger: 0.15 })
    let firstAnimation = gsap.to(filledYellowElements, {
        duration: 2,
        ease: "slow",
        fill: '#F0C368'
    }, "-=.7"),
        secondAnimation = gsap.to(filledNavyElements, {
            duration: 2,
            ease: "bounce",
            fill: '#1D373F'
        }, "-=.7")
    face_tl.add([firstAnimation, secondAnimation])
}


const scroll_p_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.content',
            start: "top center",
            end: "+=1000",
            markers: true,
            scrub: true
            // pin: true
        }
    })
    scroll_tl.to('.first', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: .5,
    }),
        scroll_tl.to('.flag', {
            scale: 1
        }, '-=.1'),
        scroll_tl.addLabel("first_down")
    scroll_tl.to('.second', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 2,
    }, "first_down-=.1")
    scroll_tl.addLabel("second_down")
    scroll_tl.to('.third', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 2,
    }, "second_down-=.01")
}


const scroll_skills_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.skillsContainer',
            start: "top center",
            markers: true,

        }
    }),
        barWidth = "",
        bars = [...document.querySelectorAll('.bar')]
    bars.map(bar => {
        barWidth = bar.dataset.width;
        let barAnimation = gsap.to(bar, {
            width: barWidth,
        }),
            percentageAniamtion = gsap.to('.percentage', {
                scale: 1,
            })
        scroll_tl.add([barAnimation, percentageAniamtion]);
    })

}

const scroll_facts_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.factsContainer',
            start: "top center",
            // pin: true,
            scrub: true,
            end: "+=300",
            markers: true,
        }
    }),
        facts = [...document.querySelectorAll('.fact')]
    scroll_tl.to('.factsContainer h2', {
        scale: 1.5,
        duration: 1,
        ease: "slow"
    })
    scroll_tl.to(facts, {
        xPercent: -85 * (facts.length - 1),
        scrollTrigger: {
            trigger: ".factsContainer_sm",
            start: "center center",
            pin: true,
            // pinSpacing:false,
            markers: true,
            scrub: 1,
            snap: 1 / (facts.length - 1),
            // base vertical scrolling on how wide the container is so it feels more natural.
            end: () => "+=" + document.querySelector(".factsContainer_sm").offsetWidth
        }
    });
}

const pageTransition = () => {
    var tl = gsap.timeline();
    tl.set('.loading_container img', {
        scale: 0.3
    })
    tl.to('.loading_container', {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "circ.out",
    })
        .to('.loading_container img', {
            scale: 0.6,
            duration: 1
        }, "-=1.2")

        .to('.loading_container', {
            duration: 1.2,
            width: "0%",
            right: "0%",
            ease: "circ.out",
        })
        .to('.loading_container img', {
            scale: 0.3,
            duration: 1.2
        }, "-=1.3")
}

// Helper Functions

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Initialization Methods

face_tl_func();
scroll_p_tl_func();
scroll_skills_tl_func();
scroll_facts_tl_func();

// barba.init({
//     sync: true,
//     transitions: [{
//         async leave() {
//             const done = this.async();
//             pageTransition();
//             await delay(1000);
//             done();
//         },
//         async enter() {
//             window.scrollTo(0, 0);
//         },
//     }],
//     views: [
//         {
//             namespace: 'home',
//             afterEnter() {
//                 init()
//                 window.matchMedia("(max-width: 600px)").matches ? logo.attr('viewBox', '-350 -700 1274 1680') : logo.attr('viewBox', '-680 -380 2074 1080')
//                 var viewbox = window.matchMedia("(max-width: 600px)")
//                 changeViewBox(viewbox)
//                 console.log(hamburger_display_button)
//                 logo_tl_func();
//                 hamburger_display_button.onclick = () => {
//                     opened_nav_buttons.classList.toggle('open')
//                 }
//             },
//         },
//         {
//             namespace: 'about',
//             afterEnter(data) {
//                 face_tl_func();
//                 scroll_p_tl_func();
//                 scroll_skills_tl_func();
//                 scroll_facts_tl_func();
//             },
//         }
//         // More namespaces, like maybe 'about' for your about.html ...
//     ],
// });

// barba.hooks.afterEnter(() => {

//     //about 

// });