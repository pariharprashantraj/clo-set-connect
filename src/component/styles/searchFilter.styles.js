import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const SearchContainer = styled.div`
  padding: 24px;
  background-color: #333;
  min-height: 18vh;
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 14px;
  outline: none;
  background-color: #444;
  height: 32px;
  color: #fff;
  font-weight: 600;
  border: 0px;
  &::placeholder {
    color: #999;
    font-weight: 400;
  }
  @media (max-width: 480px) {
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  font-size: 14px;
  @media (max-width: 480px) {
    right: 48px;
  }
`;

export const PricingOptions = styled.div`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  background-color: #222;
  height: 40px;
  font-weight: 400;
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ccc;
  gap: 32px;
  @media (max-width: 480px) {
  }
`;

export const FilterOptionsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ccc;
`;

export const FilterCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #888;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;

  &:checked {
    background-color: #888;
    border-color: #888;
    position: relative;
  }

  &:checked::after {
    content: "✔";
    font-size: 12px;
    color: #ccc;
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
