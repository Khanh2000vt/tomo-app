import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import BaseInput from "../../components/BaseInput/BaseInput";
import BaseScrollView from "../../components/BaseScrollView/BaseScrollView";
import ArrowRight from "../../../assets/svg/ArrowRight.svg";
import EyeSlash from "../../../assets/svg/EyeSlash.svg";
import Rectangle74 from "../../../assets/svg/Rectangle74.svg";
import BaseButton from "../../components/BaseButton/BaseButton";
import { theme } from "../../constants/index";
import { createYear } from "./RegisterHandle";
import VectorBack from "../../../assets/svg/VectorBack.svg";
import BaseDropDown from "../../components/BaseDropDown/BaseDropDown";
const colors = theme.colors;
const fontSize = theme.fontSize;
function RegisterScreen({ navigation }: { navigation: any }) {
  const [isHide, setIsHide] = useState<boolean>(true);

  const year = new Date().getFullYear();
  const getYear = useMemo(() => createYear(year), [year]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      gender: "",
      birthYear: "",
      introductionCode: "",
    },
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
    onSubmit: (values) => {
      console.log("OTPScreen");
      navigation.navigate("OTPScreen");
    },
  });

  return (
    <BaseScrollView
      style={styles.container}
      title="Register"
      header={true}
      IconLeft={<VectorBack />}
      onPressLeft={() => navigation.goBack()}
      styleHeader={styles.styleHeader}
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
        value={formik.values.password}
        styleContainer={styles.inputContainer}
        onChangeText={formik.handleChange("password")}
        placeholder="Your password"
        placeholderTextColor={colors.Neutral3}
        IconView={<EyeSlash height={24} width={24} />}
        secureTextEntry={isHide}
        onPressIcon={() => {
          setIsHide(!isHide);
        }}
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
        <BaseDropDown
          data={data}
          onChangeValue={formik.handleChange("gender")}
          title="Gender"
          styleView={{ marginRight: 8 }}
          placeholder="-Gender -"
          placeholderStyle={styles.textPlaceholderDropDown}
          error={formik.touched.gender}
          messageError={formik.errors.gender}
        />
        <BaseDropDown
          data={getYear}
          onChangeValue={formik.handleChange("birthYear")}
          title="Birth Year"
          styleView={{ marginLeft: 8 }}
          placeholder="- Birth Year -"
          placeholderStyle={styles.textPlaceholderDropDown}
          error={formik.touched.birthYear}
          messageError={formik.errors.birthYear}
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
        <TouchableOpacity>
          <Rectangle74 width={32} height={32} />
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
        IconView={<ArrowRight height={20} width={20} />}
        style={styles.baseButton}
        onPress={formik.handleSubmit}
      />
    </BaseScrollView>
  );
}

const data = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

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
    // marginVertical: 16,
    marginBottom: 16,
  },
  viewTerms: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPicker: {
    flex: 1,
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
