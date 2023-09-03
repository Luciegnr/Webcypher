import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  height: 80px;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;

  @media screen and (max-width: 958px) {
    transition: 0.8s all ease;
  }
`;

export const NavLogo = styled(LinkR)`
  color: #FFFFFF;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: white;
  
`;

export const NavSpace = styled.nav`
  display: flex;
  align-items: center;
  padding-top: 0%;
  padding-right: 0%;
  padding-bottom: 0%;
  padding-left: 75%;

  @media screen and (max-width: 1735px) {
    padding-left: 65%;    
  }

  @media screen and (max-width: 1250px) {
    padding-left: 55%;    
  }

  @media screen and (max-width: 1150px) {
    padding-left: 50%;    
  }

  @media screen and (max-width: 900px) {
    padding-left: 40%;    
  }
  
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #4a1b5f;
  padding: 10px 22px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: 5%;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #4a1b5f;
    -webkit-box-shadow: 0px 0px 5px 3px #656565;
    -moz-box-shadow: 0px 0px 5px 3px #656565;
    color: #ffffff;
  }
`;

export const NavBtnLink2 = styled(LinkR)`
  border-radius: 50px;
  background: #4a1b5f;
  padding: 10px 22px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #4a1b5f;
    -webkit-box-shadow: 0px 0px 5px 3px #656565;
    -moz-box-shadow: 0px 0px 5px 3px #656565;
    color: #ffffff;
  }
`;
