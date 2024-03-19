import RangeSec from "./RangeSec.jsx";
import SelectSec from "./SelectSec.jsx";
import ListSec from "./ListSec.jsx";

import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { sectionState } from "../atoms.js";

const LeftWrapper = styled.div`
  width: 450px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

const RightWrapper = styled.div`
  background-color: ${(props) => props.$currentbg};
  width: 750px;
  height: 800px;
  border-radius: 20px;

  ${(props) =>
    props.$disabled &&
    `
    opacity: 0.5; /* 예시로 투명도를 조절함. 원하는 스타일로 변경해주세요. */
    pointer-events: none; /* 이벤트를 무시하도록 설정 */
    cursor: not-allowed; /* 커서를 변경하여 비활성화 상태를 시각적으로 나타냄 */
  `}

  ${(props) =>
    !props.$disabled &&
    `
    transform: scale(1.05);
    `}
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.$currentbg};
  width: 100%;
  height: 300px;
  border-radius: 20px;
  height: calc(50% - 10px);

  ${(props) =>
    props.$disabled &&
    `
    opacity: 0.5; /* 예시로 투명도를 조절함. 원하는 스타일로 변경해주세요. */
    pointer-events: none; /* 이벤트를 무시하도록 설정 */
    cursor: not-allowed; /* 커서를 변경하여 비활성화 상태를 시각적으로 나타냄 */
  `}

  ${(props) =>
    !props.$disabled &&
    `
    transform: scale(1.05);
    `}
`;

const LeftContent = styled.div`
  width: 100%;
  height: 60%;
`;

const RightContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Section = () => {
  const currentSection = useRecoilValue(sectionState);

  const selectBgColor = (section) => {
    if (currentSection === section) {
      return "#f5f6fa";
    } else {
      return "#dcdde1";
    }
  };

  const disableSec = (section) => {
    return currentSection !== section;
  };

  return (
    <>
      {/* <Wrapper
        $disabled={disableSec("RANGE")}
        $currentbg={selectBgColor("RANGE")}
      >
        <Content>
          <RangeSec />
        </Content>
      </Wrapper>
      <Wrapper
        $disabled={disableSec("SELECT")}
        $currentbg={selectBgColor("SELECT")}
      >
        <Content>
          <SelectSec />
        </Content>
      </Wrapper>
      <Wrapper
        $disabled={disableSec("LIST")}
        $currentbg={selectBgColor("LIST")}
      >
        <Content>
          <ListSec />
        </Content>
      </Wrapper> */}
      <LeftWrapper>
        <Wrapper
          $disabled={disableSec("RANGE")}
          $currentbg={selectBgColor("RANGE")}
        >
          <LeftContent>
            <RangeSec />
          </LeftContent>
        </Wrapper>
        <Wrapper
          $disabled={disableSec("SELECT")}
          $currentbg={selectBgColor("SELECT")}
        >
          <LeftContent>
            <SelectSec />
          </LeftContent>
        </Wrapper>
      </LeftWrapper>
      <RightWrapper
        $disabled={disableSec("LIST")}
        $currentbg={selectBgColor("LIST")}
      >
        <RightContent>
          <ListSec />
        </RightContent>
      </RightWrapper>
    </>
  );
};

export default Section;
