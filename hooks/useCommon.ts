import { useContext } from 'react';
import { CommonContext } from '../app/contexts/CommonContext';

// ----------------------------------------------------------------------

const useCommon = () => useContext(CommonContext);

export default useCommon;
