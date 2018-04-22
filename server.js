import path from 'path';
import express from 'express';

const DIST_DIR = path.join(__dirname, "public");
const PORT = 1000;
const app = express();

app.use(express.static(DIST_DIR));

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {
	console.log("Server Started at port 1000");
});