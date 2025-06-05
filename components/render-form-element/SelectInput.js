/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';

import { View, Pressable, ScrollView } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { TextInput, HelperText, List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { colors } from 'utils/constants/colors';

const SelectInput = (props) => {
  const {
    labelText = '',
    helperText,
    error,
    touched,
    options = [],
    onChange,
    onBlur,
    value,
    inputProps,
    fieldStyle,
    outlineColor,
  } = props;
  const actionSheetRef = useRef(null);

  const openOptionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onCloseSheet = () => {
    onBlur();
    actionSheetRef.current?.hide();
  };

  const onSelectOption = (value) => {
    onCloseSheet();
    onChange(value);
  };

  const displayValue = _.find(options, (opt) => opt.value === value);
  return (
    <>
      <View style={fieldStyle}>
        <Pressable onPress={!inputProps?.disabled ? openOptionSheet : null}>
          <TextInput
            disabled={inputProps?.disabled}
            label={labelText}
            editable={false}
            mode="outlined"
            right={
              <TextInput.Icon
                onPress={openOptionSheet}
                disabled={inputProps?.disabled}
                icon={() => <Ionicons name="chevron-down" color={colors.primary} size={24} />}
              />
            }
            value={displayValue?.label || ''}
            outlineColor={outlineColor || colors.gray[300]}
            style={{ backgroundColor: colors.white }}
            {...inputProps}
          />
        </Pressable>

        {helperText && <HelperText>{helperText}</HelperText>}
        {touched && error && (
          <HelperText
            type="error"
            leftIcon={<Ionicons color={colors.red[600]} name="alert-circle-outline" size={16} />}
          >
            {error}
          </HelperText>
        )}
      </View>
      <ActionSheet ref={actionSheetRef}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          {_.map(options, (opt, index) => (
            <List.Item
              title={opt?.label || ''}
              key={opt?._id || `opt_${index}`}
              onPress={() => onSelectOption(opt?.value)}
            />
          ))}
        </View>
        </ScrollView>
      </ActionSheet>
    </>
  );
};

export default SelectInput;
