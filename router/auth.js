import bcrypt from 'bcrypt';
import express from 'express';
import joi from 'joi';
import { User } from '../models/user_model.js';

const router = express.Router();

router.post('/', async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(401).send({message: "Invalid email or password"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword){
            return res.status(401).send({message: "Invalid email or password"});
        }


        const token = user.generateAuthToken();
        return res.status(200).send({
            data: token,
            message: "Login Successful"
        })
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"})
    }
})

const validate = (data)=>{
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
}
// module.exports = router;
export default router