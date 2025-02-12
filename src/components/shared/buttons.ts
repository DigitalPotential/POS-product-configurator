import styled from 'styled-components';

// Base button styles that all buttons share
export const BaseButton = styled.button`
  cursor: pointer;
  border-radius: 8px;
  font-family: inherit;
  
  &:hover {
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }
`;

// Basic button
export const Button = styled(BaseButton)`
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
`;

// Action buttons
export const ActionButton = styled(BaseButton)`
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
`;

// For modal close button
export const IconButton = styled(BaseButton)`
  background: none;
  padding: 0.5rem;
  line-height: 1;
  border: none;
`; 