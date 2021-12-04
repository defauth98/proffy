import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

interface InputProps {
  label: string;
  content: any;
  textarea?: boolean;
  numberOfLines?: number;
  onChangeValue(newValue: string, input: string): void;
}

const Input: React.FC<InputProps> = ({
  label,
  content,
  textarea,
  numberOfLines,
  onChangeValue,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={content}
          multiline={textarea}
          numberOfLines={numberOfLines}
          onChangeText={(value) => onChangeValue(value, label)}
        />
      </View>
    </View>
  );
};

export default Input;
