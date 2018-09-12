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
