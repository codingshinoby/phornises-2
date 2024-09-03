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
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfMDFKNldNSE4wRTQzQjBTTUJOVDkyTUc0NTQiLCJleHAiOjE3Mjk3NzkzMjIsImlhdCI6MTcyNTM5MDQ0My41MzUzODMsImFjbCI6W3sic2NvcGUiOnsib3JnYW5pemF0aW9uSWQiOlsicGhyb25lc2lzLS0tZHJlYW0tdGVhbSJdfSwicGVybWlzc2lvbnMiOls1NCw0MTQsNDI5LDQwNSw0MDcsNDA2XX1dLCJjbGFpbXMiOnsiZG9jdW1lbnRzIjpbImlkZW50aXR5LXByb29mIiwiYWRkcmVzcy1wcm9vZiJdLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vbXl3ZWJzaXRlLmNvbSJ9LCJtZXJjaGFudCI6InBocm9uZXNpcy0tLWRyZWFtLXRlYW0iLCJjdXN0b21lciI6eyJpZCI6ImN1c18wMUo0VlNOUEtaTkYyNkdLV1ZESEdIMjdGNCIsIm5hbWUiOiJBbmRyZXcgUGhyb25lc2lzIiwiY3JlYXRlZFRpbWUiOiIyMDI0LTA4LTA5VDE0OjQ2OjIxKzAwOjAwIn19.fQMk6qIPstDNJg46TFQK5jPdAb1kp0xiXnWHL24wSup0w6k0uOGVB4JkLg7iQ0aCxXwFsG61YRLDe4-KHri22WBWA8e-1Hgd6GK1z7wYxHbxj6SSe-3_O1E2YfsPR4z4fxW6AtYAGv7bVNeURVSk1ogo7o95wvNU9es_P7lHSOIbEnFhzEL-kaIopQYCanOPYTGnsJ5Cd1-FbCdaZIA-IgpeUnXPaLsN5_h2f80cF-0MNL5RY_-bQPxJ0wQN2TeQ0lAQMtg9hTqC-Z7dsGP-h2M16-SOSWhofUptNL_ppAZ7Kkmz-SlVILN4uT5itbeTuq8gYKPrNCj41X650lpZ_A',
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