

function animateCSS(node, animationName, callback) {
    node.classList.add('animated', animationName)
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd)
}

// $("#sideMenu1").swipe({
//     swipeStatus:function(event, phase, direction, distance, duration, fingers){
//         if (phase=="move" && direction =="left") {
//                 $("#sideMenu1").removeClass("open");
//                 return false;
//         }
//     }
// });

function sideNavOpenOrClose(){
    element = document.getElementById('sideButton');
    element.classList.toggle('open');
    let el = document.querySelector(element.getAttribute('data-target'));
    
    animateCSS(el, el.classList.contains('open')? 'slideInRight' : 'slideOutRight' );
    
    el.classList.toggle('open');
}