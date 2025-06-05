/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, memo, useMemo, useRef } from 'react';
import { Dimensions } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, IconButton, Chip, HelperText, List, Searchbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import _ from 'lodash';
import FuzzySearch from 'fuzzy-search';
import { colors } from 'utils/constants/colors';
import { AppText } from 'components/shared-component';
import { fontFamily } from 'utils/constants/baseStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import styles from 'sections/media-banner/styles';

const screenWidth = Dimensions.get('screen').width;

const SearchSelectInput = (props) => {
  const {
    helperText,
    error,
    touched,
    placeholder,
    options = [],
    onChange,
    value,
    inputProps,
    getOptionLabel,
    searchByKey,
    optionKey,
    multiple = false,
    optionLoading,
    fieldStyle
  } = props;
  const actionSheetRef = useRef(null);

  const [isSearchFocus, setSearchFocued] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const debounceSearchFn = useMemo(() => _.debounce(handleSearch, 300), [options]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (value) setSelectedOptions(value);
  }, [value]);

  const openOptionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onSelectOption = (value) => {
    if (multiple) {
      let upSelectedOpt = [...selectedOptions];
      // check if opt was selected earlier
      if (checkIfSelected(value)) {
        upSelectedOpt = _.filter(selectedOptions, (opt) => opt && opt[optionKey] !== value[optionKey]);
      } else {
        upSelectedOpt.push(value);
      }
      setSelectedOptions(upSelectedOpt);
    } else {
      setSelectedOptions(value);
      onChange(value);
      onCloseActionSheet();
    }
  };

  const onBtDone = () => {
    onChange(selectedOptions);
    onCloseActionSheet();
  };

  const checkIfSelected = (value) => {
    if (!multiple) {
      if (selectedOptions[optionKey] === value[optionKey]) {
        return true;
      }
    } else {
      const ifSelectedEarlier = _.some(selectedOptions, (opt) => opt && opt[optionKey] === value[optionKey]);
      return ifSelectedEarlier;
    }
  };

  const onCloseActionSheet = () => {
    actionSheetRef.current?.hide();
    setSearchFocued(false);
    setSearchText('');
    setFilteredOptions(options);
    setSelectedOptions(value);
  };

  function handleSearch(value) {
    let result = [...options];
    if (value) {
      const searcher = new FuzzySearch(result, [searchByKey], {
        caseSensitive: false
      });
      result = searcher.search(value);
    }
    setFilteredOptions(result);
  }

  const [heigthSection, setHeightSection] = useState('75%');

  const renderValue = () => {
    if (multiple) {
      return (
        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          <View style={styles.container} onStartShouldSetResponder={() => true}>
            {_.map(value, (val, ind) => (
              <Chip
                key={`${getOptionLabel(val)}_${ind}`}
                disabled={inputProps?.disabled}
                selectedColor={colors.normalblack}
                style={styles.chip}
              >
                {getOptionLabel(val)}
              </Chip>
            ))}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <>
          <View>
            <Chip disabled={inputProps?.disabled} selectedColor={colors.normalblack} style={styles.chip}>
              {getOptionLabel(value)}
            </Chip>
          </View>
        </>
      );
    }
  };

  return (
    <>
      <View style={fieldStyle}>
        <Pressable onPress={!inputProps?.disabled ? openOptionSheet : null}>
          <TextInput
            editable={false}
            label={placeholder}
            mode="outlined"
            outlineColor={colors.gray[300]}
            error={touched && error}
            style={{ backgroundColor: colors.white, padding: 0 }}
            {...inputProps}
            value={!_.isEmpty(value) ? 'value' : ''}
            right={
              <TextInput.Icon
                disabled={inputProps?.disabled}
                onPress={openOptionSheet}
                icon={() => <Ionicons color={colors.primary} name="chevron-down" size={24} />}
              />
            }
            render={(props) => (
              <View
                style={[
                  styles.innerboxContainer,
                  // optionLoading && {paddingVertical: 8},
                  { paddingVertical: 8 }
                ]}
              >
                {!_.isEmpty(value) ? renderValue() : <AppText></AppText>}
                {/* {optionLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <IconButton
                    disabled={inputProps?.disabled}
                    onPress={openOptionSheet}
                    icon={() => (
                      <Ionicons
                        name="chevron-down"
                        color={colors.primary}
                        size={24}
                      />
                    )}
                  />
                )} */}
              </View>
            )}
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
      <ActionSheet
        containerStyle={{ paddingTop: 16, paddingHorizontal: 8, height: inputProps?.height ? '50%' : '98%' }}
        ref={actionSheetRef}
        closeOnPressBack={false}
        closeOnTouchBackdrop={false}
      >
        <KeyboardAwareScrollView style={{ backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
          <View style={{ maxHeight: isSearchFocus ? '100%' : null, height: isSearchFocus ? '100%' : null }}>
            <View style={isSearchFocus ? styles.box : styles.boxes}>
              <View style={styles.innerBox}>
                  <View style={styles.inBox}>
                    <Button textColor="red" labelStyle={styles.button} onPress={onCloseActionSheet}>
                      Cancel
                    </Button>
                {multiple && (
                    <Button labelStyle={styles.button} onPress={onBtDone}>
                      Done
                    </Button>
                    )}
                  </View>
                <Searchbar
                  placeholder="Search Options"
                  mode="bar"
                  disabled={inputProps?.disabled}
                  onChangeText={(value) => {
                    setSearchText(value);
                    debounceSearchFn(value);
                  }}
                  style={styles.textInput}
                  OutlineColor={colors.gray[300]}
                  {...inputProps}
                  icon={() => <Ionicons name="search" color={colors.gray[300]} size={24} style={styles.search} />}
                />
              </View>
            </View>
            <FlatList
              width="100%"
              style={{ marginBottom: 80 }}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{ width: '100%', alignItems: 'flex-start' }}
              data={filteredOptions}
              keyExtractor={(item, index) => item[optionKey] || `opt_${index}`}
              renderItem={({ item, index }) => (
                <List.Item
                  key={item[optionKey] || `opt_${index}`}
                  // borderBottomColor="muted.300"
                  // borderBottomWidth="1"
                  style={{
                    width: screenWidth - 16,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.coolGray[100],
                    backgroundColor: checkIfSelected(item) ? colors.primaryBg : null
                  }}
                  rippleColor={colors.primaryBg}
                  titleStyle={{ fontFamily: fontFamily[500] }}
                  // _pressed={{ bg: 'primary.100' }}
                  onPress={() => onSelectOption(item)}
                  title={getOptionLabel(item)}
                />
              )}
            />
          </View>
        </KeyboardAwareScrollView>
      </ActionSheet>
    </>
  );
};

export default memo(SearchSelectInput);

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 8,
    marginTop: 6,
    borderBottomColor: colors.trueGray[300],
    borderBottomWidth: 1,
    width: '100%'
  },
  boxes: {
    paddingHorizontal: 8,
    marginTop: 0,
    borderBottomColor: colors.trueGray[300],
    borderBottomWidth: 1,
    width: '100%'
  },
  innerBox: {
    width: '100%'
  },
  inBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8
  },
  button: {
    fontFamily: fontFamily[500]
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  innerboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  scroll: { width: screenWidth - 40, alignItems: 'flex-start' },
  textInput: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    width: '100%'
  },
  chip: { borderRadius: 2, marginRight: 6, backgroundColor: colors.green[100] }
});
