import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
  width: 100%;
  background-color: white;
  z-index: 1000;
  position: absolute;
  
  .popup-window {
    border-radius: 16px;
    display: flex;
    height: 720px;
    width: 1000px;
    border: 1px solid #D9D9D9;
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
    font-family: 'Roboto', sans-serif;
    padding: 16px;
    width: 50%;
    display: flex;
    flex-direction: column;

    textarea {
      border-radius: 16px;
      border: 1px solid #D9D9D9;
      font-family: inherit;
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
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: bold;
        text-align: end;
        padding-top: 16px;
      }
    }
  }
`