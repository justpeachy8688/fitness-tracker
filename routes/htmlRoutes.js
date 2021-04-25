const path = require("path");

module.exports = function (app) {
    app.get("*", function (req, res) {
        res.sendFile(path.join(_dirname, "../public/index.html"));
    })
    app.get("/stats", function (req, res) {
        res.sendFile(path.join(_dirname, "../public/stats.html"));
    })
    app.get ("/exercise", function (req, res){
        res.sendFile(path, join(_dirname, "../public/exercise.html"));
    })
}