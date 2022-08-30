import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AccountsSNSScreen,
  PickPreferScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OTPScreen,
  PersonalIntroductionScreen,
  RegisterForgotScreen,
  RegisterScreen,
  SuccessfullyScreen,
} from "../../screens";
const LoginStack = createNativeStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <LoginStack.Screen name="OTPScreen" component={OTPScreen} />
      <LoginStack.Screen
        name="AccountsSNSScreen"
        component={AccountsSNSScreen}
      />
      <LoginStack.Screen
        name="CommunitiesScreen"
        component={PickPreferScreen}
      />
      <LoginStack.Screen
        name="PersonalIntroductionScreen"
        component={PersonalIntroductionScreen}
      />
      <LoginStack.Screen
        name="RegisterForgotScreen"
        component={RegisterForgotScreen}
      />
      <LoginStack.Screen
        name="SuccessfullyScreen"
        component={SuccessfullyScreen}
      />
    </LoginStack.Navigator>
  );
}

export default LoginStackScreen;
