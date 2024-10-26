const RebillyAPI = require("rebilly-js-sdk").default;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("client"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const REBILLY_API_SECRET_KEY = "sk_sandbox_-F5XRF1gFQRsyH7rXSbCBCN3S-wf5ZIDffPZaPa";
const REBILLY_WEBSITE_ID = "phronesis-training.com";
const REBILLY_ORGANIZATION_ID = "phronesis---dream-team";

const rebilly = RebillyAPI({
    sandbox: true,
    apiKey: REBILLY_API_SECRET_KEY,
});

// Define your Express routes
app.get("/deposit", async (req, res) => {
    res.redirect(301, "/deposit.html");
});

app.post("/deposit-request", async (req, res) => {
    const { customerId, currency } = req.body;

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

        // Return response
        res.status(200).json({
            token: exchangeToken.token,
            depositRequestId: depositFields.id,
        });
    } catch (error) {
        console.error('Error processing deposit request:', error);
        res.status(500).json({
            error: 'Failed to process deposit request',
            details: error.message,
        });
    }
});

// Handler for Netlify Functions
exports.handler = async (event, context) => {
    // Create a new Promise to resolve the response
    return new Promise((resolve, reject) => {
        // Use the Express app to handle the request
        app.handle(event, {
            send: (statusCode, body) => {
                resolve({
                    statusCode,
                    body: JSON.stringify(body),
                });
            },
            json: (body) => {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(body),
                });
            },
            status: (code) => ({
                send: (body) => {
                    resolve({
                        statusCode: code,
                        body: JSON.stringify(body),
                    });
                },
                json: (body) => {
                    resolve({
                        statusCode: code,
                        body: JSON.stringify(body),
                    });
                },
            }),
        });
    });
};
