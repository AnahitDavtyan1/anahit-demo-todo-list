import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../../components/task/Task";
import ConfirmDialog from "../../components/ConfirmDialog";
import DeleteSelected from "../../components/deleteSelected/DeleteSelected";
import TaskModal from "../../components/taskModal/TaskModal";
import Filters from "../../components/filters/Filters";
import TaskApi from "../../api/taskApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/reducers/loaderSlice";
import styles from "./todo.module.css";
import { setTasksCount } from "../../redux/reducers/counterSlice";

const taskApi = new TaskApi();

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const dispatch = useDispatch();

  const { editLoading, deleteLoading, addTaskLoading, contactFormLoading } = useSelector(
    ({ loader }) => ({
      editLoading: loader.editLoading,
      deleteLoading: loader.deleteLoading,
      addTaskLoading: loader.addTaskLoading,
      contactFormLoading: loader.contactFormLoading,
    }),
    shallowEqual
  );

  const getTasks = (filters) => {
    dispatch(setLoader({ name: "tasksLoading", value: true }));
    taskApi
      .getAll(filters)
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader({ name: "tasksLoading", value: false }));
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    dispatch(setTasksCount(tasks.length));
  }, [tasks.length]);

  const onAddNewTask = (newTask) => {
    dispatch(setLoader({ name: "addTaskLoading", value: true }));
    taskApi
      .add(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setIsAddTaskModalOpen(false);
        toast.success("The task has been added successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader({ name: "addTaskLoading", value: false }));
      });
  };

  const onTaskDelete = (taskId) => {
    dispatch(setLoader({ name: "deleteLoading", value: true }));
    taskApi
      .delete(taskId)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(newTasks);

        if (selectedTasks.has(taskId)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskId);
          setSelectedTasks(newSelectedTasks);
        }

        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader({ name: "deleteLoading", value: false }));
        setTaskToDelete(null);
      });
  };

  const onTaskSelect = (taskId) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(taskId)) {
      selectedTasksCopy.delete(taskId);
    } else {
      selectedTasksCopy.add(taskId);
    }
    setSelectedTasks(selectedTasksCopy);
  };

  const deleteSelectedTasks = (toggleConfirmDialog) => {
    dispatch(setLoader({ name: "deleteLoading", value: true }));
    taskApi
      .deleteMany([...selectedTasks])
      .then(() => {
        const newTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            newTasks.push(task);
          }
        });
        setTasks(newTasks);
        setSelectedTasks(new Set());
        toast.success(`${deletedTasksCount} tasks have been deleted successfully!`);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        toggleConfirmDialog();
        dispatch(setLoader({ name: "deleteLoading", value: false }));
      });
  };

  const selectAllTasks = () => {
    const taskIds = tasks.map((task) => task._id);
    setSelectedTasks(new Set(taskIds));
  };

  const resetSelectedTasks = () => {
    setSelectedTasks(new Set());
  };

  const onEditTask = (editedTask) => {
    dispatch(setLoader({ name: "editLoading", value: true }));
    taskApi
      .update(editedTask)
      .then((task) => {
        const newTasks = [...tasks];
        const foundIndex = newTasks.findIndex((t) => t._id === task._id);
        newTasks[foundIndex] = task;
        toast.success(`Task has been updated successfully!`);
        setTasks(newTasks);
        setEditableTask(null);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoader({ name: "editLoading", value: false }));
      });
  };

  const onFilter = (filters) => {
    getTasks(filters);
  };

  return (
    <Container>
      <Row></Row>
      <Row className={`${styles.topButtons} justify-content-center m-3`}>
        <Col xs="6" sm="4" md="3">
          <Button variant="success" onClick={() => setIsAddTaskModalOpen(true)}>
            Add new task
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3">
          <Button variant="warning" onClick={selectAllTasks}>
            Select all
          </Button>
        </Col>
        <Col xs="6" sm="4" md="3">
          <Button variant="secondary" onClick={resetSelectedTasks}>
            Reset selected
          </Button>
        </Col>
      </Row>
      <Row>
        <Filters onFilter={onFilter} />
      </Row>
      <Row>
        {tasks.map((task) => {
          return (
            <Task
              data={task}
              key={task._id}
              onTaskDelete={setTaskToDelete}
              onTaskSelect={onTaskSelect}
              checked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              onStatusChange={onEditTask}
            />
          );
        })}
      </Row>
      <DeleteSelected
        disabled={!selectedTasks.size}
        loading={deleteLoading}
        tasksCount={selectedTasks.size}
        onSubmit={deleteSelectedTasks}
      />
      {taskToDelete && (
        <ConfirmDialog
          loading={deleteLoading}
          tasksCount={1}
          onCancel={() => setTaskToDelete(null)}
          onSubmit={() => {
            onTaskDelete(taskToDelete);
          }}
        />
      )}
      {isAddTaskModalOpen && (
        <TaskModal loading={addTaskLoading} onCancel={() => setIsAddTaskModalOpen(false)} onSave={onAddNewTask} />
      )}
      {editableTask && (
        <TaskModal
          onCancel={() => setEditableTask(null)}
          onSave={onEditTask}
          loading={editLoading}
          data={editableTask}
        />
      )}
    </Container>
  );
}

export default Todo;
