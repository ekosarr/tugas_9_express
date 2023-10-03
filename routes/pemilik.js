const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from pemilik", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server  error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data pemilik",
        data: rows[0],
      });
    }
  });
});

router.post("/add", [body("nama_pemilik").notEmpty(), body("alamat").notEmpty(), body("no_hp").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let data = {
    nama_pemilik: req.body.nama_pemilik,
    alamat: req.body.alamat,
    no_hp: req.body.no_hp,
  };
  connection.query("insert into pemilik set ?", data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "tambah data pemilik berhasil",
        data: rows[0],
      });
    }
  });
});

router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(`select * from pemilik where id_pemilik = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
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
        message: "data pemilik",
        data: rows[0],
      });
    }
  });
});

router.patch("/update/:id", 
[body("nama_pemilik").notEmpty(), body("alamat").notEmpty(), body("no_hp").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    nama_pemilik: req.body.nama_pemilik,
    alamat: req.body.alamat,
    no_hp: req.body.no_hp,
  };
  connection.query(`update pemilik set ? where id_pemilik = ${id}`, data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "ubah data pemilik berhasil",
      });
    }
  });
});

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(`delete from pemilik where id_pemilik = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "hapus pemilik berhasil",
      });
    }
  });
});

module.exports = router;
