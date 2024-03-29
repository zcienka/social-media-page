import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 64px;
  width: 100%;
  border-bottom: 2px solid #D9D9D9; // light grey

  @media screen and (min-width: 1000px) {
    justify-content: center;
    display: flex;
  }

  .container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;

    @media screen and (min-width: 1000px) {
      width: 640px;
    }

    @media screen and (min-width: 2000px) {
      width: 720px;
    }

    .name {
      align-items: center;
      display: flex;
      height: 100%;
      width: 50%;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      padding-left: 8px;

      @media screen and (min-width: 700px) {
        padding-left: 24px;
      }

      @media screen and (min-width: 1000px) {
        padding-left: 0;
      }
    }


    .icons-container {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: end;
      width: 50%;
      padding-right: 8px;
      font-size: 64px;

      .add-photo-icon {
        font-size: 40px;
        cursor: pointer;
      }

      .settings-icon {
        font-size: 40px;
        cursor: pointer;
      }

      @media screen and (min-width: 700px) {
        padding-right: 24px;
      }

      @media screen and (min-width: 1000px) {
        padding-right: 0;
      }
    }
  }
`

export const MenuPopup = styled.div`
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;

  .popup-window {
    background-color: #FAF9F6;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    height: 100px;
    padding: 8px;
    width: 160px;
    font-size: 16px;
    
    .close-icon {
      display: flex;
      justify-content: end;
      width: 100%;
      cursor: pointer;
    }
    
    li {
      padding: 4px 8px;
      cursor: pointer;
      
      :hover {
        background-color: #D9D9D9;
      }
    }
  }
`
