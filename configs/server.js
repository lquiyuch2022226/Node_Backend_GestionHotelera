'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import roomRoutes from '../src/room/room.routes.js';
import comfortRoutes from '../src/comfort/comfort.routes.js';
import opinionRoutes from '../src/opinion/opinion.routes.js';
import eventReservationRoutes from '../src/eventReservation/eventReservation.routes.js';
import roomServiceAditionalRoutes from '../src/roomServiceAditional/roomServicieAditional.routes.js';
import hotelRoutes from "../src/hotel/hotel.routes.js";
import eventRoutes from '../src/eventHotel/event.routes.js';
import { dbConnection } from './mongo.js';
import User from '../src/user/user.model.js';
import ReservationRoutes from '../src/reservation/reservation.routes.js';
import bcryptjs from 'bcryptjs';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.hotelPath = '/hoteles/v1/hotel';
        this.authPath = '/hoteles/v1/auth';
        this.userPath = '/hoteles/v1/user';
        this.roomPath = '/hoteles/v1/room';
        this.comfortPath = '/hoteles/v1/comfort';
        this.opinionPath = '/hoteles/v1/opinion';
        this.eventReservationPath = '/hoteles/v1/eventReservation';
        this.roomServiceAditionalPath = '/hoteles/v1/roomServiceAditional';
        this.eventPath = '/hoteles/v1/event';
        this.reservationPath = '/hoteles/v1/reservation';

        this.middlewares();
        this.conectarDB();
        this.routes();
        this.createUser();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    async createUser(){
        const existeUser = await User.findOne({ email: 'admin@gmail.com' });
        
        if (!existeUser) {

            /*-------------------ADMINNNN------------------------ */
            const userAdminCreate = {
                email: 'admin@gmail.com',
                password: '123456',
                name: "admin default name",
                lastName: "lastname admin",
                role: 'ADMIN_ROLE',
            };

            const saltAdmin = bcryptjs.genSaltSync();
            userAdminCreate.password = bcryptjs.hashSync(userAdminCreate.password, saltAdmin);

            const userAdmin = new User(userAdminCreate);
            await userAdmin.save();

            /* ---------------ADMIN DE HOTEL -----------------------*/
            const userHotelCreate = {
                email: 'hotel@gmail.com',
                password: '123456',
                name: "hotel default",
                lastName: "lastname hotel default",
                role: 'HOTEL_ROLE',
            };

            const saltHotel = bcryptjs.genSaltSync();
            userHotelCreate.password = bcryptjs.hashSync(userHotelCreate.password, saltHotel);

            const userHotel = new User(userHotelCreate);
            await userHotel.save();

            /* -------------------------USER NORMAL------------ */
            const userCreate = {
                email: 'user@gmail.com',
                password: '123456',
                name: "user default",
                lastName: "user lastname",
                role: 'USER_ROLE',
            };

            const salt = bcryptjs.genSaltSync();
            userCreate.password = bcryptjs.hashSync(userCreate.password, salt);

            const user = new User(userCreate);
            await user.save();
        }
    }

    routes(){
        this.app.use(this.hotelPath, hotelRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.roomPath, roomRoutes);
        this.app.use(this.comfortPath, comfortRoutes);
        this.app.use(this.opinionPath, opinionRoutes);
        this.app.use(this.eventReservationPath, eventReservationRoutes);
        this.app.use(this.roomServiceAditionalPath, roomServiceAditionalRoutes);
        this.app.use(this.eventPath, eventRoutes);
        this.app.use(this.reservationPath, ReservationRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server running on port: ', this.port);
        });
    }
}

export default Server;