import { colors } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

export interface TextInputControllerProps {
  labelText?: string;
  helperText?: string;
  error?: string;
  touched?: boolean;
  onChange?: (text: string) => void;
  value?: string;
  inputProps?: any;
  fieldStyle?: object;
  onBlur?: () => void;
  outlineColor?: string;
}

const TextInputController: React.FC<TextInputControllerProps> = ({
  labelText = "",
  helperText,
  error,
  touched,
  onChange,
  value,
  inputProps,
  fieldStyle,
  onBlur,
  outlineColor,
}) => {
  return (
    <View style={fieldStyle}>
      <TextInput
        label={labelText}
        mode="outlined"
        value={value}
        outlineColor={outlineColor || colors.gray[300]}
        onChangeText={onChange}
        error={!!(touched && error)}
        onBlur={onBlur}
        style={{ backgroundColor: colors.white }}
        {...inputProps}
      />
      {touched && error && (
        <View>
          {
            <Ionicons
              color={colors.red[600]}
              name="alert-circle-outline"
              size={16}
            />
          }
          {error}
        </View>
      )}
    </View>
  );
};

export default TextInputController;
