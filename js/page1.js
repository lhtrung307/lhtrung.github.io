



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const body = document.getElementById("Post");

function getPostId(){
    let recivedData = window.location.search.substring(1).split('=');
    return recivedData[1];
}

function renderPost(doc){
    body.innerHTML = doc.data().content;
}

db.collection('Posts').doc(getPostId()).get().then(doc => {
    renderPost(doc);
});
