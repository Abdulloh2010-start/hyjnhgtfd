const apiUrl = "https://67ee9307c11d5ff4bf7a206a.mockapi.io/api/users";
const contactsContainer = document.getElementById("contacts");
const addContactButton = document.getElementById("addContact");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");

function fetchContacts() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            contactsContainer.innerHTML = "";
            data.forEach(contact => {
                const contactElement = document.createElement("div");
                contactElement.classList.add("contact-item");
                contactElement.innerHTML = `
                    <div class="contact-avatar"></div>
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-number">${contact.age}</div>
                    </div>
                    <div class="contact-actions">
                        <button class="dalete-btn">🗑️</button>
                    </div>
                `;
                const daleteButton = contactElement.querySelector(".dalete-btn");
                daleteButton.addEventListener("click", () => {
                    fetch(`${apiUrl}/${contact.id}`, { method: "DELETE" })
                        .then(fetchContacts);
                });
                contactsContainer.appendChild(contactElement);
            });
        });
}
addContactButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();
    if (name && number) {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age: number })
        }).then(() => {
            nameInput.value = "";
            numberInput.value = "";
            fetchContacts();
        });
    }
});
fetchContacts();