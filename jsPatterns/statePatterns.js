const PageState = function () {
  let currentState = new homeState(this) // this pertains to the function PageState

  // functions / methods
  this.init = function () {
    this.change(new homeState);
  }

  this.change = function (state) {
    currentState = state;
  }
};

// Home State
const homeState = function (page) {
  document.querySelector('.heading').innerHTML = "<h2>HOME</h2>";
  document.querySelector('.content').innerHTML = "<h3>This is the home page of the website</h3>";
}

// About State
const aboutState = function (page) {
  document.querySelector('.heading').innerHTML = "<h2>ABOUT US</h2>";
  document.querySelector('.content').innerHTML = "<h3>This is the about page of the website</h3>";
}

// Contact State
const contactState = function (page) {
  document.querySelector('.heading').innerHTML = "<h2>CONTACT US</h2>";
  document.querySelector('.content').innerHTML = "<h3>This is the contact page of the website</h3>";
}

// Instantiate the page state
const page = new PageState();

// Init the first state
page.init()

// UI Variables
const home = document.querySelector('.home'),
  about = document.querySelector('.about'),
  contact = document.querySelector('.contact');

  home.addEventListener('click', (e)=> {
    page.change(new homeState);
    e.preventDefault();
  })
  about.addEventListener('click', (e)=> {
    page.change(new aboutState);
    e.preventDefault();
  })
  contact.addEventListener('click', (e)=> {
    page.change(new contactState);
    e.preventDefault();
  })