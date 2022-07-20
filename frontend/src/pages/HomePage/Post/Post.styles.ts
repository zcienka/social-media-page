import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  border-radius: 16px;
  font-family: 'Raleway', sans-serif;
  margin: 16px 8px 8px 8px;

  @media screen and (min-width: 700px) {
    margin: 0 24px;
  }

  @media screen and (max-width: 999px) {
    border: 2px solid #D9D9D9; // light grey
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    justify-content: center;

    .container {
      width: 640px;
      border: 2px solid #D9D9D9;
      border-radius: 16px;
    }
  }

  @media screen and (min-width: 2000px) {
    .container {
      width: 720px;
    }
  }

  .post-info-container {
    //display: flex;
    //flex-direction: row;
    border-bottom: 2px solid #D9D9D9;
    padding: 8px 16px 0 16px;

    .login-date-container {
      display: flex;
      flex-direction: row;

      .user {
        color: #343434; // off black
        font-size: 16px;
        font-weight: bold;
        margin: 16px 0;
        align-items: center;
        padding-right: 16px;
      }

      .date-added {
        display: flex;
        font-size: 16px;
        font-weight: bold;
        color: #5d5e5e;
        margin: 16px 0 16px 0;
        align-items: center;
      }
    }
    .caption {
      font-size: 16px;
      font-weight: bold;
      color: #343434; // off black
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
`

export const Photo = styled.div`
  color: red;
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

