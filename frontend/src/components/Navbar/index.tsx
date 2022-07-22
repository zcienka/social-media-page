import {Wrapper} from './Navbar.styles'
import {Menu} from '@mui/icons-material'
import {useState} from 'react'

function Navbar() {

    return <Wrapper>
        <div className={'main-container'}>
                <p className={'name-container'}>Menu</p>
            <div className={'button-container'}>
                <div className={'button'}>Log in</div>
            </div>
        </div>
    </Wrapper>
}

export default Navbar
