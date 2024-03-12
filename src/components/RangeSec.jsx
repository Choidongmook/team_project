import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { numberState, sectionState } from "../atoms";
import { generateRangeArray, parseInputString } from "../utils/parsing";
import Button from "./Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 35px;
`;

const Title = styled.h1`
  font-size: 25px;
  border: #6f7071 solid 2px;
  width: fit-content;
  padding: 5px;
  font-weight: bold;
  color: #f5f6fa;
  background-color: #e1b12c;
  border-radius: 10px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 50px;
`;

const RowDiv = styled.div``;

const OptionDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const RadioButton = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  width: 18px;
  height: 18px;
  border: 2px solid #ccc; // 체크되지 않았을 때의 테두리 색상
  border-radius: 50%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거
  cursor: pointer;

  &:checked {
    background-color: #7f8fa6; // 체크 시 내부 원으로 표시될 색상
    border: 3px solid white; // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 1.6px #7f8fa6; // 얘가 테두리가 됨
    // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
    // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
  }
`;

const InputDiv = styled.div`
  display: flex;
  gap: 20px;
  font-size: 20px;
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5; /* 예시로 투명도를 조절함. 원하는 스타일로 변경해주세요. */
    pointer-events: none; /* 이벤트를 무시하도록 설정 */
    cursor: not-allowed; /* 커서를 변경하여 비활성화 상태를 시각적으로 나타냄 */
  `}
`;

const TextBox = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  font-size: 15px;
  color: #222222;
  width: ${(props) => (props.custom ? "238px" : "90px")};
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  background: none;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: ${(props) =>
      props.autobg === "RANGE"
        ? "0 0 0 30px #f5f6fa inset"
        : "0 0 0 30px #dcdde1 inset"};
    /* -webkit-box-shadow: 0 0 0 30px #fff inset; */
    -webkit-text-fill-color: #000;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const ErrorDiv = styled.div`
  padding-left: 15px;
  height: 20px;
  font-size: 15px;
  color: #e84118;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RangeSec = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedOption, setSelectedOption] = useState("option1");
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const setNumber = useSetRecoilState(numberState);

  const handleRadioChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    if (option !== "option1") {
      //2 비우기
    } else {
      //1 비우기
    }
  };

  const onValid = (data) => {
    let resultNum = [];
    if (selectedOption === "option1" && data.defaultFrom && data.defaultTo) {
      //입력처리
      //현재 Day보다 큰 숫자 불가
      const fromNum = +data.defaultFrom;
      const toNum = +data.defaultTo;
      if (fromNum > toNum) {
        console.log("error");
        return;
      }
      resultNum = generateRangeArray(fromNum, toNum);
      setNumber(resultNum);
      setCurrentSection("SELECT");
    }
    if (selectedOption === "option2" && data.custom) {
      //패턴 검사를 여기서?
      resultNum = parseInputString(data.custom);
      console.log(resultNum);
      if (resultNum.includes(-1)) return;
      setNumber(resultNum);
      setCurrentSection("SELECT");
    }
  };

  return (
    <>
      <Wrapper>
        <Title>STEP 1</Title>
        <Content>
          <Form onSubmit={handleSubmit(onValid)}>
            <RowDiv>
              <OptionDiv>
                <RadioButton
                  type="radio"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleRadioChange}
                />
                <InputDiv disabled={selectedOption !== "option1"}>
                  <TextBox
                    {...register("defaultFrom")}
                    type="number"
                    min={1}
                    autobg={currentSection}
                  />
                  ~
                  <TextBox
                    {...register("defaultTo")}
                    type="number"
                    min={1}
                    autobg={currentSection}
                  />
                </InputDiv>
              </OptionDiv>
              <ErrorDiv></ErrorDiv>
            </RowDiv>
            <RowDiv>
              <OptionDiv>
                <RadioButton
                  type="radio"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleRadioChange}
                />
                <InputDiv disabled={selectedOption !== "option2"}>
                  <TextBox
                    {...register("custom", {
                      pattern: /^\d+(?:-[,-]?\d+)?(?:,\d+(?:-[,-]?\d+)?)*$/,
                    })}
                    type="text"
                    custom={"custom"}
                    autobg={currentSection}
                  />
                </InputDiv>
              </OptionDiv>
              <ErrorDiv></ErrorDiv>
            </RowDiv>
            <ButtonDiv>
              <Button text={"다음"} />
            </ButtonDiv>
          </Form>
        </Content>
      </Wrapper>
    </>
  );
};

export default RangeSec;
