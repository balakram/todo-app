document.addEventListener('DOMContentLoaded', function() {
  const profileForm = document.getElementById('profileForm');
  const profileName = document.getElementById('profileName');
  const profileImage = document.getElementById('profileImage');
  const profileGender = document.getElementById('profileGender');

  // Load and display profile data from localStorage if available
  function loadProfile() {
      const profileData = JSON.parse(localStorage.getItem('profileData'));
      if (profileData) {
          profileName.textContent = `${profileData.name || 'User'}`;
          profileGender.textContent = ` ${profileData.gender || 'Not provided'}`;
          if (profileData.image) {
              profileImage.src = profileData.image;
              profileImage.style.display = 'block'; // Ensure image is visible
          } else {
              profileImage.src = ''; // Clear the image if no image URL is stored
              profileImage.style.display = 'none'; // Hide image if not provided
          }
      } else {
          // Handle case when no profile data is found
          profileName.textContent = 'User';
          profileGender.textContent = ' Not provided';
          profileImage.src = '';
          profileImage.style.display = 'none'; // Hide image if no data
      }
  }

  loadProfile();

  profileForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const gender = document.getElementById('gender').value;
      const imageInput = document.getElementById('image');

      let imageUrl = '';
      if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
              imageUrl = e.target.result;

              // Save profile data to localStorage
              const profileData = {
                  name: name,
                  gender: gender,
                  image: imageUrl
              };
              localStorage.setItem('profileData', JSON.stringify(profileData));

              // Update profile display
              profileName.textContent = ` ${name}`;
              profileGender.textContent = ` ${gender}`;
              profileImage.src = imageUrl;
              profileImage.style.display = 'block'; // Ensure image is visible
          };
          reader.readAsDataURL(imageInput.files[0]);
      } else {
          // Save profile data to localStorage without image
          const profileData = {
              name: name,
              gender: gender,
              image: imageUrl
          };
          localStorage.setItem('profileData', JSON.stringify(profileData));

          // Update profile display
          profileName.textContent = ` ${name}`;
          profileGender.textContent = ` ${gender}`;
          profileImage.src = '';
          profileImage.style.display = 'none'; // Hide image if no file is selected
      }
  });

  // Function to handle back button click
  window.goBack = function() {
      window.history.back();
  };
});
