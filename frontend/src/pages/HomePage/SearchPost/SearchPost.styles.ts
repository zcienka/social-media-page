import styled from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;  
  
  .container {
    margin: 16px 8px 8px 8px;
    background-color: #D9D9D9;
    height: 54px;
    border-radius: 16px;
    width: 100%;

    @media screen and (min-width: 700px) {
      margin: 16px 24px;
    }



    @media screen and (min-width: 1000px) {
      width: 640px;
      
    }
    @media screen and (min-width: 2000px) {
      width: 720px;
    }
    
    .search-container {
      display: flex;
      align-items: center;
      height: 100%;

      .icon {
        color: #5d5e5e;
        margin: 0 8px 0 16px;
      }

      p {
        font-family: 'Raleway', sans-serif;
        color: #5d5e5e; //  dark-grey
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

`

// interface StyleProps {
//     image?: string;
// }
//
// export const Icon = styled.div<StyleProps>`
//   background-image: url(${props => props.image});
//   display: flex;
//   width: 100px;
//   height: 100px;
// `;
