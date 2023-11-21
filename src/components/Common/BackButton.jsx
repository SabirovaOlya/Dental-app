import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './style.scss'

function BackButton({to}) {
    const navigate = useNavigate()

    const onNavigate = () =>{
        navigate(to, { replace: true})
    }

    return (
        <button className='back_button margin_top_10' onClick={() => onNavigate()}>
            <ArrowBackIosIcon className='icon'/> <span>Назад</span> 
        </button>
    )
}

export default BackButton