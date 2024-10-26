const express = require("express");
const bodyParser = require("body-parser");
const RebillyAPI = require("rebilly-js-sdk").default;
const app = express();
const port = 8080;

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

app.get("/deposit", async (req, res) => {
    res.redirect(301, "/deposit.html");
});

app.post("/deposit-request", async function (req, res) {
    const { customerId, currency } = req.body;
    const response = {};
    const data = {
        mode: "passwordless",
        customerId,
    };
    const { fields: login } = await rebilly.customerAuthentication.login({
        data,
    });
    const { fields: exchangeToken } =
        await rebilly.customerAuthentication.exchangeToken({
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

    let amounts = [10, 20, 30, 40]
    if (currency === 'CAD') {
        amounts = [100, 120, 130, 140]
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

    response.token = exchangeToken.token;
    response.depositRequestId = depositFields.id;

    res.send(response);
});

app.listen(port, '127.0.0.1', () => {
    console.log(`Sandbox listening on port ${port}`);
});
