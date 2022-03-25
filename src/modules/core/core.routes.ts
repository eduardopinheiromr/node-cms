import { Express } from "express";
import { db } from "../../db";
import { jwt } from "../../utils/token";
import authMiddleware from "../auth";
const auth = authMiddleware();

export const coreRoutes = (app: Express) => {
  app.get("/core/objects", (req, res) => {
    const objects = db.findAll("objects");
    res.json(objects);
  });

  app.post("/core/object", (req, res) => {
    const objectCreated = db.create("objects", req.body);
    res.json(objectCreated);
  });

  app.put("/core/object", (req, res) => {
    const updatedObject = req.body;
    const currentObject = db.findById("objects", updatedObject.id);

    if (currentObject) {
      const cartUpdated = db.update("carts", currentObject.id, {
        ...currentObject,
        ...updatedObject,
      });
      return res.json(cartUpdated);
    }

    return res.status(400).json("Object not found");
  });

  app.delete("/core/object/:id", (req, res) => {
    const objectDeleted = db.remove("objects", req.params.id);
    res.json(objectDeleted);
  });
};
