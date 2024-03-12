import styled from "styled-components";
import Section from "./components/Section.jsx";
import { Reset } from "styled-reset";

const Page = styled.div`
  background-color: #7f8fa6;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;

function App() {
  return (
    <>
      <Reset />
      <Page>
        <Content>
          <Section />
        </Content>
      </Page>
    </>
  );
}

export default App;
