const RebillyAPI = require("rebilly-js-sdk").default;

const REBILLY_API_SECRET_KEY = "sk_sandbox_-F5XRF1gFQRsyH7rXSbCBCN3S-wf5ZIDffPZaPa";
const REBILLY_WEBSITE_ID = "phronesis-training.com";
const REBILLY_ORGANIZATION_ID = "phronesis---dream-team";

const rebilly = RebillyAPI({
    sandbox: true,
    apiKey: REBILLY_API_SECRET_KEY,
});

// Handler for Netlify Functions
exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        // Handle GET request
        return {
            statusCode: 301,
            headers: {
                Location: "/deposit.html",
            },
            body: "",
        };
    }

    if (event.httpMethod === "POST") {
        const { customerId, currency } = JSON.parse(event.body);

        try {
            const data = {
                mode: "passwordless",
                customerId,
            };
            const { fields: login } = await rebilly.customerAuthentication.login({ data });
            const { fields: exchangeToken } = await rebilly.customerAuthentication.exchangeToken({
                token: login.token,
                data: {
                    acl: [
                        {
                            scope: {
                                organizationId: [REBILLY_ORGANIZATION_ID],
                            },
                            permissions: [
                                "PostToken",
                                "PostDigitalWalletValidation",
                                "StorefrontGetAccount",
                                "StorefrontPatchAccount",
                                "StorefrontPostPayment",
                                "StorefrontGetTransactionCollection",
                                "StorefrontGetTransaction",
                                "StorefrontGetPaymentInstrumentCollection",
                                "StorefrontPostPaymentInstrument",
                                "StorefrontGetPaymentInstrument",
                                "StorefrontPatchPaymentInstrument",
                                "StorefrontPostPaymentInstrumentDeactivation",
                                "StorefrontGetWebsite",
                                "StorefrontGetInvoiceCollection",
                                "StorefrontGetInvoice",
                                "StorefrontGetProductCollection",
                                "StorefrontGetProduct",
                                "StorefrontPostReadyToPay",
                                "StorefrontGetPaymentInstrumentSetup",
                                "StorefrontPostPaymentInstrumentSetup",
                                "StorefrontGetDepositRequest",
                                "StorefrontGetDepositStrategy",
                                "StorefrontPostDeposit",
                            ],
                        },
                    ],
                    customClaims: {
                        websiteId: REBILLY_WEBSITE_ID,
                    },
                },
            });

            let amounts = [10, 20, 30, 40];
            if (currency === 'CAD') {
                amounts = [100, 120, 130, 140];
            }

            const requestDepositData = {
                websiteId: REBILLY_WEBSITE_ID,
                customerId,
                currency: currency,
                amounts: amounts,
            };

            const { fields: depositFields } = await rebilly.depositRequests.create({
                data: requestDepositData,
            });

            // Return success response
            return {
                statusCode: 200,
                body: JSON.stringify({
                    token: exchangeToken.token,
                    depositRequestId: depositFields.id,
                }),
            };
        } catch (error) {
            console.error('Error processing deposit request:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'Failed to process deposit request',
                    details: error.message,
                }),
            };
        }
    }

    // Default response for unsupported methods
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
