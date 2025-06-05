import React from "react";
import TextInput from "./TextInput";
type FormInputType = "input" | "select" | "select-search";

type RenderFormElementProps = {
  formInputType: FormInputType;
  [key: string]: any;
};

const RenderFormElement: React.FC<RenderFormElementProps> = (props) => {
  const { formInputType, ...otherProps } = props;

  switch (formInputType) {
    case "input":
      return <TextInput {...otherProps} />;
    // case "select":
    //   return <SelectInput {...otherProps} />;

    default:
      return null;
  }
};

export default RenderFormElement;
