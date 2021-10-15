import React, { useState } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import axios from "axios";

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Auth = ({stateContainer, auth}) => {
  const [state, setState] = useState({
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "enter a valid email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "enter a valid password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  });
  const loginHandler =  () => {
    auth(
      state.formControls.email.value,
      state.formControls.password.value,
      true,
    )
  };

  const registerHandler =  () => {
    auth(
      state.formControls.email.value,
      state.formControls.password.value,
      false,
    )
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    setState({
      ...state,
      formControls,
      isFormValid,
    });
  };

  const renderInputs = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      );
    });
  };
  return (
    <div className={classes.Auth}>
      <div className={classes.Auth__wrapper}>
        <h1>Auth</h1>

        <form
          className={classes.Auth__form}
          onSubmit={(e) => e.preventDefault()}
        >
          {renderInputs()}

          <Button
            onClick={() => loginHandler()}
            type="success"
            disabled={!state.isFormValid}
          >
            Log in
          </Button>
          <Button
            onClick={() => registerHandler()}
            type="primary"
            disabled={!state.isFormValid}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
