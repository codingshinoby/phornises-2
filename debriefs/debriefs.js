window.onload = function () {
    const modal = document.getElementById("myModal");
    const fullImage = document.getElementById("fullImage");
    const closeButton = document.querySelector(".close");

    function openFullSizeImage(event) {
        fullImage.src = event.target.getAttribute("data-full"); // Set the full-size image URL
        modal.style.display = "block"; // Display the modal
    }

    function closeModal() {
        modal.style.display = "none";
        fullImage.src = ""; // Clear the src to stop loading when closed
    }

    document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
        thumbnail.addEventListener("click", openFullSizeImage);
    });
    closeButton.addEventListener("click", closeModal);

    window.addEventListener("click", function(event) {
        if (event.target === modal || event.target === fullImage) {
            closeModal();
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });


}