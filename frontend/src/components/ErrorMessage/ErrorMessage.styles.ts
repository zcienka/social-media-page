import styled from "styled-components"

export const Wrapper = styled.div`
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
  }
`
