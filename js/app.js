// Listen to submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Result
  document.querySelector(".results").style.display = "none";

  // Show Loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateLoan, 2000);

  e.preventDefault();
});

// Calculate Loan
function calculateLoan() {
  //All UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //Calculate Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

    // Hide Result
    document.querySelector(".results").style.display = "block";

    // Show Loader
    document.querySelector("#loading").style.display = "none";
  } else {
    // Show Error
    showError("Please Check Your Number");
  }
}

// Show Error
function showError(error) {
  // Hide Result
  document.querySelector(".results").style.display = "none";

  // Show Loader
  document.querySelector("#loading").style.display = "none";

  // Create h3 element
  const errorMessage = document.createElement("h3");

  // Add className
  errorMessage.className = "show-error";

  //Styling errorMessage
  errorMessage.style.backgroundColor = "#25999E";
  errorMessage.style.textAlign = "center";
  errorMessage.style.paddingTop = "0.3rem";
  errorMessage.style.paddingBottom = "0.3rem";
  errorMessage.style.marginBottom = "1rem";
  errorMessage.style.borderRadius = "20px";

  // Create TextNode & Append
  errorMessage.appendChild(document.createTextNode(error));

  const card = document.querySelector(".card");
  const heading = document.querySelector("h1");

  // Insert Error Before H1
  card.insertBefore(errorMessage, heading);

  // Remove Error After 3s
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError(error) {
  document.querySelector(".show-error").remove();
}
