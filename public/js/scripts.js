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

const loginButton = document.querySelector('.login-button');
const loginModal = document.getElementById('loginModal');
const closeButton = document.querySelector('#loginModal .close');
const createAccountLink = document.getElementById('createAccountLink');
const createAccountModal = document.getElementById('createAccountModal');
const createAccountCloseButton = document.querySelector('#createAccountModal .close');

loginButton.addEventListener('click', function () {
  loginModal.style.display = 'block';
});

createAccountLink.addEventListener('click', function (event) {
  event.preventDefault();
  createAccountModal.style.display = 'block';
});

window.addEventListener('click', function (event) {
  if (event.target === loginModal || event.target === createAccountModal) {
    event.target.style.display = 'none';
  }
});

closeButton.addEventListener('click', function () {
  loginModal.style.display = 'none';
});

createAccountCloseButton.addEventListener('click', function () {
  createAccountModal.style.display = 'none';
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
