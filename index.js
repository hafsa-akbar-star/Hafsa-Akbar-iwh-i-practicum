const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';



// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

app.get('/', async (req, res) => {
    const customobject = 'https://api.hubapi.com/crm/v3/objects/pets?properties=pet_name&properties=pet_color&properties=pet_house';

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const response = await axios.get(customobject, { headers });
        const data = response.data.results;
        // res.json(data);
        res.render('homepage', { data });
    }
    catch (err) {
        console.log(err);
    }
})

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: "Update Custom Object Form | Integrating With HubSpot I Practicum" })

})

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

app.post('/update-cobj', async (req, res) => {

    console.log(req.body);
    const customobject = 'https://api.hubapi.com/crm/v3/objects/pets';
    const request_body = {
        "properties": {
            "pet_name": req.body.pet_name,
            "pet_color": req.body.pet_color,
            "pet_house": req.body.pet_house,
        }
    }
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        await axios.post(customobject, request_body, { headers });
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
})
app.listen(3000, () => console.log('Listening on http://localhost:3000'));