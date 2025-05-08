import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  const logo = (
    <>
    <img src='/images/e-sign-aadhaar.png' className='w-75 ms-3' alt='e-sign'/> 
    </>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="">{logo}</RouterLink>;
}
