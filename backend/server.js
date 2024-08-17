const express = require('express');
const axios = require('axios');  // this is for making HTTP requests
const app = express();
const port = 9876;

// Configuration format
const WINDOW_SIZE = 10;
let window = [];

// Mapping number types to API endpoints
const API_URLS = {
    p: 'http://20.244.56.144/primes',
    f: 'http://20.244.56.144/fibonacci',
    e: 'http://20.244.56.144/even',
    r: 'http://20.244.56.144/random'
};

// Ffetch numbers from  API
const fetchNumbers = async (type) => {s
    const url = API_URLS[type];
    if (!url) {
        return [];
    }

    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];  // 
    } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error.message);
        return [];
    }
};

// fetch numbers and calculate the average form api
app.get('/numbers/:numberid', async (req, res) => {
    const numberType = req.params.numberid;

   
    const windowPrevState = [...window];

    // Fetch new numbers from the external API
    const numbers = await fetchNumbers(numberType);
    const uniqueNumbers = [...new Set(numbers)];

    
    uniqueNumbers.forEach(num => {
        if (!window.includes(num)) {
            if (window.length >= WINDOW_SIZE) {
                window.shift();  
            }
            window.push(num);  // Add the new element
        }
    });

  
    const windowCurrState = [...window];

    // Calculate the average
    const avg = window.length > 0 ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0.00;

    // Return response
    res.json({
        windowPrevState,
        windowCurrState,
        numbers: uniqueNumbers,
        avg
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
