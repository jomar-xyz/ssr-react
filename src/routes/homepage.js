import express from "express";
import App from "../components/homepage";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";
import { Helmet } from 'react-helmet';

const router = express.Router();

router.get("/", async (req, res) => {
  const helmet = Helmet.renderStatic();
  const theHtml = `
  <html>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
  </head>
  <body>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/homepage.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ reactele: reactComp});
  res.send(htmlToSend);
});

export default router;