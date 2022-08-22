import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
  width: 100vw;

  .popup-window {
    border-radius: 16px;
    border: 1px solid #D9D9D9;
    cursor: pointer;
    display: flex;
    height: 640px;
    padding: 8px;
    width: 640px;

    .photo-input {
      width: 100%;
    }

    .photo-icon-container {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-family: 'Roboto', sans-serif;
      font-size: 24px;
      height: 100%;
      justify-content: center;
      width: 100%;

      .drag-and-drop {
        font-weight: 700;
        padding-bottom: 8px;
        color: #343434;
      }

      .photo-icon {
        font-size: 240px;
        color: #D9D9D9;
      }

      .choose-files-btn {
        background-color: #3F8EFC;
        border: 0;
        padding: 8px;
        border-radius: 8px;
        color: #FAF9F6;
        font-size: 16px;
      }
    }
  }
`