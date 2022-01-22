const router = require("express").Router();
const db = require("../../config/connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM departments";

  db.query(sql.at, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.post("/", (req, res) => {
  const sql = "INSERT INTO departments (name) VALUES (?)";

  db.QUERY(sql, req.body.nqme, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      changes: result.affectedRows,
    });
  });
});

module.exports = router;
