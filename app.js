document.querySelector('#loan-form').addEventListener('submit', calculateResults);


function calculateResults(e) {
    document.getElementById('results').style.display = 'none';

    const amount = document.querySelector('#amount');
    const interest = document.getElementById('interest');
    const year = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        showResults();
    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();
}

function showError(error) {
    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    const btn = document.getElementById('submit-btn');

    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    btn.disabled = true;
    setTimeout(function() {
        clearError();
        btn.disabled = false;
    }, 2000);
}

function clearError() {
    document.querySelector('.alert').style.animation = 'fade-out .5s ease-in'
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 500)
}

function showResults() {
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(function(){
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }, 2000);
}