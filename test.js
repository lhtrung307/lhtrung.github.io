// function getRecentText(){
// 	let firebaseRef = firebase.database().ref().child("Post");
// 	firebaseRef.on("value", function(datasnapshot){
// 		let postData = datasnapshot.val();
// 		console.log(postData);
// 	});
// }

// getRecentText()

function getLastPostID(){
	let firebaseRef = firebase.database().ref().child("Post");
	firebaseRef.on("child_added", function(datasnapshot){
		let postData = datasnapshot.val();
		console.log(postData);
	});
}

getLastPostID();