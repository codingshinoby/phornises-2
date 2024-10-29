window.onload = function () {
    // Get the modal and image elements
    const modal = document.getElementById("myModal");
    const fullImage = document.getElementById("fullImage");
    const closeButton = document.querySelector(".close");

// Function to open the modal with the full-size image
    function openFullSizeImage(event) {
        fullImage.src = event.target.getAttribute("data-full");
        modal.style.display = "block";
    }

// Function to close the modal
    function closeModal() {
        modal.style.display = "none";
    }

// Add click event listener to all thumbnails
    document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
        thumbnail.addEventListener("click", openFullSizeImage);
    });

// Add click event listener to the close button
    closeButton.addEventListener("click", closeModal);

// Close the modal if the user clicks outside of the image
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

}