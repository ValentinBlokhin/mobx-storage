import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PersistGate = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.thunk.init()
      .then(() => {
        setLoading(false)
      })
  }, []);
  return loading ? props.loading : props.children
};

PersistGate.propTypes = {
  thunk: PropTypes.object.isRequired,
  loading: PropTypes.node
};

PersistGate.defaultProps = {
  loading: null
};

export default PersistGate;
