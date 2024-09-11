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
            currency: "USD",
            customAmount: {
                minimum: 20
            },
            buttons: [
                20, 30, 50
            ]
        },
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfMDFKN0dWNEY1Qk5BSEVaS1JSQUtXWEsxMVQiLCJleHAiOjE3NTYwNDQ5MjIsImlhdCI6MTcyNjA2ODQ0MC4yMzgxNTQsImFjbCI6W3sic2NvcGUiOnsib3JnYW5pemF0aW9uSWQiOlsicGhyb25lc2lzLS0tZHJlYW0tdGVhbSJdfSwicGVybWlzc2lvbnMiOlsyODQsMjg2LDQxNCw0MTUsNDM0LDQxMSw0MTIsNDI0LDQyNSw0MjYsNDI3LDQyOCw0MjksNDA5LDQxMCw0MDEsNDAyLDQzMyw2OTgsNDg4LDQ4Nyw2ODcsNjgxLDU4OSw1OTAsNjE1XX1dLCJjbGFpbXMiOnsiZG9jdW1lbnRzIjpbImlkZW50aXR5LXByb29mIiwiYWRkcmVzcy1wcm9vZiJdLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vbXl3ZWJzaXRlLmNvbSJ9LCJtZXJjaGFudCI6InBocm9uZXNpcy0tLWRyZWFtLXRlYW0iLCJjdXN0b21lciI6eyJpZCI6ImN1c18wMUo1VFJNWEZUTTM0SjZHUUtYRzg0R04yRCIsIm5hbWUiOiJKb2huIENlbmEiLCJjcmVhdGVkVGltZSI6IjIwMjQtMDgtMjFUMTU6MjQ6NTQrMDA6MDAifX0.FqU1iA-3rnZLDTdCg-4giUrvftQ3iQNwigcD5vkVjD7khO5m4v-uesbT-hM7ZgAIFzjlqqvuOBMToLXJWOVlcbx-K7CDzfdOA_j8r8CXsgXSPBMOVmZaq1lo_3Ix6XUKNe2iqno1C0Ix9ww2mGOPip9cGNeWJrXYwdG5vLHqWkAt1GLemudkeLWovt__f1AITY4MqzPOiADgL3SmO8a807c8YGohmDuc_ubupnQy6GQLH7cREcZPt88RIqwoa8SFhqK-15707rwvgKi2gI2N1-WSSDOHKyQENpxsBAaOwkVYRBhHmsOZ2KnyP9CtpmYqeIIQw3vgGuQrxZZHfgz48Q',
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