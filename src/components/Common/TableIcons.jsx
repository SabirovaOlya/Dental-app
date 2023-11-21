import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import { alert } from './alert';
import './style.scss'

function TableIcons({onSingle, onEdit, onDelete}) {

  const handleDelete = () => {
    Swal.fire({
      title: `Вы уверены?`,
      text: 'Это действие нельзя будет отменить!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete()
        alert("Успешно удалено", 'success')
      }
    });
  };

  return (
    <div className='table_icons'>
        <button className='single' onClick={() => onSingle()}><AccountCircleIcon className='icon'/></button>
        <button className='edit' onClick={() => onEdit()}><ModeEditIcon className='icon'/></button>
        <button className='delete' onClick={handleDelete}><DeleteForeverIcon className='icon'/></button>
    </div>
  )
}

export default TableIcons