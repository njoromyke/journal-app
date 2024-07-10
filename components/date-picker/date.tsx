import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  label: string;
};

export default function DatePicker({ selectedDate, setSelectedDate, label }: Props) {
  const [inputDate, setInputDate] = React.useState(selectedDate || undefined);
  

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <DatePickerInput
        mode="outlined"
          locale="en"
          label={label}
          value={inputDate}
          onChange={(d) => {
            setInputDate(d as Date);
            setSelectedDate(d as Date);
          }}
          inputMode="start"
        />
      </View>
    </SafeAreaProvider>
  );
}
