import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, dbWordList, numberState, sectionState } from "../atoms";
import Button from "./Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { generateTotalList } from "../utils/randomSelect";
import { wordList } from "../voca/voca";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 25px;
  border: #6f7071 solid 2px;
  width: fit-content;
  padding: 5px;
  margin-top: 8px;
  font-weight: bold;
  color: #f5f6fa;
  background-color: #e1b12c;
  border-radius: 10px;

  ${(props) =>
    props.$current === "SELECT"
      ? `
      transform: scale(1.1); 
      `
      : null}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 130px;
  //background-color: blue;
  padding-left: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 350px;
  justify-content: center;
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
`;

const RowContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

const CircleButton = styled.div`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 50%;
  padding-bottom: 1px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;

  background-color: ${(props) =>
    props.$calc === "minus" ? "#c23616" : "#359126"};
  color: #fff;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    outline: 0;
    //background: #4cd137;
    background-color: ${(props) =>
      props.$calc === "minus" ? "#e84118" : "#44bd32"};
  }
`;

const TextBox = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  font-size: 15px;
  color: #222222;
  width: 40px;
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
      props.$autobg === "SELECT"
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
  font-size: 15px;
  color: #e84118;
  padding-left: 5px;
  height: 20px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-right: 42px;
`;

const SelectSec = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const [error, setError] = useState("");
  const setCategory = useSetRecoilState(categoryState);
  const number = useRecoilValue(numberState);
  const setDbWordList = useSetRecoilState(dbWordList);

  const MAX = number.length * 10;
  const PAGE_MAX = 100;

  const onValid = (data) => {
    const mean = data.mean ? +data.mean : 0;
    const word = data.word ? +data.word : 0;
    const page = data.page ? +data.page : 1;

    if (mean > MAX || word > MAX || page > PAGE_MAX || mean + word > MAX) {
      setError("입력을 확인해주세요.");
      return;
    }

    setValue("mean", mean);
    setValue("word", word);
    setValue("page", page);

    setCategory({
      mean,
      word,
      page,
    });

    setCurrentSection("LIST");
    setError("");
    //db통신
    //결과를 set함수에 넣기

    const combinedWordList = generateTotalList(wordList, number);

    setDbWordList(combinedWordList);
  };

  const prevSection = (event) => {
    event.preventDefault();
    setCurrentSection("RANGE");
  };

  const minusCount = (state) => {
    //유효성 검사 (문자인지)
    const currentValue = +watch(state);
    if (state === "page") {
      setValue(
        state,
        currentValue - 1 >= 1
          ? currentValue - 1 > PAGE_MAX
            ? PAGE_MAX
            : currentValue - 1
          : 1
      );
    } else {
      setValue(state, currentValue - 1 >= 0 ? currentValue - 1 : 0);
    }
  };

  const plusCount = (state) => {
    const currentValue = +watch(state);
    if (state === "page") {
      setValue(
        state,
        currentValue + 1 <= PAGE_MAX ? currentValue + 1 : PAGE_MAX
      );
    } else if (state === "mean") {
      setValue(
        "mean",
        currentValue + 1 + Number(watch("word")) <= MAX
          ? currentValue + 1
          : currentValue
      );
    } else if (state === "word") {
      setValue(
        "word",
        currentValue + 1 + Number(watch("mean")) <= MAX
          ? currentValue + 1
          : currentValue
      );
    }
  };

  useEffect(() => {
    setValue("mean", 0);
    setValue("word", 0);
    setValue("page", 1);
  }, [setValue]);

  return (
    <>
      <Wrapper>
        <Title $current={currentSection}>STEP 2</Title>
        <Content>
          <Form onSubmit={handleSubmit(onValid)}>
            <RowDiv>
              <label htmlFor="mean">뜻</label>
              <RowContent>
                <CircleButton
                  $calc={"minus"}
                  onClick={() => minusCount("mean")}
                >
                  -
                </CircleButton>
                <TextBox
                  id="mean"
                  {...register("mean")}
                  min={0}
                  type="number"
                  $autobg={currentSection}
                />
                <CircleButton $calc={"plus"} onClick={() => plusCount("mean")}>
                  +
                </CircleButton>
                개
              </RowContent>
            </RowDiv>
            <RowDiv>
              <label htmlFor="word">단어</label>
              <RowContent>
                <CircleButton
                  $calc={"minus"}
                  onClick={() => minusCount("word")}
                >
                  -
                </CircleButton>
                <TextBox
                  id="word"
                  {...register("word")}
                  min={0}
                  type="number"
                  $autobg={currentSection}
                />
                <CircleButton $calc={"plus"} onClick={() => plusCount("word")}>
                  +
                </CircleButton>
                개
              </RowContent>
            </RowDiv>
            <RowDiv>
              <label htmlFor="page">출력</label>
              <RowContent>
                <CircleButton
                  $calc={"minus"}
                  onClick={() => minusCount("page")}
                >
                  -
                </CircleButton>
                <TextBox
                  id="page"
                  {...register("page")}
                  min={1}
                  type="number"
                  $autobg={currentSection}
                />
                <CircleButton $calc={"plus"} onClick={() => plusCount("page")}>
                  +
                </CircleButton>
                개
              </RowContent>
            </RowDiv>
            <ErrorDiv>{error}</ErrorDiv>
            <ButtonDiv>
              <Button onClick={prevSection} text={"이전"} />
              <Button text={"다음"} />
            </ButtonDiv>
          </Form>
        </Content>
      </Wrapper>
    </>
  );
};

export default SelectSec;
