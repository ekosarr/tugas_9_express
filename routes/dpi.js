const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");
const { get } = require("./alat_tangkap");

router.get("/", function (req, res) {
  connection.query("select * from dpi ", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server gagal",
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data dpi",
        data: rows[0],
      });
    }
  });
});

router.post("/add", [body("nama_dpi").notEmpty(), body("luas").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: erroy.array(),
    });
  }
  let data = {
    nama_dpi: req.body.nama_dpi,
    luas: req.body.luas,
  };
  connection.query("insert into dpi set ?", data, function (err, rows) {
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
  connection.query(`select * from dpi where id_dpi = ${id}`, function (err, rows) {
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
        message: "dpi",
        data: rows[0],
      });
    }
  });
});

router.patch("/update/:id", [body("nama_dpi").notEmpty(), body("luas").notEmpty()], (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array(),
    });
  }
  let id = req.params.id;
  let data = {
    nama_dpi: req.body.nama_dpi,
    luas: req.body.luas,
  };
  connection.query(`update dpi set ? where id_dpi = ${id}`, data, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "ubah data berhasil",
      });
    }
  });
});

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(`delete from dpi where id_dpi = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "hapus data berhasil",
      });
    }
  });
});

module.exports = router;
