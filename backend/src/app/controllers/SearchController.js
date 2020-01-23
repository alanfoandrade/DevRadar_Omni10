import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    if (devs.length === 0)
      return res.status(400).json({ error: 'Nenhum dev encontrado' });

    return res.json(devs);
  }
}

export default new SearchController();
