import Reservation from './Reservation';

export const reservationPost = async (req, res) => {
    const { nameService, description, price, idHotel, idUser } = req.body;

    try {
        const reservation = new Reservation({ nameService, description, price, idHotel, idUser });
        await reservation.save();

        res.status(201).json({
            reservation
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error creating reservation',
            error: error.message
        });
    }
};

export const reservationsGet = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({
            reservations
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error getting reservations',
            error: error.message
        });
    }
};

export const reservationGetById = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            res.status(404).json({
                msg: 'Reservation not found'
            });
            return;
        }

        res.status(200).json({
            reservation
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error getting reservation by id',
            error: error.message
        });
    }
};

export const reservationPut = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const reservation = await Reservation.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!reservation) {
            res.status(404).json({
                msg: 'Reservation not found'
            });
            return;
        }

        res.status(200).json({
            msg: 'Reservation updated successfully',
            reservation
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating reservation',
            error: error.message
        });
    }
};

export const reservationDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) {
            res.status(404).json({
                msg: 'Reservation not found'
            });
            return;
        }

        res.status(200).json({
            msg: 'Reservation deleted successfully',
            reservation
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error deleting reservation',
            error: error.message
        });
    }
};
