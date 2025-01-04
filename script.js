


const convertButton = document.querySelector(".convert-button");
const FromCurrencySelect = document.querySelector(".from-currency-select"); // Moeda de origem
const toCurrencySelect = document.querySelector(".to-currency-select") // Moeda de destino 


async function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // valor a ser convertido
    const currencyValueConverted = document.querySelector(".currency-value"); // Resultado conversão

// async await    
const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( Response => Response.json())


// Valores das moedas em relação ao Real
const rates = {
    BRL: 1,
    USD: data.USDBRL.high,
    EUR: data.EURBRL.high,
    GBP: 7.70, // Atualize com Valores válidos
    BTC: data.BTCBRL.high,
};

const FromRate = rates[FromCurrencySelect.value]; // valor da moeda de origem
const toRate = rates[toCurrencySelect.value]; // Valor da moeda de destino

if (!inputCurrencyValue || isNaN (inputCurrencyValue)) {
    alert("Por favor, insira um Valor Válido");
    return;
}

// Calcula a taxa de conversão
const conversionRate = toRate / FromRate;

// Converte o Valor
const convertedValue = inputCurrencyValue * conversionRate;

//Formata e exibe o valor a ser convertido
currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: FromCurrencySelect.value,
}).format(inputCurrencyValue);

//formata e exibe o valor convertido
currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: toCurrencySelect.value,
}).format(convertedValue);

}

function changeCurrency() {
    const fromCurrencyName = document.getElementById("from-currency-name");
    const toCurrencyName = document.getElementById("to-currency-name");
    const fromCurrencyImage = document.querySelector(".from-currency-img");
    const toCurrencyImage = document.querySelector(".to-currency-img");

    const currencyNames = {
        BRL: "Real",
        USD: "Dólar ",
        EUR: "Euro",
        GBP: "Libra",
        BTC: "Bitcoin",
    };

    const currencyImages = {
        BRL: "./img/brasil 2.png",
        USD:  "./img/dolar.png",
        EUR: "./img/Euro.png",
        GBP: "./img/libra.png",
        BTC: "./img/bitcoin.png",
    };

    fromCurrencyName.innerHTML = currencyNames[FromCurrencySelect.value];
    fromCurrencyImage.src = currencyImages[FromCurrencySelect.value];

    toCurrencyName.innerHTML = currencyNames[toCurrencySelect.value];
    toCurrencyImage.src = currencyImages[toCurrencySelect.value];

    convertValues();
}

FromCurrencySelect.addEventListener("change",changeCurrency);
toCurrencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
