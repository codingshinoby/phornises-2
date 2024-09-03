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


    RebillyInstruments.mount({
        deposit: {
            currency: 'USD',
            amount: 5.99
        },
        jwt: 'jwt_01J6WMHN0E43B0SMBNT92MG454',
        publishableKey: 'pk_sandbox_8BvWrLbeYLapt5CwsZHmQvOdD24ixpAT5TdU7iX',
        organizationId: 'phronesis---dream-team',
        websiteId: 'phronesis-training.com',
        apiMode: 'sandbox',
        summary: '.rebilly-instruments-summary',
        form: '.rebilly-instruments',
    });
    RebillyInstruments.on('instrument-ready', (instrument) => {
        console.info('instrument-ready', instrument);
    });
    RebillyInstruments.on('purchase-completed', (purchase) => {
        console.info('purchase-completed', purchase);
    });

}