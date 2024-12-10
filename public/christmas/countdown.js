let bgIndex = 0;
const preloadedImages = [];

fetch("https://files.hutotpn.webcr.top/holidays-project/christmas-photos.json")
  .then((response) => response.json())
  .then((data) => {
    // Preload images
    data.forEach((item, index) => {
      const img = new Image();
      img.onload = () =>
        console.log(`Image ${index + 1} loaded successfully: ${item.url}`);
      img.onerror = () =>
        console.error(`Error loading image ${index + 1}: ${item.url}`);
      img.src = item.url;
      preloadedImages[index] = {
        src: img.src,
        photographer: item.photographer,
        creditLink: item.creditLink,
      };
    });

    function changeBackground() {
      if (preloadedImages[bgIndex]?.src) {
        // Apply the preloaded image source directly without wrapping in `url()`
        document.body.style.backgroundImage = `url(${preloadedImages[bgIndex].src})`;

        // Update the photo credit
        const photoCredit = document.getElementById("photographer");
        photoCredit.innerHTML = preloadedImages[bgIndex].photographer;
        photoCredit.href = preloadedImages[bgIndex].creditLink;
      } else {
        console.error("Background image not loaded yet or missing.");
      }
      bgIndex = (bgIndex + 1) % preloadedImages.length; // Cycle through the images
    }

    // Update the background every 10 seconds
    setInterval(changeBackground, 10000);
    changeBackground(); // Initial background set
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Countdown Logic
function updateCountdown() {
  const christmas = new Date("December 25, 2024 00:00:00");
  const now = new Date();

  const diff = christmas - now;

  if (diff < 0) {
    document.getElementById("countdown").innerHTML = "🎁 Merry Christmas! 🎄";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
