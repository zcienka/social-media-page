import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  border-radius: 16px;
  font-family: 'Roboto', sans-serif;
  margin: 16px 8px 8px 8px;

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
      width: 640px;
      border: 1px solid #D9D9D9;
      border-radius: 16px;
    }
  }

  @media screen and (min-width: 2000px) {
    .container {
      width: 720px;
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

  .icons {
    display: flex;
    flex-direction: row;

    .heart-icon {
      font-size: 54px;
      margin-left: 12px;

      :hover {
        color: #6D6D6D;
      }
    }

    .trash-icon {
      font-size: 54px;
      color: #D9D9D9;

      :hover {
        color: #6D6D6D;
      }
    }

    .red {
      color: red;

      :hover {
        color: #B20000;
      }
    }

    .grey {
      color: #D9D9D9;
    }
  }

  .header {
    width: 100%;
    border-bottom: 1px solid #D9D9D9;

    p {
      margin-left: 16px;
      margin-bottom: 8px;
    }
  }

  .comments-show-recent {
    display: inline-block;
    max-height: 140px;
    min-height: 16px;
    white-space: nowrap;
    overflow: hidden !important;
    width: 100%;
    padding-left: 16px;
  }

  .username {
    font-weight: bold;
  }

  .single-comment {
    display: flex;
    flex-direction: row;
    padding-top: 8px;

    .description {
      margin-left: 8px;
      color: #5D5E5E;
    }
  }

  label {
    font-size: 20px;
    color: #343434;
  }

  .comment-input {
    margin: 0 16px 16px 16px;
    display: flex;
    flex-direction: row;

    input {
      border-radius: 12px;
      border: 1px solid #D9D9D9;
      font-family: inherit;
      padding: 12px;
      width: 100%;

      :active, :focus {
        border-color: #3F8EFC;
      }
    }

    button {
      background-color: transparent;
      border: none;
      color: #3F8EFC;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
      padding: 8px 16px;
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

export const DeletePostPopup = styled.div`
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.7));
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;

  p {
    color: #343434;
    font-weight: bold;
  }

  .message {
    background-color: #FAF9F6;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 160px;
    padding: 24px;
    width: 240px;

    .buttons {
      align-items: end;
      display: flex;
      flex-direction: row;
      height: 100%;

      button {
        background-color: #3F8EFC;
        border-radius: 12px;
        border: none;
        color: #FAF9F6;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        padding: 8px 12px;

        :hover {
          background-color: #056cfb;
        }
      }

      .cancel-btn {
        display: flex;
        justify-content: end;
        width: 100%;
      }
    }
  }
`
