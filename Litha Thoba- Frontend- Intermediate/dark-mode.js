//toggle dark mode on and off

document.addEventListener("DOMContentLoaded", () => {
    const darkSwitch = document.getElementById("switch");
    const moon = document.querySelector(
      "#switch > i.fa-regular.fa-moon.switch-dark"
    );
    const sun = document.querySelector(
      "#switch > i.fa-regular.fa-sun.switch-light"
    );
  
    darkSwitch.addEventListener("click", () => {
      document.body.classList.toggle("darkmode");
      if (moon.style.display === "none") {
        moon.style.display = "block";
        sun.style.display = "none";
      } else {
        moon.style.display = "none";
        sun.style.display = "block";
        sun.style.visibility = "visible";
      }
    });
  });
  