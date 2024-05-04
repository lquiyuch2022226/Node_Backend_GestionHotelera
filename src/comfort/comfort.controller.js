import Comfort from "./comfort.model.js";

export const comfortPost = async (req, res) => {
    const { nameComfort, idHotel } = req.body;

    const comfort = new Comfort({ nameComfort, idHotel });

    await comfort.save();

    res.status(200).json({
        comfort
    });
};

export const comfortsGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, comforts] = await Promise.all([
        Comfort.countDocuments(query),
        Comfort.find(query)
            .select('-state')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        comforts
    });
};

export const comfortGetById = async (req, res) => {
    const { id } = req.params;
    const comfort = await Comfort.findById(id);

    if (!comfort.state) {
        res.status(400).json({
            msg: 'This comfort was deleted :('
        });
    }

    res.status(200).json({
        comfort
    });
};

export const comfortPut = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const comfort = await Comfort.findById(id);
  
    if (!comfort.state) {
        return res.status(400).json({
            msg: "This comfort doesn't exist because it was deleted",
        });
    }

    const updatedComfort = await Comfort.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
        msg: 'This comfort was updated:',
        updatedComfort
    });
};

export const comfortDelete = async (req, res) => {
    const { id } = req.params;

    const comfort = await Comfort.findById(id);

    if (!comfort.state) {
        return res.status(400).json({
            msg: "This comfort doesn't exist because it was deleted",
        });
    }

    const deletedComfort = await Comfort.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: 'This comfort was deleted:',
        deletedComfort
    });
};
