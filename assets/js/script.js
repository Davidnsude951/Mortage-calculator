// The reason the payment type is in the function rather than outside is bcs of the timing avability of the  DOM elements, this is bcs when we set the radio outside it has already collected the data as the dom loaded , but when inside the button , it collects the data after the user have selected it and have pressed submit

document.getElementById(`calculate`).addEventListener(`click`,()=> {
      
      // Get input values
      let mortgageAmount = parseFloat(document.getElementById("mortgageAmount").value);
      let mortgageTerm = parseFloat(document.getElementById("mortgageTerm").value);
      let interestRate = parseFloat(document.getElementById("interestRate").value);
      let paymentType = document.querySelector('input[name="type"]:checked').id;

      
      // Validate input
      if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate) || mortgageAmount <= 0 || mortgageTerm <= 0 || interestRate <= 0) {
        document.querySelector(".error").style.display= "block";
        return;
      }

      // Calculate monthly payment and total repayment
      let monthlyPayment, totalRepayment;
      if (paymentType === "repayment") {
        monthlyPayment = calculateRepaymentPayment(mortgageAmount, interestRate, mortgageTerm);
        totalRepayment = monthlyPayment * (mortgageTerm * 12);
      } else {
        monthlyPayment = calculateInterestOnlyPayment(mortgageAmount, interestRate);
        totalRepayment = mortgageAmount + (mortgageAmount * (interestRate / 100) * mortgageTerm);
      }

      // Display results
      document.getElementById("monthlyPayments").textContent = monthlyPayment.toFixed(2);
      document.getElementById("totalPayment").textContent = totalRepayment.toFixed(2);

      // Hide initial container and show result container
      document.getElementById("initial").style.display = "none";
      document.getElementById("final").style.display = "flex";
    

    function calculateRepaymentPayment(mortgageAmount, interestRate, mortgageTerm) {
      let monthlyInterestRate = interestRate / 100 / 12;
      let numPayments = mortgageTerm * 12;
      return mortgageAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numPayments)));
    }

    function calculateInterestOnlyPayment(mortgageAmount, interestRate) {
      return mortgageAmount * (interestRate / 100 / 12);
    }
})

document.getElementById(`reset`).addEventListener(`click`,()=>{
      document.getElementById("mortgageAmount").value = 0;
      console.log(`haiiiiiiiiiiiiiii`)
})