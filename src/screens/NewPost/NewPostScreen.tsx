import React, { useCallback, useState } from "react";

import { BaseHeader, BaseMediaPicker, ImageSVG, VectorBack } from "@components";
import { SCREEN } from "@constant/index";
import { IImage } from "@model";
import { ForumTabProps } from "@navigation";
import { useNavigation } from "@react-navigation/native";
import {
  createPost,
  getUserRedux,
  pushPostInForum,
  resetPost,
  RootState,
} from "@redux";
import { theme } from "@theme";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GoBackAlert, ItemImage } from "./components";
import { getNewArrayImage, getNewPost, isPostEmpty } from "./controller";
type INav = ForumTabProps<SCREEN.NEW_POST>["navigation"];
function NewPostScreen() {
  const navigation = useNavigation<INav>();
  const dispatch = useDispatch();

  const userRedux = useSelector(getUserRedux);
  const postNote = useSelector((state: RootState) => state.post);

  const [textTitle, onChangeTextTitle] = useState<string>(postNote.title);
  const [textBody, onChangeTextBody] = useState<string>(postNote.body);
  const [images, setImages] = useState<IImage[]>(postNote.images);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  async function handlePressPost() {
    const newPost = getNewPost(textTitle, textBody, images, userRedux);
    console.log("co new post: ", newPost);
    if (newPost !== undefined) {
      let param = {
        post: newPost,
      };
      // onPressPost(newPost);
      dispatch(pushPostInForum(param));
      dispatch(resetPost());
      navigation.goBack();
    }
  }

  const handlePickComplete = (result: IImage) => {
    setImages([result].concat(images));
  };

  const handleAgreeSavePost = () => {
    const params = {
      title: textTitle,
      body: textBody,
      images: images,
    };
    dispatch(createPost(params));
    navigation.goBack();
  };
  const handleGoBack = () => {
    if (!isPostEmpty(textTitle, textBody, images)) {
      GoBackAlert(handleAgreeSavePost, handleCancelSavePost);
    } else {
      handleCancelSavePost();
    }
  };

  const handleCancelSavePost = () => {
    dispatch(resetPost());
    navigation.goBack();
  };

  const handleDeleteImage = (item: IImage) => {
    const newArrayImage = getNewArrayImage(images, item);
    setImages([...newArrayImage]);
  };

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <View style={styles.container}>
      <BaseHeader
        title="New post"
        IconLeft={<VectorBack />}
        onPressLeft={handleGoBack}
        IconRight={
          <View style={styles.iconRight}>
            <Text style={styles.textIconRight}>Post</Text>
          </View>
        }
        onPressRight={handlePressPost}
        styleHeader={styles.styleHeader}
      />
      <View style={styles.body}>
        <Image source={{ uri: userRedux.avatar }} style={styles.image} />
        <View style={styles.bodyPost}>
          <Text style={styles.textName}>{userRedux.name}</Text>
          <TextInput
            placeholder="Title"
            style={[styles.text, styles.textTitle]}
            multiline
            onChangeText={onChangeTextTitle}
            value={textTitle}
          />
          <TextInput
            placeholder="What do you want to share?"
            style={[styles.text, styles.textBody]}
            multiline
            onChangeText={onChangeTextBody}
            value={textBody}
          />
          {!!images && (
            <FlatList
              data={images}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => (
                <ItemImage item={item} onPress={handleDeleteImage} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
          <TouchableOpacity
            style={styles.touchableOpacity}
            activeOpacity={0.8}
            onPress={() => setIsVisible(true)}
          >
            <ImageSVG />
          </TouchableOpacity>
        </View>
      </View>
      <BaseMediaPicker
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onPickComplete={handlePickComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.Neutral0,
    flex: 1,
  },
  body: {
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  styleHeader: {
    paddingLeft: 33,
    paddingRight: 24,
    marginTop: 65,
    marginBottom: 16,
  },
  iconRight: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 13,
    paddingLeft: 17,
    paddingRight: 18,
    borderRadius: 8,
  },
  textIconRight: {
    color: theme.colors.Neutral0,
    fontWeight: "600",
    fontSize: theme.fontSize.font16,
    lineHeight: 22,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  textName: {
    fontWeight: "600",
    fontSize: theme.fontSize.font16,
    lineHeight: 21.79,
    color: theme.colors.Neutral10,
  },
  text: {
    fontWeight: "400",
    fontSize: theme.fontSize.font18,
    color: theme.colors.Neutral10,
    lineHeight: 24.52,
    width: "100%",
  },
  textTitle: {
    marginTop: 21,
    marginBottom: 16,
    height: 48,
  },
  textBody: {
    color: theme.colors.Neutral8,
    marginBottom: 20,
    height: 150,
  },
  bodyPost: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 16,
  },
  touchableOpacity: {
    backgroundColor: theme.colors.Neutral1,
    // flex: 1,
    padding: 12.5,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default NewPostScreen;
