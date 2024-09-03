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
            amount: 5.99,
            depositRequestId: 'a-deposit-request-id-tests'
        },
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJqd3RfMDFKNldORERLMDhON1NCSDRDOUQyQlhGTVgiLCJleHAiOjE3Mjk3NzkzMjIsImlhdCI6MTcyNTM5MTM1My40NDE3MDMsImFjbCI6W3sic2NvcGUiOnsib3JnYW5pemF0aW9uSWQiOlsicGhyb25lc2lzLS0tZHJlYW0tdGVhbSJdfSwicGVybWlzc2lvbnMiOlsyODQsMjg2LDQxNCw0MTUsNDM0LDQxMSw0MTIsNDI0LDQyNSw0MjYsNDI3LDQyOCw0MjksNDA5LDQxMCw0MDEsNDAyLDQzMyw2OTgsNDg4LDQ4Nyw2ODcsNjgxLDY4OCw1ODksNTkwLDYxNV19XSwiY2xhaW1zIjp7IndlYnNpdGVJZCI6InBocm9uZXNpcy10cmFpbmluZy5jb20ifSwibWVyY2hhbnQiOiJwaHJvbmVzaXMtLS1kcmVhbS10ZWFtIiwiY3VzdG9tZXIiOnsiaWQiOiJjdXNfMDFKNFZTTlBLWk5GMjZHS1dWREhHSDI3RjQiLCJuYW1lIjoiQW5kcmV3IFBocm9uZXNpcyIsImNyZWF0ZWRUaW1lIjoiMjAyNC0wOC0wOVQxNDo0NjoyMSswMDowMCJ9fQ.FYpEJZO7ES3Is6BF6bC7WExTqmHgl3rcBav28yOSIKZ7XQWt836vruQ804vN22hN1Qa0SdjTyE2WdDcclxaW-cIbcio6USq3qbxHkekndC6Qr_KzZI5BiDyR-yFrG_vVfEutrVwiVabxOySPlJaTglBoxgiKJmLXtpZwMBZWtLfsOs7DIQ5ZO0i6GX0J-S_5gFQ9bGt7IHknzRjyW9X5vCvGoUu4tIv-LUJN3_7W6Ncx5vAxxEmlc5uUbp_9VDFCOottp_CAPuQezmmTuUX5nALjDmi2r8zK01R9RBY5Oz2H53SjT9M_dbNH3jSHpwY7uI_Xd07v2G6AXeVDuKo56g',
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