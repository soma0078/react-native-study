import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";

interface DatePickerFieldProps {
  value: string;
  onChange: (date: string) => void;
}

function toLocalISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDisplay(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const [show, setShow] = useState(false);
  const date = new Date(value);

  const handleOpen = () => {
    Haptics.selectionAsync();
    setShow(true);
  };

  const handleDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShow(false);
  };

  return (
    <>
      <Pressable style={styles.chip} onPress={handleOpen}>
        <Text style={styles.chipText}>{formatDisplay(value)}</Text>
      </Pressable>

      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onValueChange={(_, selected) => {
            setShow(false);
            onChange(toLocalISODate(selected));
          }}
          onDismiss={() => setShow(false)}
          maximumDate={new Date()}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.overlay}>
            <Pressable style={styles.backdrop} onPress={handleDone} />
            <View style={styles.sheet}>
              <View style={styles.sheetHandle} />
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>날짜 선택</Text>
                <Pressable onPress={handleDone} style={styles.doneButton}>
                  <Text style={styles.doneText}>완료</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onValueChange={(_, selected) =>
                  onChange(toLocalISODate(selected))
                }
                maximumDate={new Date()}
                locale="ko"
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: SPACING.xs,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingBottom: SPACING.xl,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
    alignSelf: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  doneButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  doneText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },
  picker: {
    marginHorizontal: SPACING.md,
  },
});
