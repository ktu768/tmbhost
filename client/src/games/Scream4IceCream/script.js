// DOM Elements
const startBtn = document.getElementById('start-btn');
const fill = document.getElementById('fill');
const volumeLevel = document.getElementById('volume-level');
const gameArea = document.getElementById('game-area');
const resultArea = document.getElementById('result-area');
const couponCode = document.getElementById('coupon-code');
const EmailInput = document.getElementById('email-input');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');
const icecreamContainer = document.getElementById('icecream-container');
const decibelDisplay = document.getElementById('decibel-display');
const backBtn = document.getElementById('back-btn');

// Variables
let currentHeight = 0;
let audioContext;
let analyser;
let stream;
let isListening = false;
let loudStartTime = null;  // Track time above 30 dB

// Store the original result area HTML for resetting
const originalResultAreaHTML = resultArea.innerHTML;

// Generate random coupon code
function generateCouponCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'ICECREAM';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Update ice cream color based on fill level
function updateIceCreamColor(level) {
  // Change color gradient as the ice cream fills up
  if (level < 25) {
    fill.style.background = 'linear-gradient(to top, #ffafbd, #ffc3a0)';
  } else if (level < 50) {
    fill.style.background = 'linear-gradient(to top, #ff9a9e, #fad0c4)';
  } else if (level < 75) {
    fill.style.background = 'linear-gradient(to top, #a18cd1, #fbc2eb)';
  } else {
    fill.style.background = 'linear-gradient(to top, #84fab0, #8fd3f4)';
  }
}

// Start listening to microphone
async function startListening() {
  try {
    // Request microphone access
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Set up audio context and analyzer
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Visual feedback that we're listening
    startBtn.textContent = 'Listening...';
    icecreamContainer.classList.add('listening');
    isListening = true;

    // Start monitoring volume
    function updateVolume() {
      if (!isListening) return;

      analyser.getByteFrequencyData(dataArray);

      // Time-domain RMS-based decibel calculation
      analyser.getByteTimeDomainData(dataArray);
      let sumSq = 0;
      for (let i = 0; i < bufferLength; i++) {
        let v = (dataArray[i] - 128) / 128;
        sumSq += v * v;
      }
      const rms = Math.sqrt(sumSq / bufferLength);
      let decibelValue = Math.round(20 * Math.log10(rms));
      const displayDb = Math.max(0, decibelValue + 50);
      updateGrayscaleClip(decibelValue);
      decibelDisplay.textContent = `${displayDb} dB`;
      if (displayDb < 60) {
        decibelDisplay.style.color = 'var(--secondary-color)';
      } else if (displayDb < 85) {
        decibelDisplay.style.color = 'orange';
      } else {
        decibelDisplay.style.color = 'var(--primary-color)';
      }
      const volumePercent = Math.min(displayDb, 100);
      volumeLevel.style.width = `${volumePercent}%`;

      if (displayDb >= 75) {
        const increment = (displayDb - 74) * 0.5;
        currentHeight = Math.min(currentHeight + increment, 100);
        const scaleFactor = 1 + Math.min((displayDb - 75) / 150, 0.15);
        icecreamContainer.style.transform = `scale(${scaleFactor})`;
      } else {
        currentHeight = Math.max(currentHeight - 0.5, 0);
        icecreamContainer.style.transform = 'scale(1)';
      }
      fill.style.height = `${currentHeight}%`;
      updateIceCreamColor(currentHeight);

      // Check if we've been loud for 3 seconds
      if (displayDb >= 20) {
        if (!loudStartTime) {
          loudStartTime = Date.now();
        }
        if (Date.now() - loudStartTime >= 3000) {
          winGame();
          return;
        }
      } else {
        loudStartTime = null;
      }

      requestAnimationFrame(updateVolume);
    }

    updateVolume();

  } catch (err) {
    console.error('Error accessing microphone:', err);
    alert('Could not access your microphone. Please allow microphone access and try again.');
    resetGame();
  }
}

// Win the game
function winGame() {
  isListening = false;
  icecreamContainer.classList.remove('listening');

  // Stop microphone
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  // Generate and display coupon code
  couponCode.textContent = generateCouponCode();

  // Show result area
  gameArea.style.display = 'none';
  resultArea.style.display = 'block';
}

// Reset the game
function resetGame() {
  isListening = false;
  currentHeight = 0;
  fill.style.height = '0%';
  volumeLevel.style.width = '0%';
  decibelDisplay.textContent = '0 dB';
  decibelDisplay.style.color = 'var(--primary-color)';
  startBtn.textContent = 'Start Screaming';
  startBtn.disabled = false;
  icecreamContainer.classList.remove('listening');
  // icecreamContainer.style.transform = 'scale(1)';

  // Restore the original result area HTML
  resultArea.innerHTML = originalResultAreaHTML;

  // Re-get references to elements that were replaced
  const newEmailInput = document.getElementById('email-input');
  const newSubmitBtn = document.getElementById('submit-btn');
  const newSuccessMessage = document.getElementById('success-message');
  const newBackBtn = document.getElementById('back-btn');

  // Reset form elements
  if (newEmailInput) newEmailInput.value = '';
  if (newSubmitBtn) {
    newSubmitBtn.disabled = false;
    // Re-attach event listener
    newSubmitBtn.addEventListener('click', submitEmailAddress);
  }

  // Hide success message
  if (newSuccessMessage) newSuccessMessage.style.display = 'none';

  // Re-attach event listener to back button
  if (newBackBtn) newBackBtn.addEventListener('click', resetGame);

  // Show game area, hide result area
  gameArea.style.display = 'flex';
  resultArea.style.display = 'none';

  // Stop microphone if active
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

// Event Listeners
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startListening();
});

// Function to handle email submission
function submitEmailAddress() {
  const emailInputElement = document.getElementById('email-input');
  const submitBtnElement = document.getElementById('submit-btn');
  const email = emailInputElement.value;
  const couponCodeValue = couponCode.textContent;

  if (email) {
    // Send the email via EmailJS
    emailjs.send("service_tv42rys", "template_qy4wlxi", {
      email: email,
      coupon_code: couponCodeValue,
    })
      .then(() => {
        console.log('Coupon sent to:', email);

        // Show success message
        let successMessageElement = document.getElementById('success-message');
        successMessageElement.style.display = 'block';
        let enterEmail = document.getElementById('enter-email');
        enterEmail.style.display = 'none';
        // Hide the form
        document.querySelector('.form-group').style.display = 'none';

        // Disable button
        if (submitBtnElement) submitBtnElement.disabled = true;

        // Reattach back button
        document.getElementById('back-btn').addEventListener('click', resetGame);
      }, (error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send coupon. Please try again.');
      });

  } else {
    alert('Please enter a valid email address');
  }
}


// Attach event listener to submit button
submitBtn.addEventListener('click', submitEmailAddress);

// Add event listener for back button
backBtn.addEventListener('click', resetGame);

function updateGrayscaleClip(decibelValue) {
  // Clamp decibel range between -50 and 30
  const clamped = Math.min(30, Math.max(-50, decibelValue));

  // Map decibel range [-50 to 30] to percentage [0% to 100%]
  const percentage = ((clamped + 50) / 30) * 100;

  // Reverse for clip-path: higher percentage = more grayscale
  const clipPathValue = `${percentage}%`;

  document.querySelector('.ice-cream.grayscale').style.clipPath = `inset(0 0 ${clipPathValue} 0)`;
}
