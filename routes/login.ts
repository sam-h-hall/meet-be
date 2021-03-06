import { Router } from "express";
import genJwt from "../utils/gen-jwt";
//import User from "../database/db-schema/user";
import User from "../database/models/User";
import { compareSync } from "bcryptjs";

const router = Router();

router.post("/", async (req: any, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const [match] = await User.find({ username });
    const approved = compareSync(password, match.password);

    if (!approved) {
      console.log(match);
      res.status(400).json({
        err: "incorrect credentials",
      });
    } else {
      console.log(match);
      const token = genJwt(match);
      res.status(200).json({
        msg: "success!",
        user: {
          _id: match._id,
          username,
          email: match.email,
        },
        token,
      });
    }
  } catch (err) {
    res.status(500).json({
      err: "server err",
      msg: err,
    });
  }
});
export default router;
