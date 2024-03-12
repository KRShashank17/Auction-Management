import express from 'express';
import bcrypt from 'bcrypt';
import { User, validate } from '../models/user_model.js'

export const router = express.Router();
router.post('/', async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400)
                      .send({message: "User already registered"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({
            ...req.body ,
            password : hashPassword
        })
        res.status(201).send({message: "User created successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

export default router