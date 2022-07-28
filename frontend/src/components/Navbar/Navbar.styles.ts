import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 64px;
  width: 100%;
  border-bottom: 2px solid #D9D9D9; // light grey
  
  .main-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;

    .name-container {
      align-items: center;
      display: flex;
      height: 100%;
      width: 50%;
      margin-left: 16px;
    }

    .button-container {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: end;
      width: 50%;
      
      .button {
        display: flex;
        color: #FAF9F6; // off white
        font-size: 24px;
        transition: background-color 300ms ease-in-out 100ms;
        border-radius: 12px;
        padding: 10px 16px;
        margin-right: 12px;
        background-color: #3F8EFC;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;

        :hover {
          background-color: #6D6D6D;
        }
      }
    }
  }

`
