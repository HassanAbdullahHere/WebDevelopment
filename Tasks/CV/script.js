let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset+height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*= '+ id +']').classList.add('active');
            })

        }
    })

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 890);
    header.classList.toggle('top', window.scrollY > 300);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove("active");
}

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle("active");
}

ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 1000,
    delay: 200
 });
 
 ScrollReveal().reveal('.home-content, .heading', { origin:'top' });
 ScrollReveal().reveal('.home-image, .services-container,.contact form,.skills-content', { origin:"bottom" });
 ScrollReveal().reveal('.home-content h1, .about-img', { origin:"left" });
 ScrollReveal().reveal('.home-content p, .about-content', { origin:"right" });

 const typed = new Typed('.multiText',{
    strings: ["Web Developer.", "Designer.", "App Developer."],
    typeSpeed:100,
    backSpeed: 50,
    backDelay: 2000,
    loop:true
 });