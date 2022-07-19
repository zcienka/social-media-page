import {Wrapper, MenuIcon} from './Navbar.styles'
import {Menu} from '@mui/icons-material'

function Navbar() {
    return <Wrapper>
        <div className={'main-container'}>
                <p className={'name-container'}>Menu</p>
            <div className={'icon-container'}>
                <Menu className={'icon'}/>
            </div>
        </div>
    </Wrapper>
}

export default Navbar
