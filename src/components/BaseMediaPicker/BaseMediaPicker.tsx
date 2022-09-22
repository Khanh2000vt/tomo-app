import React, { useEffect } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { theme } from "../../constants";
import { BaseMediaPickerProps } from "./BaseMediaPickerModel";
function BaseMediaPicker({
  isVisible,
  option = "All",
  onPickComplete,
  setIsVisible,
  allowsEditing = false,
}: BaseMediaPickerProps) {
  const [permissionCamera, requestPermissionCamera] =
    ImagePicker.useCameraPermissions();
  const [permissionLibrary, requestPermissionLibrary] =
    ImagePicker.useMediaLibraryPermissions();

  const handleCamera = async () => {
    await requestPermissionCamera().then((permission) => {
      if (!permission?.granted) {
        handleAlert("Warning", "You did not allow the camera!");
      } else {
        takeCamera();
      }
    });
  };

  const handleLibrary = async () => {
    await requestPermissionLibrary().then((permission) => {
      if (!permission?.granted) {
        handleAlert("Warning", "You did not allow the library!");
      } else {
        takeLibrary();
      }
    });
  };

  const takeCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[option],
      allowsEditing: allowsEditing,
      aspect: [1, 1],
      presentationStyle:
        ImagePicker.UIImagePickerPresentationStyle.OVER_CURRENT_CONTEXT,
      quality: 1,
    });
    handlePickMedia(result);
  };

  const takeLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[option],
      allowsEditing: allowsEditing,
      aspect: [1, 1],
      // allowsMultipleSelection: true,
      quality: 1,
    });
    handlePickMedia(result);
  };

  const handlePickMedia = (result: ImagePicker.ImagePickerResult) => {
    if (!result.cancelled) {
      onPickComplete(result);
      setIsVisible(false);
    }
  };

  const handleAlert = (title: string, message: string) => {
    console.log("Alert");
    Alert.alert(title, message, [
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      useNativeDriverForBackdrop
      backdropOpacity={0.5}
      swipeDirection={"down"}
      propagateSwipe
      swipeThreshold={100}
      style={{ margin: 0, flex: 1, justifyContent: "flex-end" }}
      onSwipeComplete={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
    >
      <View style={styles.containerModal}>
        <View style={styles.lineModal} />
        <View style={styles.bodyModal}>
          <View style={styles.headerModal}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCamera}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLibrary}>
            <Text style={styles.text}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerModal: {
    height: "40%",
    // height: 500,
  },
  lineModal: {
    height: 0,
    borderColor: theme.colors.Neutral0,
    width: 129,
    borderTopWidth: 5,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 7,
  },
  bodyModal: {
    backgroundColor: theme.colors.Neutral0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
  },
  headerModal: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.Neutral2,
    paddingHorizontal: 24,
    alignItems: "flex-end",
  },
  text: {
    fontSize: theme.fontSize.font18,
    lineHeight: 24.52,
    fontWeight: "500",
    color: theme.colors.Neutral8,
  },
  touchableOpacity: {
    padding: 5,
  },
  textCancel: {
    fontSize: theme.fontSize.font14,
    lineHeight: 24.52,
    fontWeight: "400",
    color: theme.colors.darkerPrimary,
  },
  button: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.Neutral2,
    paddingHorizontal: 24,
  },
});

export default BaseMediaPicker;
