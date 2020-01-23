import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

export default function DevForm({ onSubmit }) {
  const [git_user, setGitUser] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {
          latitude: userLatitude,
          longitude: userLongitude,
        } = position.coords;

        setLatitude(userLatitude);
        setLongitude(userLongitude);
      },
      err => {
        console.log(err); //eslint-disable-line
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      git_user,
      techs,
      latitude,
      longitude,
    });

    setGitUser('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="git_user">Usuário do GitHub</label>
        <input
          name="git_user"
          id="git_user"
          required
          value={git_user}
          onChange={e => setGitUser(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

DevForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
