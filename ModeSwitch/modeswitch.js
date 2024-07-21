const toggleSwitch = document.querySelector(
    '.switch input[type="checkbox"]'
  );

  function switchTheme(e) {
    if (e.target.checked) {
      document.body.classList.add("dark");
      document.categories.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.categories.classList.remove("dark");
    }
  }
  toggleSwitch.addEventListener("change", switchTheme, false);