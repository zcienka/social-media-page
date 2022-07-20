import {Wrapper} from './SearchPost.styles'
// import image from '../../../imgs/indeks.jpg'
import SearchIcon from '@mui/icons-material/Search'

function Navbar() {
    return <Wrapper>
        <div className={'container'}>
            <div className={'search-container'}>
                <SearchIcon className={'icon'}/>
                <p>Search</p>
            </div>
        </div>
    </Wrapper>

}

export default Navbar
