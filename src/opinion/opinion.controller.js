import Opinion from "./opinion.model.js";

export const opinionPost = async (req, res) => {
    const { description, numStars, idHotel, idUser } = req.body;

    const opinion = new Opinion({ description, numStars, idHotel, idUser });

    await opinion.save();

    res.status(200).json({
        opinion
    });
};

export const opinionsGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, opinions] = await Promise.all([
        Opinion.countDocuments(query),
        Opinion.find(query)
            .select('-state')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        opinions
    });
};

export const opinionGetById = async (req, res) => {
    const { id } = req.params;
    const opinion = await Opinion.findById(id);

    if (!opinion.state) {
        res.status(400).json({
            msg: 'This opinion was deleted :('
        });
    }

    res.status(200).json({
        opinion
    });
};

export const opinionPut = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const opinion = await Opinion.findById(id);
  
    if (!opinion.state) {
        return res.status(400).json({
            msg: "This opinion doesn't exist because it was deleted",
        });
    }

    const updatedOpinion = await Opinion.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
        msg: 'This opinion was updated:',
        updatedOpinion
    });
};

export const opinionDelete = async (req, res) => {
    const { id } = req.params;

    const opinion = await Opinion.findById(id);

    if (!opinion.state) {
        return res.status(400).json({
            msg: "This opinion doesn't exist because it was deleted",
        });
    }

    const deletedOpinion = await Opinion.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: 'This opinion was deleted:',
        deletedOpinion
    });
};
