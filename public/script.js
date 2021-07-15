"use strict"

//This code shows the correct content based on what button was clicked
const buttonEls = document.querySelectorAll(".nav");
const contentEls = document.querySelectorAll(".main-content");
for (const buttonEl of buttonEls){
    if (!buttonEl.classList.contains("read")){
        buttonEl.addEventListener("click", (e) => {
            for (const contentEl of contentEls){
                if (e.target.className.includes(contentEl.dataset.content)){
                    contentEl.className = "main-content";
                } else {
                    contentEl.className = "main-content hidden";
                }
            }
        });
    }
}

//This code changes the look of the screen when an input is submitted
const form = document.querySelector("form");
const submittedEl = document.querySelector("[data-content='has-written']");
const writeEl = document.querySelector("[data-content='write']");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const thoughts = form.thought.value.split("\n");
    try {
        const res = await fetch("/", {
            method: "POST",
            body: JSON.stringify({ thoughts }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.text();
        submittedEl.firstElementChild.textContent = data;
        submittedEl.classList.remove("hidden");
        writeEl.classList.add("hidden");
        form.querySelector("textarea").value = "";
    } catch (err) {
        console.log(err);
    }
});

//This code fetches a message when the read a thought button is clicked
const readButtonEls = document.querySelectorAll(".read");
const otherThoughtsEl = document.querySelector(".other-thought");
readButtonEls.forEach(readButtonEl => {
    readButtonEl.addEventListener("click", async () => {
        const response = await fetch("/message");
        const data = await response.json();
        otherThoughtsEl.innerHTML = "";
        data.thoughts.forEach(paragraph => {
            if (paragraph === "") {
                otherThoughtsEl.append(document.createElement("br"));
            } else {
                const paragraphEl = document.createElement("p");
                paragraphEl.textContent = paragraph;
                otherThoughtsEl.append(paragraphEl);
            }
        });
    
        for (const contentEl of contentEls){
            if (contentEl.getAttribute("data-content") === "read"){
                contentEl.className = "main-content";
            } else {
                contentEl.className = "main-content hidden";
            }
        }
    });
});


//This code switches between light and dark mode
const themeSwitcherEl = document.querySelector(".light-dark-toggle");
themeSwitcherEl.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (themeSwitcherEl.firstElementChild.textContent === "Dark mode: off"){
        themeSwitcherEl.firstElementChild.textContent = "Dark mode: on";
    } else {
        themeSwitcherEl.firstElementChild.textContent = "Dark mode: off";
    }
});

//This code controls the opening and closing of the popups
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        modal.classList.add("active");
        overlay.classList.add("active");
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });
});

overlay.addEventListener("click", () => {
    const modal = document.querySelector(".modal.active");
    modal.classList.remove("active");
    overlay.classList.remove("active");
});
