import styled from "styled-components";
export const HeaderContainer = styled.header`
  background: inherit;
  height: 5vh;
  display flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 8px;
`;

export const Logo = styled.div`
  background: inherit;
  background-image: url(/connect.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  width: auto;
  height: 20px;
  @media (max-width: 768px) {
    background-image: url(/logo192.png);
  }
`;
