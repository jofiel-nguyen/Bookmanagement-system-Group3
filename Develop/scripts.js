const aboutButton = document.querySelector('.button2');
const what = document.querySelector('.content');

function scrollToWhat() {
    what.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

aboutButton.addEventListener('click', scrollToWhat);

const teamButton = document.querySelector('.button3');
const team = document.querySelector('.team-section');

function scrollToTeam() {
    team.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

teamButton.addEventListener('click', scrollToTeam);


var loginButton = document.querySelector('.login-button');
var modal = document.getElementById('loginModal');

loginButton.addEventListener('click', function() {
  modal.style.display = 'block';
});

window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

var closeButton = document.querySelector('.close');
closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});


const scrollToTopButton = document.querySelector('.scroll-to-top-button');

function toggleScrollToTopButton() {
    if (window.scrollY > window.innerHeight) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', toggleScrollToTopButton);
scrollToTopButton.addEventListener('click', scrollToTop);

var loginButton = document.querySelector('.login-button');
var loginModal = document.getElementById('loginModal');
var closeButton = document.querySelector('#loginModal .close');
var createAccountLink = document.getElementById("createAccountLink");
var createAccountModal = document.getElementById("createAccountModal");
var createAccountCloseButton = document.querySelector('#createAccountModal .close');

loginButton.addEventListener('click', function() {
  loginModal.style.display = 'block';
});

closeButton.addEventListener('click', function() {
  loginModal.style.display = 'none';
});

createAccountLink.addEventListener("click", function(event) {
  event.preventDefault();
  createAccountModal.style.display = "block";
});

createAccountCloseButton.addEventListener("click", function() {
  createAccountModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === createAccountModal) {
    createAccountModal.style.display = "none";
  }
});
