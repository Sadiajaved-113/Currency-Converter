const drop = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Static exchange rates for demonstration purposes
const exchangeRates = {
    "USD": { "PKR": 278, "EUR": 0.93, "INR": 83, "GBP": 0.76 },
    "PKR": { "USD": 0.0036, "EUR": 0.0033, "INR": 0.30, "GBP": 0.0027, "CAD": 0.0039, "AUD": 0.0036},
    "EUR": { "USD": 1.08, "PKR": 299, "INR": 89, "GBP": 0.82 },
    "INR": { "USD": 0.012, "PKR": 3.36, "EUR": 0.011, "GBP": 0.0092 },
    "GBP": { "USD": 1.31, "PKR": 362, "EUR": 1.22, "INR": 108 },
    "CAD": { "USD": 0.73, "PKR": 205, "EUR": 0.68, "INR": 62.5, "GBP": 0.56, "AUD": 1.13, "JPY": 109.00 },
    "AUD": { "USD": 0.64, "PKR": 181, "EUR": 0.60, "INR": 55, "GBP": 0.49, "CAD": 0.89, "JPY": 96.28 },
    "JPY": { "USD": 0.0067, "PKR": 1.22, "EUR": 0.0062, "INR": 0.56, "GBP": 0.0051, "CAD": 0.0092, "AUD": 0.0104 },
    "CNY": { "USD": 0.14, "PKR": 38.1, "EUR": 0.13, "INR": 11.4, "GBP": 0.10, "CAD": 0.19, "AUD": 0.21, "JPY": 20.88, "BRL": 0.67, "MXN": 2.53, "ZAR": 2.53 },
    "BRL": { "USD": 0.20, "PKR": 55.0, "EUR": 0.18, "INR": 16.67, "GBP": 0.15, "CAD": 0.28, "AUD": 0.32, "JPY": 29.8, "CNY": 1.49, "MXN": 3.76, "ZAR": 3.76 },
    "MXN": { "USD": 0.056, "PKR": 15.4, "EUR": 0.051, "INR": 4.29, "GBP": 0.042, "CAD": 0.077, "AUD": 0.085, "JPY": 7.9, "CNY": 0.39, "BRL": 0.27, "ZAR": 1.0 },
    "ZAR": { "USD": 0.056, "PKR": 15.4, "EUR": 0.051, "INR": 4.29, "GBP": 0.042, "CAD": 0.077, "AUD": 0.085, "JPY": 7.9, "CNY": 0.39, "BRL": 0.27, "MXN": 1.0 }
};

const countryList = {
    "USD": "US",  
    "PKR": "PK",   
    "EUR": "EU",   
    "INR": "IN",   
    "GBP": "GB",
    "CAD": "CA",
    "AUD": "AU",
    "JPY": "JP",
    "CNY": "CN",   
    "BRL": "BR",   
    "MXN": "MX",   
    "ZAR": "ZA"    
};

for (let select of drop) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromValue = fromCurr.value;
    let toValue = toCurr.value;

    let convertedAmount;

    // Calculate conversion using static exchange rates
    if (exchangeRates[fromValue] && exchangeRates[fromValue][toValue]) {
        convertedAmount = amtVal * exchangeRates[fromValue][toValue];
    } else {
        convertedAmount = "Conversion rate not available.";
    }

    // Update the message after conversion calculation
    msg.innerText = `${amtVal} ${fromValue} = ${convertedAmount} ${toValue}`;
});
