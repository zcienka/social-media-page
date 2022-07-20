import {Wrapper, MenuItems} from './Navbar.styles'
import {Menu} from '@mui/icons-material'
import {useState} from "react"

function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    console.log({showMenu})

    return <Wrapper>
        <div className={'main-container'}>
                <p className={'name-container'}>Menu</p>
            <div className={'icon-container'}>
                <Menu className={'icon'} onClick={() => setShowMenu((showMenu) => !showMenu)}/>
                <MenuItems >
                    <div className={showMenu ? 'visible' : 'not-visible'}>
                        <ol>
                            <li>Log out</li>
                        </ol>
                    </div>
                </MenuItems>
            </div>
        </div>
    </Wrapper>
}

export default Navbar
