import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  Provider as PaperProvider,
  FAB,
  Title,
  IconButton,
} from "react-native-paper";

import { postList } from "../api/postList";
import { createList, listFetchData } from "../redux/actions/action";

import TodoList from "./TodoList";
import CreateTodoPage from "./CreateTodoPage";
import CategoryPage from "./CategoryPage";

function HomeScreen() {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  const [reload, setReload] = useState(false);

  const [createError, setCreateError] = useState("false");

  const todoList = useSelector((store) => store.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listFetchData());
  }, [reload]);

  useEffect(() => {
    if (createError) {
      setTimeout(() => {
        setCreateError(false);
      }, 3000);
    }
  }, [createError]);

  const reloadHandler = () => {
    setReload((prev) => !prev);
  };

  const createTodoModalClickHandler = () => {
    reloadHandler();
    setCreateModalVisible((prev) => !prev);
  };

  const categoryCreateHandler = () => {
    if (categoryInput === "") {
      return null;
    }
    if (todoList.todos.some((el) => el.title === categoryInput)) {
      setCreateError(true);

      return null;
    }

    postList(categoryInput);
    dispatch(createList(categoryInput));
    setCategoryInput("");
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Title style={styles.title}>Задачи</Title>

        <TodoList openModal={() => createTodoModalClickHandler()} />

        <TouchableHighlight
          underlayColor="rgba(255,255,255)"
          style={styles.categoryOpenButton}
          onPress={() => {
            setCategoryModalVisible(true);
          }}
        >
          <IconButton icon="shape-outline" style={styles.cubesIcon} />
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="rgba(255,255,255)"
          style={styles.fabButtonContainer}
          onPress={() => {
            createTodoModalClickHandler();
          }}
        >
          <FAB style={styles.fab} icon="plus" />
        </TouchableHighlight>

        <StatusBar style="auto" />
      </View>

      <CreateTodoPage
        visible={createModalVisible}
        close={() => createTodoModalClickHandler()}
      />

      <CategoryPage
        visible={categoryModalVisible}
        closeModal={() => setCategoryModalVisible(false)}
        textHandler={(e) => setCategoryInput(e)}
        categoryCreateHandler={() => categoryCreateHandler()}
        createError={createError}
        todoList={todoList}
        categoryInput={categoryInput}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fabButtonContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    height: 65,
    width: 65,
  },
  container: {
    flex: 1,
    marginTop: 30,
    display: "flex",
  },
  title: {
    fontSize: 28,
    marginTop: 10,
    marginLeft: "15%",
  },
  cubesIcon: {
    position: "absolute",
    right: 0,
  },
  fab: {
    position: "absolute",
    margin: 10,
    backgroundColor: "#1f75fe",
    zIndex: 1000,
  },
  category: {
    position: "relative",
    display: "flex",
    height: "100%",
    marginBottom: 40,
  },
  categoryOpenButton: {
    position: "absolute",
    right: 0,
    padding: 10,
    height: 50,
    width: 50,
  },
});

export default connect()(HomeScreen);
