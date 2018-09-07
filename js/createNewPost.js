// function getTodayTimestamp(){
// 	var today = new Date();
// 	return today.toLocaleDateString();
// }

function createNewPost(file){
	let id = "01";
  let createDay = new Date();
  let author = 'Mike';
	let {title, content} = file;
	return {createDay, author, title, content};
}

// function pushToFirebase(newPost){
// 	let firebaseRef = firebase.database().ref();
// 	firebaseRef.child("Post").child("post_01").set(newPost);
// }

function pushToFirebase(newPost){
  let {createDay, author, title, content} = newPost;
  db.collection('Posts').add({
    createDay,
    title,
    content,
    author
  })
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('text.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {

        	let title = theFile.name.substring(0, theFile.name.lastIndexOf('.'));
            let content = e.target.result;
            let file = {title, content};
            let newPost = createNewPost(file);
			pushToFirebase(newPost);
			var span = document.createElement('span');
			span.innerHTML = "Done";
			document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      reader.readAsText(f);
    }
  }
}


function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);


function isInDatabase(){
	return false;
}

function updatePost(){
	
}

