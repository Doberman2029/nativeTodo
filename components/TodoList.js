import React from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { List, IconButton } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

import { patchTodoCheckFetch } from "../api/patchTodo";
import { deleteTodoFetch } from "../api/deleteTodo";

import {
  changeChek,
  deleteTodo,
  setCurrentTodo,
} from "../redux/actions/action";

function TodoList({ openModal }) {
  const todoList = useSelector((store) => store.list);
  const dispatch = useDispatch();

  const changeCheckTodo = (listId, todoId, setCheck) => {
    patchTodoCheckFetch(listId, todoId, setCheck);
    dispatch(changeChek(listId, todoId));
  };

  const deleteTodoItem = (listId, todoId) => {
    deleteTodoFetch(listId, todoId);
    dispatch(deleteTodo(listId, todoId));
  };

  const updateTodo = (categoryId, itemId, itemText, itemCategory) => {
    dispatch(setCurrentTodo({ itemText, itemCategory, itemId, categoryId }));
    openModal();
  };

  const renderLeftActions = (
    progress,
    dragX,
    listId,
    todoId,
    todoText,
    todoCategory
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 50, 1],
    });
    return (
      <RectButton style={styles.action}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <IconButton
            icon="pencil-outline"
            style={styles.leftAction}
            onPress={() => updateTodo(listId, todoId, todoText, todoCategory)}
          />
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX, listId, todoId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.action}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <IconButton
            icon="trash-can-outline"
            color="red"
            onPress={() => deleteTodoItem(listId, todoId)}
          />
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      {todoList.todos.map((el) => (
        <List.Section key={el.title}>
          {el.todos.length > 0 ? (
            <>
              <List.Subheader>{el.title}</List.Subheader>
              {el.todos.map(
                (todo) =>
                  !todo.checked && (
                    <Swipeable
                      renderLeftActions={(a, b) =>
                        renderLeftActions(
                          a,
                          b,
                          el.id,
                          todo.id,
                          todo.text,
                          el.title
                        )
                      }
                      renderRightActions={(a, b) =>
                        renderRightActions(a, b, el.id, todo.id)
                      }
                      key={todo.id}
                    >
                      <List.Item
                        title={todo.text}
                        style={styles.listItem}
                        onPress={() => changeCheckTodo(el.id, todo.id, true)}
                        left={() => (
                          <List.Icon icon="checkbox-blank-circle-outline" />
                        )}
                      />
                    </Swipeable>
                  )
              )}
              {el.todos.some((elem) => elem.checked === true) && (
                <List.Accordion
                  key={el.id}
                  id={el.title}
                  title="Завершенные"
                  style={styles.accordion}
                  titleStyle={styles.accordionTitle}
                  left={() => <List.Icon icon="chevron-down" />}
                >
                  {el.todos.map(
                    (todo) =>
                      todo.checked && (
                        <Swipeable
                          renderLeftActions={(a, b) =>
                            renderLeftActions(
                              a,
                              b,
                              el.id,
                              todo.id,
                              todo.text,
                              el.title
                            )
                          }
                          renderRightActions={(a, b) =>
                            renderRightActions(a, b, el.id, todo.id)
                          }
                          key={todo.id}
                        >
                          <List.Item
                            title={todo.text}
                            titleStyle={styles.todoDone}
                            style={styles.listItem}
                            onPress={() =>
                              changeCheckTodo(el.id, todo.id, false)
                            }
                            left={() => (
                              <List.Icon icon="check" color="#1f75fe" />
                            )}
                          />
                        </Swipeable>
                      )
                  )}
                </List.Accordion>
              )}
            </>
          ) : null}
        </List.Section>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 70,
  },
  accordion: { width: "115%" },
  accordionTitle: {
    color: "black",
  },
  todoDone: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  listItem: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0, 0.1)",
  },
});

export default connect()(TodoList);
