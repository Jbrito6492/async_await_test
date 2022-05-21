const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
    res.json('I\'m alive!');
});

app.get('/test_one', async (req, res) => {
    const numberOfRequests = 1000;
    try {
        const promises = Array(numberOfRequests).fill(null).map(() => axios.get('https://jsonplaceholder.typicode.com/posts'));
        const responses = await Promise.allSettled(promises);
        const data = responses.map(response => response.value.data);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

app.get('/test_two', async (req, res) => {
    const numberOfRequests = 1000;
    const promises = [];
    const responses = [];
    try {
        for (let i = 0; i < numberOfRequests; i++) {
            const promise = axios.get('https://jsonplaceholder.typicode.com/posts');
            promises.push(promise);
        }
        for (let i = 0; i < promises.length; i++) {
            const {data} = await promises[i];
            responses.push(data);
        }
        res.json(responses);
    } catch (error) {
        console.error(error);
    }
});

app.get('/test_three', async (req, res) => {
    try {
        const numberOfRequests = 1000;
        const responses = [];
        for (let i = 0; i < numberOfRequests; i++) {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
            responses.push(data);
        }
        res.json(responses);
    } catch (error) {
        console.error(error);
    }
});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
