//menu
const ham = document.querySelectorAll(".hamburger-menu");
ham.forEach((btn) => {
	btn.addEventListener("click", function () {
		document.body.classList.toggle("nav-is-toggled");
	});
});

//scroll
const scrollAll = document.querySelectorAll(".js-scroll, header ul li a");
scrollAll.forEach((btnScroll) => {
	btnScroll.addEventListener("click", function () {
		document.documentElement.style.scrollBehavior = "smooth";
		document.body.classList.remove("nav-is-toggled");
	});
});

//menu fixo
const headerBar = document.getElementById("header");
const onScroll = () => {
	const scroll = document.documentElement.scrollTop;
	if (scroll > 10) {
		headerBar.classList.add("scrolled");
	} else {
		headerBar.classList.remove("scrolled");
	}
};
window.addEventListener("scroll", onScroll);

//dropdown linguagem
const drop = document.querySelector(".js-language");
drop.addEventListener("click", function () {
	drop.classList.toggle("active");
});
