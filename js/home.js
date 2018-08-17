// let MYNAME = Symbol('myname');
// class Car{
// 	constructor(make, model){
// 		this.make = make;
// 		this.model = model;
// 	}
// 	[MYNAME](){
// 		return {
// 			make: this.make,
// 			model: this.model
// 		};
// 	}
// 	["add"](a, b){
// 		return a + b;
// 	}

// 	[1 + 2](){
// 		return "three";
// 	}
// }
// let MazdaMPV = new Car("Mazda", "MPV");
// console.log(MazdaMPV.add(4, 5));
// console.log(MazdaMPV[3]());
// console.log(MazdaMPV[MYNAME]());
// 

// let CAT = Symbol('cat');
// class features{
// 	constructor(name, age){
// 		this.name = name;
// 		this.age = age;
// 	}
// 	[CAT](){
// 		return {
// 			name: this.name,
// 			age: this.age
// 		};
// 	}
// 	["eat"](a, b){
// 		return a + b;
// 	}
// }
// let Tom = new features("Tom", 2);
// console.log(Tom[CAT]());
// console.log(Tom.eat("mouse", "rice"));


let recentText = document.getElementById("recentText");

function getRecentText(){
	let firebaseRef = firebase.database().ref().child("recentText");
	firebaseRef.on("value", function(datasnapshot){
		recentText.innerText = datasnapshot.val();
	});
}

getRecentText();

let postDay = document.getElementById("postDay");
let postTitle = document.getElementById("postTitle");
let postContent = document.getElementById("postContent");

function getPost(){
	let firebaseRef = firebase.database().ref().child("Post");
	let post;
	firebaseRef.on("value", function(datasnapshot){
		post = datasnapshot.val();
		let {createDay, title, content} = post;
		postDay.innerText = createDay;
		postTitle.innerText = title;
		postContent.innerText = content;
	});
	

}

getPost();

