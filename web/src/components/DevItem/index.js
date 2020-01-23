import React from 'react';

import './styles.css';

import PropTypes from 'prop-types';

export default function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.git_user}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

DevItem.propTypes = {
  dev: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    techs: PropTypes.array,
    bio: PropTypes.string,
    git_user: PropTypes.string,
  }).isRequired,
};
