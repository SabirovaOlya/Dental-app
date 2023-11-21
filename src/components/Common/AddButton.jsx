import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './style.scss'

function AddButton({to}) {
    const navigate = useNavigate()

    const onNavigate = () =>{
        navigate(to, { replace: true})
    }

    return (
        <button className='add_new_button margin_top_20' onClick={() => onNavigate()}>
            <span>Добавить</span> <AddCircleOutlineIcon className='icon'/>
        </button>
    )
}

export default AddButton