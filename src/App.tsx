import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import theme from "./theme";
import { POSConfigurator } from "@/features/pos-configurator";
import { PageContainer, Heading } from "./components/shared";
import styled from "styled-components";

const Title = styled(Heading)`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer>
        <Title>POS System</Title>
        <POSConfigurator />
      </PageContainer>
    </ThemeProvider>
  );
}

export default App;