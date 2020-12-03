import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from "react-native";
import { IconButton } from "react-native-paper";
import { connect, useDispatch } from "react-redux";

import { deleteList } from "../redux/actions/action";
import { deleteListFetch } from "../api/deleteList";

function CategoryPage({
  visible,
  closeModal,
  textHandler,
  categoryCreateHandler,
  createError,
  todoList,
  categoryInput,
}) {
  const deleteCategory = (id) => {
    dispatch(deleteList(id));
    deleteListFetch(id);
  };

  const dispatch = useDispatch();

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.category}>
        <TouchableHighlight
          underlayColor="rgba(255,255,255)"
          onPress={() => {
            closeModal();
          }}
        >
          <View style={styles.categoryBG}>
            {createError && (
              <View style={styles.errorMessage}>
                <Text style={styles.errorMessageText}>
                  Такое название уже существует, попробуйте другое
                </Text>
              </View>
            )}
          </View>
        </TouchableHighlight>
        <ScrollView style={styles.categoryCreater}>
          {todoList.todos.map((el, index) => {
            return (
              <View style={styles.categoryItem} key={el.title}>
                <Text style={styles.categoryItemText}>{el.title}</Text>
                <IconButton
                  icon="trash-can-outline"
                  style={styles.categoryItemDelete}
                  color="red"
                  onPress={() => deleteCategory(el.id)}
                />
              </View>
            );
          })}
          <View>
            <TextInput
              mode="flat"
              placeholder="Новая категория"
              maxLength={16}
              style={styles.categoryInput}
              value={categoryInput}
              onChangeText={(text) => textHandler(text)}
              onSubmitEditing={categoryCreateHandler}
            />
            <IconButton
              icon="plus"
              color="grey"
              style={styles.plusIcon}
              onPress={categoryCreateHandler}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    right: 10,
  },
  category: {
    position: "relative",
    display: "flex",
    height: "100%",
    marginBottom: 40,
  },
  categoryInput: {
    margin: 10,
    fontSize: 18,
    paddingRight: 30,
  },
  categoryItemDelete: {
    position: "absolute",
    right: 0,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    height: 40,
    paddingRight: 30,
  },
  categoryItemText: {
    fontSize: 18,
  },
  categoryCreater: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 250,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  errorMessage: {
    backgroundColor: "#ff4444",
    margin: "15%",
    textAlign: "center",
    borderRadius: 10,
  },
  errorMessageText: {
    textAlign: "center",
    margin: 15,
    fontSize: 18,
    color: "white",
  },
  categoryBG: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    height: "100%",
  },
});

export default connect()(CategoryPage);
