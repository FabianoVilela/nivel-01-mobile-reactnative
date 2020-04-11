import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Header from "./Components/Header";

import api from "./services/api";

export default function App() {
  const [projects, setProject] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProject(response.data);
    });
  }, []);

  async function handleAddProject() {
    if (title === "" || owner === "") {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const data = {
      title: title,
      owner: owner,
    };

    const response = await api.post("/projects", data);

    setProject([...projects, response.data]);
    setTitle("");
    setOwner("");
  }

  async function handleDeleteProject(id) {
    try {
      await api.delete(`/projects/${id}`);

      setProject(projects.filter((project) => project.id !== id));
    } catch (err) {
      alert("Erro ao deletar o projeto");
    }
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#e9e9f0' />
      <SafeAreaView style={styles.container}>
        <Header title='Projetos' />
        <View style={styles.header}>
          <TextInput
            style={styles.inputText}
            value={title}
            onChangeText={(title) => setTitle(title)}
            placeholder='Projeto'
          />
          <TextInput
            style={styles.inputText}
            defaultValue={owner}
            onChangeText={(owner) => setOwner(owner)}
            placeholder='Proprietário'
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => handleAddProject()}
          >
            <Text style={styles.buttonText}>Adicionar projeto</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.projectList}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <View style={styles.projectContainer}>
              <View style={styles.project}>
                <Text style={styles.projectText}>PROJETO: {project.title}</Text>
                <Text style={styles.projectText}>
                  PROPRIETÁRIO: {project.owner}
                </Text>
              </View>

              <TouchableOpacity onPress={() => handleDeleteProject(project.id)}>
                <Icon name='trash-2' style={styles.projectDeleteButton} />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e9f0",
    paddingHorizontal: 24,
    flex: 1,
  },
  projectText: {
    color: "#36bea1",
    fontSize: 14,
  },
  projectList: {
    marginTop: 32,
  },
  projectContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  project: {
    padding: 24,
  },
  projectDeleteButton: {
    color: "#e02041",
    fontSize: 20,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#49d8b9",
    borderRadius: 4,
    height: 50,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  inputText: {
    width: "auto",
    color: "#333",
    borderColor: "red",
    borderRadius: 8,
    padding: 16,
    marginBottom: 6,
    backgroundColor: "#FFF",
  },
});
