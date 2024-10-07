window.onload = function () {

    const consentToSubscription = 'Subscription billing policy.';
    const agreeToTOS = 'By subscribing, I have read and understood the [terms of service](https://google.com) and [Privacy Policy](https://google.com).';

    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX',
        organizationId: 'phronesis---dream-team',
        websiteId: 'phronesis-training.com',
        apiMode: 'sandbox',
        items: [
            {
                planId: 'common-e-book',
                quantity: 1
            },
        ],
        paymentInstruments: {
            address: {
                show: ["email", "phoneNumber", "city", "country"],
                require: ["address", "email", "phoneNumber", "city", "country"],
            }
        },
        theme: {
            colorPrimary: "#FFCAD4",
            colorDanger: "#F5002D",
            colorText: "#0010F5",
            buttonColorText: "#F58F00"
        },
        features: {
            showConsentCheck: ['form'],
        },
        i18n: {
            en: {
                consentCheck: {
                    consentToSubscription,
                    agreeToTOS,
                },
            },
        },
    });
    RebillyInstruments.on('instrument-ready', (instrument) => {
        console.info('instrument-ready', instrument);
    });
    RebillyInstruments.on('purchase-completed', (purchase) => {
        console.info('purchase-completed', purchase);
    });

}