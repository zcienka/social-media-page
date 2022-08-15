import {Wrapper, Photo} from './Post.styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {useState} from 'react'
import {PostList} from '../../../features/postsSlice'
import moment from 'moment'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';


function Post(props: PostList) {
    const [likePost, setLikePost] = useState(false)
    const dateAdded = moment(props.date).fromNow()

    return <Wrapper>
        <div className={'container'}>
            <Photo>
                <img src={props.image} alt={''}/>
            </Photo>

            <div className={'post-info-container'}>
                <div className={'login-date-container'}>
                    <h2 className={'user'}>{props.username}</h2>
                    <h2 className={'date-added'}>{dateAdded}</h2>
                </div>
                <h2 className={'caption'}>{props.caption}</h2>
            </div>
            <div onClick={() => setLikePost((likePost: boolean) => !likePost)}>
                {likePost ? <FavoriteIcon className={'heart-container red'}/> :
                    <FavoriteIcon className={'heart-container grey'}/>}
            </div>
        </div>
    </Wrapper>
}

export default Post
