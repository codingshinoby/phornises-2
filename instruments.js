window.onload = function () {
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX',
        organizationId: 'phronesis---dream-team',
        websiteId: 'phronesis-training.com',
        apiMode: 'sandbox',
        items: [
            {
                planId: 'premium-membership',
                quantity: 1
            },
        ],
        bumpOffer: [
            {
                planId: 'platinum-membership',
                quantity: 1
            }
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
        }
    });
    RebillyInstruments.on('instrument-ready', (instrument) => {
        console.info('instrument-ready', instrument);
    });
    RebillyInstruments.on('purchase-completed', (purchase) => {
        console.info('purchase-completed', purchase);
    });

}