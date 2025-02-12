import styled from "styled-components";
import { IconButton } from '@/components/shared/buttons';

// Dark overlay behind the modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// The white box where all our content goes
export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
`;

// X button in the corner
export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.removal};
  z-index: 1;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Just makes text black - used for parts of headings
export const BlackText = styled.span`
  color: ${({ theme }) => theme.colors.headingText};
`; 