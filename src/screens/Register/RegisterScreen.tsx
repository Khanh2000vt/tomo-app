import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import {
  ArrowRight,
  BaseAreaView,
  BaseButton,
  BaseInput,
  BaseModal,
  Tick,
  VectorBack,
} from "@components";
import { gender, SCREEN } from "@constant/index";
import { ListYear } from "@utils";
import { theme } from "@theme";
import { useNavigation } from "@react-navigation/native";
import { LoginTabProps } from "@navigation";
type INav = LoginTabProps<SCREEN.REGISTER>["navigation"];
const colors = theme.colors;
const fontSize = theme.fontSize;
const initialValues = {
  email: "",
  password: "",
  username: "",
  gender: "",
  birthYear: "",
  introductionCode: "",
};

function RegisterScreen() {
  const navigation = useNavigation<INav>();
  const [agree, setAgree] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .required("No password provided.")
    //     .min(8, "Password is too short - should be 8 chars minimum.")
    //     .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    //   username: Yup.string()
    //     .required("No username provided.")
    //     .min(6, "Username is too short - should be 6 chars minimum.")
    //     .matches(/[a-zA-Z]/, "Username can only contain Latin letters."),
    //   gender: Yup.string().required("No gender provided."),
    //   birthYear: Yup.string().required("No birth year provided."),
    // }),
    onSubmit: (_values) => {
      console.log("OTPScreen");
      navigation.navigate(SCREEN.OTP, {
        type: 1,
      });
    },
  });

  return (
    <BaseAreaView
      style={styles.container}
      title="Register"
      header={true}
      IconLeft={<VectorBack />}
      onPressLeft={() => navigation.goBack()}
      styleHeader={styles.styleHeader}
      scroll
    >
      <BaseInput
        title="Email"
        value={formik.values.email}
        styleContainer={styles.inputContainer}
        onChangeText={formik.handleChange("email")}
        placeholder="Your email"
        placeholderTextColor={colors.Neutral3}
        autoComplete="email"
        keyboardType="email-address"
        error={formik.touched.email}
        messageError={formik.errors.email}
      />
      <BaseInput
        title="Password"
        option="password"
        value={formik.values.password}
        styleContainer={styles.inputContainer}
        onChangeText={formik.handleChange("password")}
        placeholder="Your password"
        placeholderTextColor={colors.Neutral3}
        error={formik.touched.password}
        messageError={formik.errors.password}
      />
      <BaseInput
        title="Username"
        value={formik.values.username}
        styleContainer={styles.inputContainer}
        onChangeText={formik.handleChange("username")}
        placeholder="Your username"
        placeholderTextColor={colors.Neutral3}
        error={formik.touched.username}
        messageError={formik.errors.username}
      />

      <View style={styles.viewPicker}>
        <BaseModal
          data={gender}
          title="Gender"
          placeholder="-Gender -"
          onChangeValue={formik.handleChange("gender")}
          styleContainer={{ marginRight: 8 }}
          error={formik.touched.gender}
          messageError={formik.errors.gender}
          value={formik.values.gender}
        />
        <BaseModal
          data={ListYear()}
          title="Birth Year"
          placeholder="- Birth Year -"
          onChangeValue={formik.handleChange("birthYear")}
          styleContainer={{ marginLeft: 8 }}
          error={formik.touched.birthYear}
          messageError={formik.errors.birthYear}
          value={formik.values.birthYear}
        />
      </View>
      <BaseInput
        title="Introduction Code"
        value={formik.values.introductionCode}
        styleContainer={styles.inputContainer}
        onChangeText={formik.handleChange("introductionCode")}
        placeholderTextColor={colors.Neutral3}
      />
      <View style={styles.viewTerms}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.buttonAgree,
            {
              backgroundColor: agree ? colors.primary : colors.Neutral0,
            },
          ]}
          onPress={() => setAgree(!agree)}
        >
          {agree && <Tick />}
        </TouchableOpacity>
        <Text style={styles.textDefault}>I agree to the</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.textDefault, styles.textTerms]}>
            {" Terms of Use"}
          </Text>
        </TouchableOpacity>
      </View>
      <BaseButton
        title={"Submit"}
        IconRight={<ArrowRight height={20} width={20} />}
        style={styles.baseButton}
        onPress={formik.handleSubmit}
      />
    </BaseAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 43,
  },
  styleHeader: {
    height: 50,
    paddingHorizontal: 33,
  },
  inputContainer: {
    marginBottom: 16,
  },
  baseButton: {
    marginTop: 33,
    marginBottom: 24,
  },
  viewPicker: {
    flexDirection: "row",
    marginBottom: 16,
    zIndex: 100,
  },
  viewTerms: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPicker: {
    flex: 1,
  },
  buttonAgree: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textDefault: {
    fontSize: fontSize.font18,
    marginLeft: 12,
    fontWeight: "400",
    color: colors.Neutral10,
  },
  textTerms: {
    marginLeft: 0,
    fontWeight: "600",
    color: colors.primary,
  },
  textPlaceholderDropDown: {
    fontWeight: "400",
    color: "red",
    textAlign: "center",
  },
});
export default RegisterScreen;
