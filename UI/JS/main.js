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