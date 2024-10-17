window.onload = function () {

    const amountDisplay = document.getElementById('amount-display');
    const predefinedButtons = document.querySelectorAll('.amount-button');
    const customInput = document.getElementById('custom-amount-input');
    const depositButton = document.getElementById('deposit-button');
    let amount = 0;

    predefinedButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountDisplay.textContent = button.getAttribute('data-amount');
            amount = parseFloat(button.getAttribute('data-amount').toString());
        });
    });

    depositButton.addEventListener('click', () => {
        const customAmount = parseFloat(customInput.value);

        if (customAmount >= 10 && customAmount <= 5000) {
            amountDisplay.textContent = customAmount.toString();
            amount = parseFloat(customAmount.toString());
        } else if (amount <= 9 || isNaN(amount)) {
            alert('Please enter an amount between $10 and $5000.');
        }
    });

    document.getElementById('deposit-button').addEventListener('click', function() {
        RebillyInstruments.destroy();
        document.getElementById('custom-amount-input').value = "";
        const depositAmount = parseFloat(amount);

        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }

        RebillyInstruments.mount({
            publishableKey: "pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX",
            organizationId: "phronesis---dream-team",
            websiteId: "phronesis-training.com",
            apiMode: "sandbox",
            locale: "en",
            money: {
                amount: depositAmount,
                currency: "USD"
            },
            paymentInstruments: {
                address: {
                    require: [
                        "email",
                        "address",
                        "phoneNumber",
                        "country",
                        "city",
                        "region",
                        "postalCode",
                    ],
                },
            },
            onSuccess: function(result) {
                console.log('DEPOSITED:', result);
                console.log('AMOUNT:', amount);
                RebillyInstruments.destroy();
            },
            onError: function(error) {
                console.error('Payment error:', error);
                alert('There was an error processing your deposit. Please try again.');
            }
        });
        RebillyInstruments.on('instrument-ready', (instrument) => {
            console.info('instrument-ready', instrument);
        });
        RebillyInstruments.on('purchase-completed', (purchase) => {
            console.info('purchase-completed', purchase);
        });
    });

}