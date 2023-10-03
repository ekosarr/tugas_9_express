const express = require("express");
const app = express();
const port = 3000;
const bodyPs = require("body-parser");

app.use(bodyPs.urlencoded({extended : false}))
app.use(bodyPs.json());

const alatRouter = require ("./routes/alat_tangkap");
app.use ("/api/alat_tangkap",alatRouter);

const dpiRouter = require ("./routes/dpi");
app.use ("/api/dpi",dpiRouter);

const pemilikRoutes = require ("./routes/pemilik");
app.use ("/api/pemilik",pemilikRoutes);

const kapalRoutes = require ("./routes/kapal");
app.use ("/api/kapal",kapalRoutes);


app.listen(port,() => {
    console.log (`aplikasi berjalan di http::localhost:${port}`);
} )
