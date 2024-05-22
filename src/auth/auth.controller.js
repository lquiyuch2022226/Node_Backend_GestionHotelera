import User from "../user/user.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generate-JWT.js";
import { formatName } from "../helpers/fortmateName.js";

export const register = async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body;

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);


    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      name: formatName(name),
      lastName: formatName(lastName),
    });

    return res.status(200).json({
      msg: "user has been added to database",
      userDetails: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(user)
    if(user && (await bcryptjs.compare(password, user.password))){
      console.log(user.id)
      console.log(user.email)
      const token = await generarJWT(user.id, user.email)

      res.status(200).json({
        msg: "Login Ok!!!",
        userDetails: {
          token: token
        },
      });
    }

    if (!user) {
      return res
        .status(400)
        .send(`Wrong credentials, ${email} doesn't exists en database`);
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send("wrong password");
    }
   
  } catch (e) {
    res.status(500).send("Comuniquese con el administrador " + e );
  }
};


