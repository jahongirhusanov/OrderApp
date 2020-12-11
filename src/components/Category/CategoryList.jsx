import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const baseURL = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  icons: {
    cursor: "pointer",
  },
  inputMaterial: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    fontWeight: "bold",
  },
}));

export default function CategoryList() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [saveButton, setSaveButton] = useState(true);

  const [createCategory, setCreateCategory] = useState({
    title: "",
    parent: "",
  });

  useEffect(() => {
    getCategory();
  }, []);
  // Get category list
  const getCategory = async () => {
    await axios
      .get(baseURL + "/category")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err) => console.log(err));
  };

  //   Post Categorys
  const postCategory = async () => {
    let category = {
      title: createCategory.title,
      parent: createCategory.parent,
    };
    await axios
      .post(baseURL + "/category", category)
      .then((res) => {
        getCategory();
        setOpen(false);
        setCreateDialog(false);
      })
      .catch((err) => console.log(err));
  };
  //   Update Category
  const updateCategory = async () => {
    await axios
      .put(baseURL + "/category" + "/" + createCategory.id, createCategory)
      .then((res) => {
        getCategory();
        setSaveButton(true);
        setUpdateDialog(false);
      })
      .catch((err) => console.log(err));
  };
  //   Delete Category
  const deleteCategory = async () => {
    await axios
      .delete(baseURL + "/category" + "/" + createCategory.id)
      .then((res) => {
        getCategory();
        setDeleteDialog(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveButton(false);
    setCreateCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUpdateDialog(false);
    setDeleteDialog(false);
    setCreateDialog(false);
    setSaveButton(true);
    setOpen(false);
  };
  const selectCategory = (parent, type) => {
    setCreateCategory(parent);
    if (type === "Edit") {
      setUpdateDialog(true);
    }
    if (type === "Delete") {
      setDeleteDialog(true);
    }
  };

  // Create dialog data
  const createData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name="title"
        label="Title"
      />
      <FormControl className={styles.inputMaterial}>
        <InputLabel htmlFor="age-native-simple">Parent</InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{
            name: "parent",
          }}
        >
          <option aria-label="None" value="" />
          {categoryData.map((item) => {
            return <option value={item.parent}>{item.parent}</option>;
          })}
        </Select>
      </FormControl>
    </div>
  );

  // Edit dialog data
  const editData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name="title"
        label="Title"
        value={createCategory && createCategory.title}
      />
      <FormControl className={styles.inputMaterial}>
        <InputLabel htmlFor="age-native-simple">Parent</InputLabel>
        <Select
          native
          onChange={handleChange}
          value={createCategory && createCategory.parent}
          inputProps={{
            name: "parent",
          }}
        >
          <option aria-label="None" value="" />
          {categoryData.map((item) => {
            return <option value={item.parent}>{item.parent}</option>;
          })}
        </Select>
      </FormControl>
    </div>
  );
  return (
    <div>
      {/* Category table */}
      <MaterialTable
        style={{ margin: "0px 10px" }}
        title="Category list"
        columns={[
          {
            title: "Name",
            field: "title",
            cellStyle: {
              width: 400,
              minWidth: 200,
            },
            headerStyle: {
              width: 400,
              minWidth: 200,
              whiteSpace: "nowrap",
            },
          },
          {
            title: "Parent",
            field: "parent",
            cellStyle: {
              width: 150,
              minWidth: 80,
            },
            headerStyle: {
              width: 180,
              minWidth: 80,
              whiteSpace: "nowrap",
            },
          },
        ]}
        data={categoryData}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            iconProps: {
              color: "primary",
            },
            onClick: (event, rowData) => selectCategory(rowData, "Edit"),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            iconProps: {
              color: "secondary",
            },
            onClick: (event, rowData) => selectCategory(rowData, "Delete"),
          },
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: () => handleOpen(),
          },
        ]}
        options={{
          paginationType: "stepped",
          pageSizeOptions: [5, 7, 10, 15, 20],
          exportButton: {
            csv: true,
            pdf: true,
          },
          actionsColumnIndex: -1,
          header: true,

          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
      />

      {/* Create Dialog */}
      <Dialog className={styles.modal} open={open} onClose={handleClose}>
        <DialogTitle>Create a new Category</DialogTitle>
        <DialogContent>{createData}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color="secondary"
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            onClick={() => postCategory()}
            color="primary"
            disabled={saveButton}
            className={styles.button}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        className={styles.modal}
        open={updateDialog}
        onClose={handleClose}
      >
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>{editData}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color="secondary"
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            disabled={saveButton}
            onClick={() => updateCategory()}
            color="primary"
            className={styles.button}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        className={styles.modal}
        open={deleteDialog}
        onClose={handleClose}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContentText
          style={{ width: "400px", padding: 10, textAlign: "center" }}
        >
          Are you sure you want to delete this Category?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color="secondary"
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteCategory()}
            color="primary"
            className={styles.button}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
