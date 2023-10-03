const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from alat_tangkap", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server gagal",
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data alat tangkap ada",
        data: rows[0],
      });
    }
  });
});

router.post("/add", [body("nama_alat_tangkap").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let data = {
    nama_alat_tangkap: req.body.nama_alat_tangkap,
  };
  connection.query("insert into alat_tangkap set ?", data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server gangguan",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "success",
        data: rows[0],
      });
    }
  });
});

router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(`select * from alat_tangkap where id_alat_tangkap = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error ",
        error: err,
      });
    }
    if (rows.length <= 0) {
      return res.status.json({
        status: false,
        message: "not found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "alat tangkap",
        data: rows[0],
      });
    }
  });
});

router.patch("/update/:id", [body("nama_alat_tangkap").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    nama_alat_tangkap: req.body.nama_alat_tangkap,
  };
  connection.query(`update alat_tangkap set ? where id_alat_tangkap = ${id}`, data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "update data berhasil",
      });
    }
  });
});

router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(`delete from alat_tangkap where id_alat_tangkap = ${id}`, function (err, rows) {
    if (err) {
      return req.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data berhasil dihapus",
      });
    }
  });
});

module.exports = router;
