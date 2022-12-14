import { ColorValue, StyleProp, TextInput, ViewStyle } from "react-native";
interface PropsOTPBase {
  type?: "otp" | "password";
  backgroundColor?: ColorValue | undefined;
  styleInputOTP?: StyleProp<ViewStyle> | undefined;
  styleInputHighlight?: StyleProp<ViewStyle> | undefined;
}

interface PropsOTP extends PropsOTPBase {
  pinCount?: number;
  onCodeFilled?: (code: string) => void | undefined;
  clearInputs?: boolean;
  styleViewOTP?: StyleProp<ViewStyle> | undefined;
  styleContainerOTP?: StyleProp<ViewStyle> | undefined;
  onChangeCode?: (code: string) => void | undefined;
}

interface PropsInputOTP extends PropsOTPBase {
  codeChar: string;
  index: number;
  onTextChange: (text: string, index: number) => void;
  onLayout: (ref: React.RefObject<TextInput>, index: number) => void;
  onKeyPress: (s: string, c: string, index: number) => void;
  focused: boolean;
}

export type { PropsOTP, PropsInputOTP };
