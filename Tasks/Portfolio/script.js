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


const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

function sendMail(){
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };
    const serviceID = 'service_lw8cnf7';
    const templateID = 'template_2fwf547';

    emailjs.send(serviceID,templateID,params)
    .then(
        res=>{
            document.getElementById("name").value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            alert("Message Sent Successfully");
        }
    )
    .catch((err)=> console.log(err));
}

