//Responsive design

const menu = document.querySelector('.menu-toggle');

const toggleNav = (blocker,element,data1,data2) =>{
    element = document.querySelector(element);
    blocker = document.querySelector(blocker);
    element.setAttribute('data-mode', element.getAttribute('data-mode') === data1 ? data2 : data1);

    if (element.getAttribute('data-mode') === data2) {
        blocker.classList.add('close');
    }else{
        blocker.classList.remove('close');
    }
};

menu.addEventListener('click', (event)=>{
toggleNav('.navbarcontainer > .breadcrumb','.navbarcontainer > ul','close','open');
event.preventDefault();
});


//Create Question modal

const modalBox = document.querySelector('.post-question-modal');
const trigger = document.querySelector('.ask-button');
const close = document.querySelector('.close-button');

function toggleModal() {
    modalBox.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modalBox) {
        toggleModal();
    }
}

function redirect() {
    window.location = 'delete.html';
}

document.querySelector('.ask-question-input').addEventListener('submit', function(evt){
    evt.preventDefault();
    redirect();
});

trigger.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);