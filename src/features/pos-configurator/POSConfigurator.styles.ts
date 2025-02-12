import styled from "styled-components";

// Card that shows the drink you can customize
export const ProductCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  max-width: 300px;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

// Name of the drink
export const ProductName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

// Base price before any extras
export const ProductPrice = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

// Shows keyboard shortcuts when you hold Alt
export const ShortcutHint = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  z-index: 2000;
`;

// Style for keyboard keys in the shortcut hint
export const ShortcutKey = styled.kbd`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  margin: 0 2px;
`; 