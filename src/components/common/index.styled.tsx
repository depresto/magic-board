import React from "react";
import styled from "styled-components";

export const StyledSelect = styled.select`
  min-width: 60px;
  border-radius: 8px;
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  &:focus-visible {
    outline: 0;
  }
`;
