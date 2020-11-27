import path from "path";
import express from "express";
import fs from "fs";
import { check } from "express-validator";

const PORT = 3000;
const DIST_DIR = path.join(__dirname);

const app = express();

app.use(express.static(DIST_DIR));

app.get(/.(jpg|png|js|css)$/, (req, res) => {
	const cleanUrl = sanitizeUrl(req.url);

	checkContentEncoding(req, res);
	if (checkIfFileAllowed(cleanUrl)) sendFile(cleanUrl, res);
	else res.status(404).end();
});

app.get("/", (req, res ) => {
	const INDEX_URL = "/index.html";

	req.url = INDEX_URL;
	checkContentEncoding(req, res);
	sendFile(INDEX_URL, res);
});

app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
});

const checkContentEncoding = (req, res ) => {
	if (req.acceptsEncodings("br")) {
		req.url += ".br";
		res.set("Content-Encoding", "br");
	} else if (req.acceptsEncodings("gzip")) {
		req.url += ".gz";
		res.set("Content-Encoding", "gzip");
	}
};

const checkIfFileAllowed = (fileName) => {
	if (fs.existsSync(DIST_DIR + fileName)) {
		return true;
	}
	return false;
};

const sendFile = (path, res ) => {
	res.sendFile(path);
};

const sanitizeUrl = (url) => {
	return check(url).trim().escape().toString();
};
