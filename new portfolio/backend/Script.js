document.querySelector(".linkedIn").addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/shubham-dubey-359646271/");
});

document.querySelector(".gitHub").addEventListener("click", () => {
  window.open("https://github.com/Shubham32142");
});
document.querySelector(".X").addEventListener("click", () => {
  window.open("https://x.com/shivdubey692234");
});
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form values
    const firstName = document.querySelector(".firstName").value;
    const lastName = document.querySelector(".lastName").value;

    const subject = document.querySelector(".subject").value;
    const message = document.querySelector(".message").value;

    try {
      const response = await fetch("https://portfolio-backend-sxlb.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, subject, message }),
      });

      const result = await response.json();

      // Handle responses
      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.add("show");
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("show");
}
