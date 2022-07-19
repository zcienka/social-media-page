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
      align-content: center;
      display: flex;
      height: 100%;
      justify-content: end;
      width: 50%;

      .icon {
        color: #343434;
        height: 100%;
        font-size: 40px;
        margin-right: 16px;
      }
    }
  }


  @media screen and (min-width: 900px) {

  }
`

export const MenuIcon = styled.div`

`