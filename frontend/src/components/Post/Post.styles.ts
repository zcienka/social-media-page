import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  border-radius: 16px;
  font-family: 'Roboto', sans-serif;
  margin: 16px 8px 8px 8px;
  padding-bottom: 16px;

  @media screen and (min-width: 700px) {
    margin: 0 24px;
  }

  @media screen and (max-width: 999px) {
    border: 1px solid #D9D9D9; // light grey
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    justify-content: center;

    .container {
      cursor: pointer;
      width: 640px;
      border: 1px solid #D9D9D9;
      border-radius: 16px;
    }
  }

  @media screen and (min-width: 2000px) {
    .container {
      width: 720px;
      cursor: pointer;
    }
  }

  .post-info-container {
    border-bottom: 1px solid #D9D9D9;
    padding: 8px 16px 0 16px;

    .login-date-container {
      display: flex;
      flex-direction: row;

      .user {
        align-items: center;
        color: #343434; // off black
        font-size: 16px;
        font-weight: bold;
        margin: 16px 0;
        padding-right: 16px;
      }

      .date-added {
        align-items: center;
        color: #5d5e5e;
        display: flex;
        font-size: 16px;
        font-weight: bold;
        margin: 16px 0 16px 0;
      }
    }

    .caption {
      color: #343434; // off black
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 16px;
    }


  }

  .heart-container {
    display: flex;
    align-items: end;
    font-size: 54px;
    margin-left: 8px;
  }

  .red {
    color: red;
  }

  .grey {
    color: #D9D9D9;
  }

  .comments {
    //margin: 16px 0 16px 0;
    //margin-left: 16px;
    //margin-bottom: 16px;
    margin: 0 16px 16px 16px;
    
    .username {
      font-weight: bold;
    }
    
    .single-comment {
      display: flex;
      flex-direction: row;
      padding-bottom: 4px;
      //border: 2px solid red;
      
      .description {
        margin-left: 8px;
        color: #5D5E5E;
      }
    }
  }

`

export const Photo = styled.div`
  height: 320px;
  border-radius: 16px;

  @media screen and (min-width: 700px) {
    height: 560px;
  }

  @media screen and (min-width: 1000px) {
    height: 640px;
  }
  @media screen and (min-width: 2000px) {
    height: 720px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
  }


`

