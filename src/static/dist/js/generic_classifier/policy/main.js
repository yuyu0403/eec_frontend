ai.PolicyGC = {
    setCallback: function () {
        ai.PolicyGC.setPath();
    },
    setPath: function () {
        console.log("setPath policy");
    },
};

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".policy-link");
    const sections = document.querySelectorAll("section");


    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = -60; // 根據實際情況微調（往上偏一點）
                const top = targetElement.getBoundingClientRect().top + window.scrollY + offset;

                window.scrollTo({
                    top: top,
                    behavior: "smooth"
                });
            }
        });
    });

    function changeActiveLink() {
        let scrollPosition = window.scrollY + window.innerHeight * 0.5;
        let activeFound = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");
            const matchingLink = document.querySelector(`.policy-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (matchingLink && !activeFound) {
                    links.forEach(link => link.classList.remove("active"));
                    matchingLink.classList.add("active");
                    activeFound = true;
                }
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            links.forEach(link => link.classList.remove("active"));
            const lastLink = document.querySelector(`.policy-link[href="#${sections[sections.length - 1].id}"]`);
            if (lastLink) {
                lastLink.classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", changeActiveLink);
    changeActiveLink();
});

