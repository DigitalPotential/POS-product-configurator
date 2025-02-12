import styled from 'styled-components';

// Big bold text for main headings - centered with some spacing tweaks
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  text-align: center;
  padding-right: 2rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
`;

// Smaller headings for sections
export const SubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headingText};
`;

// Price tags - slightly bolder than normal text
export const Price = styled.span`
  color: ${({ theme }) => theme.colors.priceText};
  font-weight: 500;
`; 