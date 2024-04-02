function openModal(videoId) {
    const modal = document.getElementById("myModal");
    const videoFrame = document.getElementById("videoFrame");
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
    modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("myModal");
    const videoFrame = document.getElementById("videoFrame");
    videoFrame.src = "";
    modal.style.display = "none";
}
window.addEventListener("click", function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) closeModal();
});

