import { Express } from "express";
import { authRoutes } from "./../modules/auth/routes";
import { coreRoutes } from "./../modules/core/core.routes";

export default (app: Express) => {
  app.get("/", (req, res) => {
    res.json({ status: "My API is alive!" });
  });

  authRoutes(app);
  coreRoutes(app);
};
