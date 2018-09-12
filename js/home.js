
// slide
var slideIndex = 0;
showSlides();

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) { slideIndex = 1 }
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
	setTimeout(showSlides, 2000); // Change image every 2 seconds
}

const recentPosts = document.querySelector(".recentItems");
const path = "";
const childPage = "page1.html";

function renderRecentPost(doc) {
	let li = document.createElement('li');
	let title = document.createElement('a');

	li.class = 'recentItem';
	let href = generatePostLink(doc.id);
	title.href = href;
	title.textContent = doc.data().title;

	li.appendChild(title);

	recentPosts.appendChild(li);
}

function getRecentText() {
	db.collection('Posts').orderBy('createDay', 'desc').limit(3).get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
			renderRecentPost(doc);
		})
	})
}

getRecentText();

const posts = document.querySelector("div#posts");

function createPostImg() {
	let img = document.createElement('img');
	let imgSrc = "https://goo.gl/uTbQiH"
	img.src = imgSrc;
	img.className = "item-image img-responsive col-lg-4 col-md-4 col-sm-4 col-xs-4";
	return img;
}

function createPostTitle(title, href){
	let postTitle = document.createElement('a');
	postTitle.id = "postTitle";
	postTitle.className = "title";
	postTitle.href = href;
	postTitle.target = "_bank";
	postTitle.textContent = title;
	return postTitle;
}

function createAuthorLink(author, href) {
	let authorLink = document.createElement('a');
	authorLink.href = href;
	authorLink.textContent = author;
	return authorLink;
}

function createPostDayElement(createDay) {
	let postDay = document.createElement("span");
	postDay.id = "postDay";
	postDay.className = "time";
	postDay.textContent = createDay.toLocaleDateString();
	return postDay;
}

function createCommentLink(href){
	let commentLink = document.createElement('a');
	commentLink.href = href;
	commentLink.textContent = "2 comments";
	return commentLink;
}

function createReadMoreLink(href){
	let readmoreLink = document.createElement('a');
	readmoreLink.href = href;
	readmoreLink.textContent = "READ MORE";
	return readmoreLink;
}

function generatePostLink(postId){
	let postPath = path + childPage + "?id=" + postId;
	return postPath;
}

function renderPost(doc) {
	let { createDay, author, title, content } = doc.data();
	createDay = createDay.toDate();

	let divContainer = document.createElement('div');
	divContainer.className = "item col-lg-12 col-md-12 col-sm-12 col-xs-12";

	let img = createPostImg();

	let divContainerContent = document.createElement("div");
	divContainerContent.className = "item-information col-lg-8 col-md-8 col-sm-8 col-xs-8";
	
	let postPath = generatePostLink(doc.id);
	let postTitle = createPostTitle(title, postPath);


	let general = document.createElement('div');
	general.className = "general";

	let authorSpan = document.createElement("span");
	authorSpan.className = "author";
	let authorLink = createAuthorLink(author, "#");
	authorSpan.appendChild(authorLink);
	let postDay = createPostDayElement(createDay);

	let comment = document.createElement('span');
	comment.class = "comment";

	let commentLink = createCommentLink("#")
	comment.appendChild(commentLink);

	general.appendChild(authorSpan);
	general.appendChild(postDay);
	general.appendChild(comment);

	let postContent = document.createElement('div');
	postContent.id = "postContent";
	postContent.className = "content";

	let readmore = document.createElement("span");
	readmore.className = "readmore";
	let readmoreLink = createReadMoreLink(postPath);
	readmore.appendChild(readmoreLink);

	postContent.appendChild(readmore);

	divContainerContent.appendChild(postTitle);
	divContainerContent.appendChild(general);
	divContainerContent.appendChild(postContent);

	divContainer.appendChild(img);
	divContainer.appendChild(divContainerContent);

	posts.appendChild(divContainer);
}

db.collection('Posts').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderPost(doc);
	})
})


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