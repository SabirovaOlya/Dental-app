import { memo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss'

function Loader({ disable }) {
    return (
      <div className='loader_container'>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%', height: '100%' }}
          open={disable}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
}
  
export default memo(Loader);