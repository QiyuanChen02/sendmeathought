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

const form = document.querySelector("form");
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
    } catch (err) {
        console.log(err);
    }
});