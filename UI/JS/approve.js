
const deletes = document.querySelector('span.delete');
const success = document.querySelector('span.success');

function redirectToHome() {
    const result = confirm("Are you sure you want to delete this message?");
    if(result){
    window.location = 'home.html';
    }else{
        return false;
    }
}

function redirectToProfile() {
    window.location = 'profile-questions.html';
}

deletes.addEventListener('click', redirectToHome);
success.addEventListener('click', redirectToProfile);