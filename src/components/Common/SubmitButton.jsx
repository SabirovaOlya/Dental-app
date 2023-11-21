import BackupIcon from '@mui/icons-material/Backup';import './style.scss'

function SubmitButton({onSubmit, name}){

    return (
        <button type='submit' className='submit_button margin_top_50' onClick={onSubmit}>
            <span>{name}</span> <BackupIcon className='icon'/>
        </button>
    )
}

export default SubmitButton