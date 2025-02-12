import styled from "styled-components";
import { Flex } from '@/components/shared/layout';
import { ActionButton } from '@/components/shared/buttons';

// Sticky footer with total price and buttons
export const TotalSection = styled(Flex)`
  margin-top: 2rem;
  padding: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  justify-content: space-between;
`;

// Big bold total amount
export const TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headingText};
`;

// Keeps the buttons next to each other with some space
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

// Red outline button for resetting choices
export const ResetButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.removal};
  border: 2px solid ${({ theme }) => theme.colors.removal};
  background: white;

  &:hover {
    background: ${({ theme }) => theme.colors.removalLight};
    color: white;
  }
`;

// Blue button to finish up
export const DoneButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
