import { useContext } from 'react';
import { CommonContext } from '../contexts/CommonContext';

// ----------------------------------------------------------------------

const useCommon = () => useContext(CommonContext);

export default useCommon;
