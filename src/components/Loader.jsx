import React from 'react';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';

const Loader = ({ loading }) => {
  return (
    <Oval
      height={60}
      width={60}
      color="#3f51b5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={loading}
      ariaLabel="oval-loading"
      secondaryColor="#3f51b5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
