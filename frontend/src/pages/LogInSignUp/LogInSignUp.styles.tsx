import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #FAF9F6; // off-white
  font-family: 'Roboto', sans-serif;


  @media screen and (min-width: 1000px) {
    align-items: center;
    display: flex;
    height: calc(100vh - 64px);
    justify-content: center;
  }


  .container {
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1000px) {
      background-color: #FAF9F6;
      flex-direction: column;
      height: 720px;
      top: 0;
      width: 600px;
      border: 1px solid #D9D9D9;
      border-radius: 16px;
    }

    .buffering-container {
      min-height: 4px;

      .buffering {
        background-color: #D9D9D9;
        color: #FAF9F6;

        @media screen and (min-width: 1000px) {
          margin: 0 10px;
        }
      }

      .hidden {
        display: none;
      }
    }

    .form-container {
      padding: 80px 16px;
      height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;

      @media screen and (min-width: 1000px) {
        padding: 80px;
      }

      h1 {
        font-weight: bold;
        font-size: 56px;
        color: #343434;

        @media screen and (min-width: 1000px) {
          font-size: 56px;
        }
      }

      .log-in-info {
        color: #818C99;
        padding: 16px 0 16px 0;
        font-size: 20px;

        @media screen and (min-width: 1000px) {
          font-size: 24px;
        }
      }

      label {
        font-size: 20px;
        color: #343434;
      }

      input {
        border-radius: 12px;
        border: 1px solid #D9D9D9;
        background-color: #FAF9F6;
        margin: 8px 0;
        padding: 12px;
        width: 100%;

        :active, :focus {
          border-color: #3F8EFC;
        }
      }

      .invalid-credentials {
        color: red;
        display: flex;
        align-items: center;
        font-size: 16px;

        span {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }
      }

      .button-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: flex-end;
        margin-top: auto;
        margin-bottom: 16px;

        .confirm-button {
          background-color: #3F8EFC;
          border-radius: 12px;
          border: none;
          color: #FAF9F6;
          font-size: 24px;
          font-weight: bold;
          margin-top: 16px;
          padding: 12px 8px;
          width: 100%;
          cursor: pointer;

          :hover {
            background-color: #056cfb;
          }
        }

        span {
          color: #3F8EFC;
          font-weight: bold;
        }

        .log-in-message {
          text-align: end;
        }

        .sign-up-message {
          margin-top: 16px;
        }
      }
    }
  }
`
