import {Wrapper, Photo, PostInfo} from './Post.styles'

function Post() {

    return <Wrapper>
        <Photo>
            post
        </Photo>
        <PostInfo>
            user
        </PostInfo>
        <div className={'heart-container'}>
            heart
        </div>
    </Wrapper>
}

export default Post
