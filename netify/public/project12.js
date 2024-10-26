const customerId = "cus_01J6D28XDDK09DHH5HGCA3848R";

function showLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.textContent = 'Loading...';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.borderRadius = '5px';
    document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

async function initPaymentInstruments(currency = 'USD') {
    RebillyInstruments.destroy();
    showLoadingIndicator();

    const response = await fetch("/api/deposit-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ customerId, currency }),
    });
    const { token, depositRequestId } = await response.json();

    hideLoadingIndicator();

    RebillyInstruments.mount({
        apiMode: "sandbox",
        deposit: {
            depositRequestId,
        },
        jwt: token,
    });
    RebillyInstruments.on("instrument-ready", (instrument) => {
        console.info("instrument-ready", instrument);
    });
    RebillyInstruments.on("purchase-completed", (purchase) => {
        console.info("purchase-completed", purchase);

        // const balanceElement = document.getElementById('customer-balance');
        // const currentBalance = parseFloat(balanceElement.textContent.replace(/[^0-9.-]+/g, ""));
        // displayBalance(currentBalance + purchase.transaction.amount);
        fetchCustomerBalance(customerId);
    });
}

document.getElementById('usd-button').onclick = () => {
    initPaymentInstruments('USD');
    updateActiveButton('usd-button');
};

document.getElementById('cad-button').onclick = () => {
    initPaymentInstruments('CAD');
    updateActiveButton('cad-button');
};

function updateActiveButton(activeButtonId) {
    document.querySelectorAll('#currency-toggle button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(activeButtonId).classList.add('active');
}

initPaymentInstruments();
