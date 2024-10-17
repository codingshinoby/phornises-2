window.onload = function () {
    // const data = {
    //     primaryAddress: {
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         emails: [{
    //             label: 'main',
    //             value: 'john.doe+test@grr.la',
    //             primary: true
    //         }],
    //     }
    // };
    //
    // const firstCustomer = await api.customers.create({data});


    // RebillyInstruments.mount({
    //     invoiceId: 'in_01J80BVMX5NFZ3WKKM1VQ19VE3',
    //     jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfMDFKODBDQ1Y2M1haOTRNSE5LNENaUzRGWU0iLCJleHAiOjE3Mjk3NzkzMjIsImlhdCI6MTcyNjU4OTg1Ni45NjU5NDUsImFjbCI6W3sic2NvcGUiOnsib3JnYW5pemF0aW9uSWQiOlsicGhyb25lc2lzLS0tZHJlYW0tdGVhbSJdfSwicGVybWlzc2lvbnMiOls1NCw0MTQsNDI5LDQwNSw0MDcsNDA2LDI4NCwyODYsNDE0LDQxNSw0MzQsNDExLDQxMiw0MjQsNDI1LDQyNiw0MjcsNDI4LDQyOSw0MDksNDEwLDQwMSw0MDIsNDMzLDY5OCw0ODgsNDg3LDY4Nyw2ODEsNTg5LDU5MCw2MTVdfV0sImNsYWltcyI6eyJkb2N1bWVudHMiOlsiaWRlbnRpdHktcHJvb2YiLCJhZGRyZXNzLXByb29mIl0sInJlZGlyZWN0VXJsIjoiaHR0cHM6Ly9teXdlYnNpdGUuY29tIn0sIm1lcmNoYW50IjoicGhyb25lc2lzLS0tZHJlYW0tdGVhbSIsImN1c3RvbWVyIjp7ImlkIjoiY3VzXzAxSjVUUk1YRlRNMzRKNkdRS1hHODRHTjJEIiwibmFtZSI6IkpvaG4gQ2VuYSIsImNyZWF0ZWRUaW1lIjoiMjAyNC0wOC0yMVQxNToyNDo1NCswMDowMCJ9fQ.SedHWTHVoRDDojMR3BUPxRMXuITB6iMZ05UtQYwmlCxSkumPZe69UfyrPtEDpgnH0cRjxz4vUXZL3c1KF7cR-3fa5u7IX4JNnuOeqwVzQg_lQWBjLkPkpBb0fngu1ZSowxpcOI2C7zY9gylIKCWUxIUoHNHzBv7vLwpkHvGovGe_HDq6gGMUa2XPHVCVf6bBMl3FydNbb88WMppoeqKUM__5zsKu6IFy2efH0_9JR_Aab-JYGXgLHGUKRUhFPpWosaTvQqpgzoG-I5FqdQsu299r08tL-t_v8ZnH2A8qSZhMUabI7sQy_vFQ-JDwh-Mk8zHeIE7p1r9MIvDA-I6esQ',
    //     publishableKey: 'pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX',
    //     organizationId: 'phronesis---dream-team',
    //     websiteId: 'phronesis-training.com',
    //     apiMode: 'sandbox',
    //     summary: '.rebilly-instruments-summary',
    //     form: '.rebilly-instruments',
    //     features: {
    //         showConsentCheck: ['form'],
    //     },
    //     i18n: {
    //         en: {
    //             consentCheck: {
    //                 consentToSubscription,
    //                 agreeToTOS,
    //             },
    //         },
    //     },
    // });


    const amountDisplay = document.getElementById('amount-display');
    const predefinedButtons = document.querySelectorAll('.amount-button');
    const customInput = document.getElementById('custom-amount-input');
    const customButton = document.getElementById('deposit-button');
    let amount = 0;

    // Handle predefined amount button click
    predefinedButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountDisplay.textContent = button.getAttribute('data-amount');
            amount = parseFloat(button.getAttribute('data-amount').toString());
        });
    });

    // Handle custom amount submission
    customButton.addEventListener('click', () => {
        const customAmount = parseFloat(customInput.value);

        // Check if the custom amount is within the valid range
        if (customAmount >= 10 && customAmount <= 5000) {
            amountDisplay.textContent = customAmount.toString();
            amount = parseFloat(customAmount.toString());
        } else if (amount <= 0 || isNaN(amount)) {
            alert('Please enter an amount between $10 and $5000.');
        }
    });
    // const consentToSubscription = 'Subscription billing policy.';
    // const agreeToTOS = 'By subscribing, I have read and understood the [terms of service](https://google.com) and [Privacy Policy](https://google.com).';
    //
    // RebillyInstruments.mount({
    //     publishableKey: 'pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX',
    //     organizationId: 'phronesis---dream-team',
    //     websiteId: 'phronesis-training.com',
    //     apiMode: 'sandbox',
    //     items: [
    //         {
    //             planId: 'premium-membership',
    //             quantity: 1
    //         },
    //     ],
    //     paymentInstruments: {
    //         address: {
    //             show: ["email", "phoneNumber", "city", "country"],
    //             require: ["address", "email", "phoneNumber", "city", "country"],
    //         }
    //     },
    //     theme: {
    //         colorPrimary: "#FFCAD4",
    //         colorDanger: "#F5002D",
    //         colorText: "#0010F5",
    //         buttonColorText: "#F58F00"
    //     },
    //     features: {
    //         showConsentCheck: ['form'],
    //     },
    //     i18n: {
    //         en: {
    //             consentCheck: {
    //                 consentToSubscription,
    //                 agreeToTOS,
    //             },
    //         },
    //     },
    // });

    document.getElementById('deposit-button').addEventListener('click', function() {
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