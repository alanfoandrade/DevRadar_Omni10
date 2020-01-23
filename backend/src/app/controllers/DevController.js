import api from '../../services/api';
import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../../websocket';

class DevController {
  async index(req, res) {
    const devs = await Dev.find();

    if (devs.length === 0)
      return res.status(400).json({ error: 'Nenhum dev encontrado' });

    return res.json(devs);
  }

  async store(req, res) {
    const { git_user, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ git_user });

    if (!dev) {
      const techsArray = parseStringAsArray(techs);
      const { data } = await api.get(`/users/${git_user}`);

      const { login, name, bio, avatar_url } = data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        git_user: login,
        name: name || login,
        bio,
        avatar_url,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões a 10km de raio e por tecnologias

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  }
}

export default new DevController();
