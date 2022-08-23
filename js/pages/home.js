//tab
const tabAgenda = document.querySelectorAll(".s-agenda .tab li");
const tabContentAgenda = document.querySelectorAll(".s-agenda .tab-pane");

tabAgenda[0].classList.add("active");
tabContentAgenda[0].classList.add("active");

tabAgenda.forEach((nav, index) => {
	nav.addEventListener("click", (event) => {
		event.preventDefault();

		tabAgenda.forEach((link) => {
			link.classList.remove("active");
		});
		tabContentAgenda.forEach((tab) => {
			tab.classList.remove("active");
		});

		tabContentAgenda[index].classList.add("active");
		nav.classList.add("active");
	});
});
