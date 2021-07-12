//This code shows the correct content based on what button was clicked
const buttonEls = document.querySelectorAll(".navigation-buttons button");
const contentEls = document.querySelectorAll(".main-content");
for (buttonEl of buttonEls){
    buttonEl.addEventListener("click", (e) => {
        for (contentEl of contentEls){
            if (contentEl.dataset.content === e.target.id){
                contentEl.className = "main-content";
            } else {
                contentEl.className = "main-content hidden";
            }
        }
    });
}

