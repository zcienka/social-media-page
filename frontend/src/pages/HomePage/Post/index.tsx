import {Wrapper, Photo} from './Post.styles'
import photo from '../../../imgs/indeks.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {useState} from 'react'

function Post() {
    const [likePost, setLikePost] = useState(false)

    return <Wrapper>
        <div className={'container'}>
            <Photo>
                <img src={photo}/>
            </Photo>

            <div className={'post-info-container'}>
                <div className={'login-date-container'}>
                    <h2 className={'user'}>username</h2>
                    <h2 className={'date-added'}>16 minutes ago</h2>
                </div>
                <h2 className={'caption'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet
                    commodi consequatur corporis dicta, dignissimos dolorem doloremque eaque enim eum facilis, fugiat
                    hic in inventore magnam maiores molestias mollitia natus nisi odio pariatur quaerat quasi quia
                    quibusdam quidem quod repudiandae rerum similique tempore ut! Alias error illo iure minima nobis
                    officia perspiciatis possimus sequi tenetur, ullam? Commodi corporis deserunt impedit iure non
                    quibusdam sed similique ullam! Aut beatae facilis fugit nobis sunt. A ad blanditiis dolore, dolores
                    eaque enim exercitationem explicabo harum illo inventore iste maiores minus, neque, nostrum
                    perspiciatis quaerat quasi reiciendis reprehenderit soluta ut! Eveniet fugit recusandae sed.</h2>
            </div>
            <div onClick={() => setLikePost((likePost: boolean) => !likePost)}>
                {likePost ? <FavoriteIcon className={'heart-container red'}/> :
                    <FavoriteIcon className={'heart-container grey'}/>}
            </div>
        </div>

    </Wrapper>
}

export default Post
