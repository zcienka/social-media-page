import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7),
  rgba(0, 0, 0, 0.7));
  display: flex;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100vw;

  .popup-window {
    background-color: #FAF9F6;
    border-radius: 16px;
    display: flex;
    height: 720px;
    width: 1000px;
  }

  .image-container {
    width: 50%;

    .image {
      border-radius: 16px 0 0 16px;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .description-container {
    font-family: 'Heebo', sans-serif;
    padding: 16px;
    width: 50%;
    display: flex;
    flex-direction: column;
    
    .close-icon {
      display: flex;
      justify-content: right;
    }

    textarea {
      background-color: #FAF9F6;
      border-radius: 16px;
      border: 1px solid #D9D9D9;
      font-family: 'Heebo', sans-serif;
      height: 100%;
      padding: 8px;
      resize: none;
      width: 100%;

      :focus {
        outline: none !important;
        border: 1px solid #6D6D6D;
      }
    }

    .post-description {
      font-weight: bold;
      margin-bottom: 8px;
    }
    .publish-btn-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;

      .publish-btn {
        background-color: transparent;
        border: 0;
        color: #3F8EFC;
        cursor: pointer;
        font-family: 'Heebo', sans-serif;
        font-size: 16px;
        font-weight: bold;
        text-align: end;
        padding-top: 16px;
      }
    }
  }

`