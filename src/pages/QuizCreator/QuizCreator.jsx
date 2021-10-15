import React, { Fragment, useContext, useState } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { QuizCreatorContext } from "./container/quizCreatorContext";

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Variant ${number}`,
      errorMessage: "The value cannot be empty",
      id: number,
    },
    { required: true }
  );
};

const createFormControl = () => {
  return {
    question: createControl(
      {
        label: "Input question",
        errorMessage: "The question cannot be empty",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

const QuizCreator = () => {
  const {stateCreator, createQuizQuestion, finishCreateQuiz} = useContext(QuizCreatorContext)
  const [state, setState] = useState({
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControl(),
  });

  

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = state.formControls;

    const questionItem = {
      question: question.value,
      id: stateCreator.quiz.length + 1,
      rightAnswerId: state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    createQuizQuestion(questionItem);

    setState({
      ...state,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl(),
    });
  };

  const createQuizHandler = (e) => {
    e.preventDefault();
    finishCreateQuiz(stateCreator.quiz);
    setState({
      ...state,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl(),
    });
  };

  const changeHandler = (value, controlName) => {
    const formControls = { ...state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    setState({
      ...state,
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  const renderControls = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName];

      return (
        <Fragment key={controlName + index}>
          <Input
            key={index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Fragment>
      );
    });
  };

  const selectChangeHandler = (e) => {
    setState({
      ...state,
      rightAnswerId: +e.target.value,
    });
  };
  return (
    <div className={classes.QuizCreator}>
      <div className={classes.QuizCreator__wrapper}>
        <h1 className={classes.QuizCreator__title}>Create test</h1>
        <form
          className={classes.QuizCreator__form}
          onSubmit={(e) => submitHandler(e)}
        >
          {renderControls()}

          <Select
            label={"Order rigth answer"}
            rightAnswerId={state.rightAnswerId}
            value={state.rightAnswerId}
            onChange={(e) => selectChangeHandler(e)}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          />
          <Button
            type="primary"
            onClick={(e) => addQuestionHandler(e)}
            disabled={!state.isFormValid}
          >
            Add Question
          </Button>
          <Button
            type="success"
            onClick={(e) => createQuizHandler(e)}
            disabled={stateCreator.quiz.length === 0}
          >
            Create test
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizCreator;
