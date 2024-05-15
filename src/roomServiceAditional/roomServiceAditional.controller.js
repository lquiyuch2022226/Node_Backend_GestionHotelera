import RoomServicieAditional from './roomServicieAditional.model.js';

export const roomServicePost = async (req, res) => {
    const { nameService, description, price, idHotel, idUser } = req.body;

    const roomService = new RoomServicieAditional({ nameService, description, price, idHotel, idUser });

    await roomService.save();

    res.status(200).json({
        roomService
    });
}

export const roomServicesGet = async (req, res) => {
    const roomServices = await RoomServicieAditional.find();

    res.status(200).json({
        roomServices
    });
}

export const roomServiceGetById = async (req, res) => {
    const { id } = req.params;

    const roomService = await RoomServicieAditional.findById(id);

    if (!roomService) {
        return res.status(404).json({ msg: 'Room service not found' });
    }

    res.status(200).json({
        roomService
    });
}

export const roomServicePut = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const roomService = await RoomServicieAditional.findById(id);

    if (!roomService) {
        return res.status(404).json({ msg: 'Room service not found' });
    }

    const updatedRoomService = await RoomServicieAditional.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
        msg: 'Room service updated successfully',
        updatedRoomService
    });
}

export const roomServiceDelete = async (req, res) => {
    const { id } = req.params;

    const roomService = await RoomServicieAditional.findById(id);

    if (!roomService) {
        return res.status(404).json({ msg: 'Room service not found' });
    }

    await RoomServicieAditional.findByIdAndDelete(id);

    res.status(200).json({
        msg: 'Room service deleted successfully'
    });
}
