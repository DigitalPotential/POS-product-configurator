import styled from 'styled-components';

// Simple grid layout with some breathing room between items
export const Grid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

// Stack things next to each other, centered
export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

// Adds some space between sections, except for the last one
export const Section = styled.section`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`; 