import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar/dist';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import './style.scss'


const Item = ({title, to, icon, selected, setSelected})=>{
    return(
        <div className='tab_item_wrapper'>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <MenuItem className='tab_item' active={selected === title} onClick={() => setSelected(title)} icon={icon}>
                    <p>{title}</p>
                </MenuItem>
            </Link>
        </div>
    )
}

const SidebarApp = () =>{
    const [ isCollapsed, setIsCollapsed ] = useState(false);
    const [ selected, setSelected ] = useState("Dashboard");

    return(
        <div className='sidebar_container'>
            <Sidebar collapsed={isCollapsed} className='sidebar'>
                <Menu iconShape='square'>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                ml="15px"
                            >
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {
                        !isCollapsed ?
                        <Box mb="25px" >
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {/* <img alt='profile-photo' width="100px" height="100px" 
                                    src={user_photo}
                                    style={{cursor: "pointer", borderRadius: "50%"}}
                                /> */}
                            </Box>
                            <Box textAlign="center">
                                <Typography variant='h4' fontWeight="600" color={'rgb(88, 88, 247)'}>Alina</Typography>
                                <Typography variant='h6' fontWeight="500" color={'rgb(88, 88, 247)'}>Admin</Typography>
                            </Box>
                        </Box> : <></>
                    }
                    
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title={"Главная"}
                            to={'/'}
                            selected={selected}
                            setSelected={setSelected}
                            icon={<HomeOutlinedIcon/>}
                        />
                        <p className='setion_text'>Данные</p>
                        <Item
                            title={"Заказы"}
                            to={'/order'}
                            selected={selected}
                            setSelected={setSelected}
                            icon={<ReceiptOutlinedIcon/>}
                        />
                        <Item
                            title={"Работники"}
                            to={'/employee'}
                            selected={selected}
                            setSelected={setSelected}
                            icon={<PeopleOutlinedIcon/>}
                        />
                        <Item
                            title={"Виды работ"}
                            to={'/job'}
                            selected={selected}
                            setSelected={setSelected}
                            icon={<WorkOutlineIcon/>}
                        />
                        <Item
                            title={"Цены"}
                            to={'/price'}
                            selected={selected}
                            setSelected={setSelected}
                            icon={<LocalAtmIcon/>}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SidebarApp;