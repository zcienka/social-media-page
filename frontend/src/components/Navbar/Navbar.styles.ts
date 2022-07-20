import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: #A7ABB0;
  height: 64px;
  width: 100vw;

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

    .icon-container {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: end;
      width: 50%;
      
      .icon {
        display: flex;
        color: #343434; // off black
        font-size: 48px;
        transition: background-color 300ms ease-in-out 100ms;
        border-radius: 100px;
        padding: 4px;
        margin-right: 12px;

        :hover {
          background-color: #6D6D6D;
        }
      }
    }
  }
  



`

export const MenuItems = styled.div`
  color: red;
  
  .visible {
      position: absolute;
      background-color: grey;
      right: 50px;
      top: 64px;
    
    }
    .not-visible {
      display: none;
      color: blue;
    }
`