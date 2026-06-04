import { AppGradient } from "@/components/AppGradient";
import { LabelRow } from "@/components/LabelRow";
import { StatItem } from "@/components/StatItem";
import { ThemedText } from "@/components/ThemedText";
import {
  DEFAULT_LOAN_AMOUNT,
  DEFAULT_LOAN_TERM,
  LOAN_MAX,
  LOAN_MIN,
  SLIDER_THUMB_COLOR,
  SLIDER_THUMB_SIZE,
  SLIDER_TRACK_COLOR,
  STORAGE_KEY_AMOUNT,
  STORAGE_KEY_TERM,
  TERM_MAX, TERM_MIN
} from "@/constants/calculator";
import { Colors } from "@/constants/theme";
import {
  calcMonthlyRepayment,
  getInterestRate,
  poundsFormatter,
  poundsFormatterWhole,
} from "@/utils/calculator";
import Slider from "@react-native-community/slider";
import * as SecureStore from "expo-secure-store";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [loanAmount, setLoanAmount] = useState(() => {
    const stored = SecureStore.getItem(STORAGE_KEY_AMOUNT);
    return stored ? Number(stored) : DEFAULT_LOAN_AMOUNT;
  });
  const [loanTerm, setLoanTerm] = useState(() => {
    const stored = SecureStore.getItem(STORAGE_KEY_TERM);
    return stored ? Number(stored) : DEFAULT_LOAN_TERM;
  });

  const loanTermYears = Math.floor(loanTerm / 2);
  const loanTermFraction = loanTerm % 2 ? "½" : "";
  const termPlural = loanTermYears === 1 && !loanTermFraction ? "year" : "years";
  const termLabel = `${loanTermYears}${loanTermFraction} ${termPlural}`;

  const interestRate = getInterestRate(loanAmount);
  const months = loanTerm * 6;

  const monthlyRepayment = useMemo(
    () => calcMonthlyRepayment(loanAmount, months, interestRate),
    [loanAmount, months, interestRate]
  );

  const onLoanAmountChange = useCallback((value: number) => {
    setLoanAmount(value);
  }, []);

  const onLoanAmountComplete = useCallback((value: number) => {
    SecureStore.setItemAsync(STORAGE_KEY_AMOUNT, String(value));
  }, []);

  const onLoanTermChange = useCallback((value: number) => {
    setLoanTerm(value);
  }, []);

  const onLoanTermComplete = useCallback((value: number) => {
    SecureStore.setItemAsync(STORAGE_KEY_TERM, String(value));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppGradient style={styles.gradient}>
          <View style={styles.card}>
            <LabelRow
              label="I want to borrow"
              value={poundsFormatter.format(loanAmount)}
            />
            <Slider
              testID="loan-amount-slider"
              value={loanAmount}
              onValueChange={onLoanAmountChange}
              onSlidingComplete={onLoanAmountComplete}
              style={styles.slider}
              step={1}
              minimumValue={LOAN_MIN}
              maximumValue={LOAN_MAX}
              minimumTrackTintColor={SLIDER_TRACK_COLOR}
              maximumTrackTintColor={SLIDER_TRACK_COLOR}
              thumbTintColor={SLIDER_THUMB_COLOR}
              thumbSize={SLIDER_THUMB_SIZE}
            />
            <LabelRow label="over" value={termLabel} />
            <Slider
              testID="loan-term-slider"
              value={loanTerm}
              onValueChange={onLoanTermChange}
              onSlidingComplete={onLoanTermComplete}
              style={styles.slider}
              step={1}
              minimumValue={TERM_MIN}
              maximumValue={TERM_MAX}
              minimumTrackTintColor={SLIDER_TRACK_COLOR}
              maximumTrackTintColor={SLIDER_TRACK_COLOR}
              thumbTintColor={SLIDER_THUMB_COLOR}
              thumbSize={SLIDER_THUMB_SIZE}
            />
            <View style={styles.statsRow}>
              <StatItem value={`${interestRate}%`} label="Interest rate" />
              <StatItem
                value={poundsFormatterWhole.format(monthlyRepayment)}
                label="Monthly repayment"
              />
            </View>
          </View>
        </AppGradient>

        <View style={styles.ctaContainer}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <ThemedText type="button">Get your quote »</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.light.background,
    marginHorizontal: 28,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 16,
    gap: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 14,
  },
  ctaContainer: {
    padding: 40,
  },
  ctaButton: {
    backgroundColor: Colors.light.gradientTwo,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
