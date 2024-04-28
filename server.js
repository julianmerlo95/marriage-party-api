const {MercadoPagoConfig, Preference} = require("mercadopago"); 
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const client = new MercadoPagoConfig({ accessToken: process.env.REACT_APP_API_KEY });

app.get("/health", (req, res) => {
    return res.send("The app is working!");
});

app.post("/create", (req, res) => {
    if (!req.body || req.body.length == 0) {
        return res.status(400).send("Invalid request body");
    }

    const preference = new Preference(client);

    const items = req.body.map(item => {
        return {
            title: item.name,
            quantity: 1,
            unit_price: Number(item.price)
        };
    });
    
    preference.create({
        body: {
          items,
        }
      })
    .then(response => {
        return res.json({ id: response.id });
    })
    .catch(error => {
        console.log(error);
    });
});


app.listen(8080, () => {
    console.log("Server running on port 8080");
});