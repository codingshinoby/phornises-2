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
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfMDFKNldONUpTSFBKN1FROURLOEtLVjNBUTciLCJleHAiOjE3Mjk3NzkzMjIsImlhdCI6MTcyNTM5MTA5Ni42Mjc0OTksImFjbCI6W3sic2NvcGUiOnsib3JnYW5pemF0aW9uSWQiOlsicGhyb25lc2lzLS0tZHJlYW0tdGVhbSJdfSwicGVybWlzc2lvbnMiOlsyODQsMjg2LDQxNCw0MTUsNDM0LDQxMSw0MTIsNDI0LDQyNSw0MjYsNDI3LDQyOCw0MjksNDA5LDQxMCw0MDEsNDAyLDQzMyw2OTgsNDg4LDQ4Nyw2ODcsNjgxLDU4OSw1OTAsNjE1XX1dLCJjbGFpbXMiOnsid2Vic2l0ZUlkIjoicGhyb25lc2lzLXRyYWluaW5nLmNvbSJ9LCJtZXJjaGFudCI6InBocm9uZXNpcy0tLWRyZWFtLXRlYW0iLCJjdXN0b21lciI6eyJpZCI6ImN1c18wMUo0VlNOUEtaTkYyNkdLV1ZESEdIMjdGNCIsIm5hbWUiOiJBbmRyZXcgUGhyb25lc2lzIiwiY3JlYXRlZFRpbWUiOiIyMDI0LTA4LTA5VDE0OjQ2OjIxKzAwOjAwIn19.durSssjBlkwZvi5LoWR-TYWJ0_r5jimYTN1z-Ul-8eicbpBNBc-9rUmfWfjOgLwxGo3HURxoznlIyWxHUXvrYdPBUXiWzo70xGduk_YTr6Ie5R2UGQKk0Cu5R3xSS0lxohQkkicYpS_XE3Sbx9dR9AppPVIyfVju08d7zojBFzFKW0xJtv4kB8bYY7KoEgfj0G-3qIZMOSieFDIdjBu1dY9pcRmiktPZpOtq-9MzsonN0pbt7IO1H4QMD81fbFrFp0u74zEWcprInLYVzeOdF1Ym5bDUdPViiC1wf2aEyXaiX9rWB9ysBPW8zW5WFprYyxSHx0sbHUbohfQq-OgytA',
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