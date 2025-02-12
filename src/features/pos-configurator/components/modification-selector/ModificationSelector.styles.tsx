import { Heading, PriceText } from "@/components/shared";
import styled from "styled-components";

// Wrapper for all our size/flavor options
export const ModificationSection = styled.section`
  margin-bottom: 1.5rem;
`;

// Each group (sizes, flavors) gets some spacing
export const ModificationGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// The actual option buttons (like 'small', 'large', 'cola', etc)
export const ModificationButton = styled.button<{ $selected: boolean }>`
  padding: 1rem 1.5rem;
  margin: 0.25rem;
  border: 2px solid ${props => 
    props.$selected ? props.theme.colors.border : props.theme.colors.border};
  background: ${props => 
    props.$selected ? props.theme.colors.primaryLight : "white"};
  border-radius: 8px;
  cursor: pointer;
  min-height: 60px;
  font-size: 1.1rem;
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${props => props.$selected ? "white" : props.theme.colors.headingText};
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
  }

  // Makes price stand out a bit
  ${PriceText} {
    color: ${props => props.$selected ? "white" : "#459B69"};
  }
`;

// Nice grid layout that adjusts to screen size
export const ModificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

// Smaller heading for each section
export const SectionHeading = styled(Heading)`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;
