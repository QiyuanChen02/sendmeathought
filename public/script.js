"use strict"

//This code shows the correct content based on what button was clicked
const buttonEls = document.querySelectorAll(".navigation-buttons button");
const contentEls = document.querySelectorAll(".main-content");
for (const buttonEl of buttonEls){
    buttonEl.addEventListener("click", (e) => {
        for (const contentEl of contentEls){
            if (contentEl.dataset.content === e.target.id){
                contentEl.className = "main-content";
            } else {
                contentEl.className = "main-content hidden";
            }
        }
    });
}

//This code changes the look of the screen when an input is submitted
const form = document.querySelector("form");
const submittedEl = document.querySelector("[data-content='has-written']");
const writeEl = document.querySelector("[data-content='write']");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const thought = form.thought.value;
    try {
        const res = await fetch("/", {
            method: "POST",
            body: JSON.stringify({ thought }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.text();
        submittedEl.firstChild.textContent = data;
        submittedEl.className = "main-content";
        writeEl.className = "main-content hidden";
    } catch (err) {
        console.log(err);
    }
});

//This code fetches a message when the read a thought button is clicked

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