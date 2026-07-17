// TASK 1: CURRENCY CONVERTER


const API_URL = 'https://open.er-api.com/v6/latest/';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const resultDisplay = document.getElementById('resultDisplay');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const lastUpdated = document.getElementById('lastUpdated');

let exchangeRates = null;
let lastFetchTime = null;

// FETCH EXCHANGE RATES

async function fetchRates(baseCurrency) {
    try {
        loadingIndicator.style.display = 'block';
        errorMessage.style.display = 'none';
        convertBtn.disabled = true;
        
        const response = await fetch(`${API_URL}${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.result !== 'success') {
            throw new Error('Failed to fetch exchange rates');
        }
        
        exchangeRates = data.rates;
        lastFetchTime = new Date(data.time_last_update_unix * 1000);
        lastUpdated.textContent = `Rates updated: ${lastFetchTime.toLocaleString()}`;
        
        loadingIndicator.style.display = 'none';
        convertBtn.disabled = false;
        
        return data;
    } catch (error) {
        loadingIndicator.style.display = 'none';
        showError(error.message);
        convertBtn.disabled = false;
        return null;
    }
}


// PERFORM CONVERSION
function convertCurrency() {
    if (!exchangeRates) {
        showError('Please wait for rates to load');
        return;
    }
    
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        showError('Please enter a valid amount');
        return;
    }
    
    try {
        // Convert to USD first (base currency for the API)
        const fromRate = exchangeRates[from];
        const toRate = exchangeRates[to];
        
        if (!fromRate || !toRate) {
            throw new Error('Currency not supported');
        }
        
        // Amount in USD, then convert to target
        const amountInUSD = amount / fromRate;
        const convertedAmount = amountInUSD * toRate;
        
        // Format result
        const formattedFrom = formatCurrency(amount, from);
        const formattedTo = formatCurrency(convertedAmount, to);
        
        resultDisplay.innerHTML = `
            <div class="result-value">
                <span class="from-amount">${formattedFrom}</span>
                <span style="color: #999; margin: 0 10px;">=</span>
                <span class="to-amount">${formattedTo}</span>
            </div>
            <div style="color: #999; font-size: 0.85rem; margin-top: 5px;">
                1 ${from} = ${(toRate / fromRate).toFixed(6)} ${to}
            </div>
        `;
        
        errorMessage.style.display = 'none';
    } catch (error) {
        showError(error.message);
    }
}

// HELPERS

function formatCurrency(amount, currency) {
    const formatter = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formatter.format(amount);
}

function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.style.display = 'block';
    resultDisplay.innerHTML = `<div class="result-placeholder">Unable to convert</div>`;
}

// SWAP CURRENCIES

function swapCurrencies() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    fromCurrency.value = to;
    toCurrency.value = from;
    if (exchangeRates) {
        convertCurrency();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
convertBtn.addEventListener('click', convertCurrency);

swapBtn.addEventListener('click', swapCurrencies);

amountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertCurrency();
    }
});

fromCurrency.addEventListener('change', function() {
    if (exchangeRates) {
        convertCurrency();
    }
});

toCurrency.addEventListener('change', function() {
    if (exchangeRates) {
        convertCurrency();
    }
});

// INITIALIZE

async function init() {
    const defaultCurrency = fromCurrency.value;
    await fetchRates(defaultCurrency);
    
    // Auto-convert on load if amount is valid
    if (parseFloat(amountInput.value) > 0) {
        convertCurrency();
    }
}

init();