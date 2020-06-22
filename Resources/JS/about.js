// Variable Declarations and Function Definitions
let number = 0;
gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CSSRulePlugin)

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
            markers: true,
            // pin: true
        }
    })
    scroll_tl.to('.first', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 1,
    }),
        scroll_tl.to('.flag', {
            scale: 1
        }, '-=.3'),
        scroll_tl.addLabel("first_down")
    scroll_tl.to('.second', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 1,
    }, "first_down-=.1")
    scroll_tl.addLabel("second_down")
    scroll_tl.to('.third', {
        transform: "rotateX(50deg) rotateZ(331deg) translateX(42px)",
        duration: 1,
    }, "second_down+=.1")
}

// const moveBars = (num, bars, scroll_tl) => {
//     console.log(num, bars);
//     if (num === "undefined" || bars === "undefined") return;
//     // setTimeout(()=>{bars[num-1].classList.remove('animating')} , 2000)
//     bars[num].classList.add('animating');
//     console.log(num, bars);
//     let barsRefined = bars.filter(bar => bar.classList.contains('animating') ? true : false)

//     barsRefined.map(bar => {
//         let barBefore =
//             CSSRulePlugin.getRule(`.${bar.classList[1]}:before`),
//             barAfter =
//                 CSSRulePlugin.getRule(`.${bar.classList[1]}:after`)
//         console.log(barBefore, barAfter)
//         scroll_tl.to(barBefore, {
//             cssRule: {
//                 width: bar.dataset.width,
//             },
//             duration: 2,
//         })
//     })
//     num += 1
//     moveBars(num, bars)
// }

const scroll_skills_tl_func = () => {
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.skillsContainer',
            start: "top center",
            markers: true,
        }
    }),
    barWidth = ""
    bars = [...document.querySelectorAll('.bar')]
    // moveBars(number, bars, scroll_tl)
    // bars.map(bar => {
    //     barWidth = bar.dataset.width;
    //     scroll_tl.to(bars , {
    //         width: barWidth,
    //         stagger: 1.3
    //     });
    // });
    bars.map(bar => {
        barWidth = bar.dataset.width;
    });
    scroll_tl.to(bars , {
        width: barWidth,
        stagger: 1.3
    });

}


//Initialization Methods

face_tl_func();
scroll_p_tl_func();
scroll_skills_tl_func();