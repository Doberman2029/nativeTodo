import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { IconButton, Modal, RadioButton } from "react-native-paper";
import { connect, useDispatch, useSelector } from "react-redux";

import { createTodo } from "../api/createTodo";
import { deleteTodoFetch } from "../api/deleteTodo";
import { clearCurrentTodo } from "../redux/actions/action";

function CreateTodoPage({ visible, close }) {
  const [textInput, setTextInput] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (currentTodo.item.itemText) {
      setTextInput(currentTodo.item.itemText);
      setValue(currentTodo.item.categoryId);
    }
  }, [close]);

  const currentTodo = useSelector((store) => store.currentTodo);

  const dispatch = useDispatch();

  const categoryList = useSelector((store) => store.list);

  const clearInputs = () => {
    setTextInput("");
    setValue("");
  };

  const closeTodoPageHandler = () => {
    dispatch(clearCurrentTodo());
    clearInputs();
    close();
  };

  const createTodoHandler = () => {
    if (textInput && value) {
      dispatch(clearCurrentTodo());
      createTodo(textInput, value);

      clearInputs();
      if (currentTodo.item.itemText) {
        deleteTodoFetch(currentTodo.item.categoryId, currentTodo.item.itemId);
      }
    }
  };

  return (
    <Modal visible={visible}>
      <View style={styles.modal}>
        <IconButton
          icon="check"
          color="#1f75fe"
          style={styles.plusIcon}
          onPress={() => createTodoHandler()}
        />
        <IconButton
          icon="arrow-left"
          color="grey"
          onPress={() => closeTodoPageHandler()}
        />

        <TextInput
          mode="flat"
          placeholder="Название задачи"
          style={styles.categoryInput}
          value={textInput}
          maxLength={16}
          onChangeText={(text) => setTextInput(text)}
        />
        <Text style={styles.categoryTitle}>Категория</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          {categoryList.todos.map((el) => (
            <View style={styles.category} key={el.title}>
              <RadioButton.Item
                label={el.title}
                value={el.id}
                color="#1f75fe"
              />
            </View>
          ))}
        </RadioButton.Group>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    position: "absolute",
    right: 10,
    top: 40,
  },
  modal: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 40,
  },
  categoryInput: {
    margin: 15,
    fontSize: 27,
    paddingRight: 30,
  },
  category: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  categoryTitle: {
    color: "grey",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default connect()(CreateTodoPage);
