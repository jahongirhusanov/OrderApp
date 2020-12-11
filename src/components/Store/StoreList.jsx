import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
const columns = [
  {
    title: 'ID',
    field: 'id',
    searchable: false,
    cellStyle: {
      width: 100,
      minWidth: 50,
    },
    headerStyle: {
      width: 100,
      minWidth: 50,
      whiteSpace: 'nowrap',
    },
  },
  {
    title: 'Status',
    field: 'active',
    cellStyle: {
      width: 100,
      minWidth: 60,
    },
    headerStyle: {
      width: 100,
      minWidth: 60,
      whiteSpace: 'nowrap',
    },
    render: (rowData) => {
      if (rowData.active) {
        return <SupervisorAccountIcon color='primary' fontSize='large' />
      } else {
        return <SupervisorAccountIcon color='secondary' fontSize='large' />
      }
    },
  },
  {
    title: 'Name',
    field: 'title',
    cellStyle: {
      width: 400,
      minWidth: 200,
    },
    headerStyle: {
      width: 400,
      minWidth: 200,
      whiteSpace: 'nowrap',
    },
  },
  {
    title: 'Telephone number',
    field: 'tel',
    cellStyle: {
      width: 150,
      minWidth: 80,
    },
    headerStyle: {
      width: 180,
      minWidth: 80,
      whiteSpace: 'nowrap',
    },
  },
]
const baseURL = 'http://localhost:5000'

const useStyles = makeStyles((theme) => ({
  icons: {
    cursor: 'pointer',
  },
  inputMaterial: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    fontWeight: 'bold',
  },
}))

export default function StoreList() {
  const styles = useStyles()
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [createDialog, setCreateDialog] = useState(false)
  const [updateDialog, setUpdateDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [saveButton, setSaveButton] = useState(true)

  const [createStore, setCreateStore] = useState({
    title: '',
    inn: '',
    tel: '',
    active: false,
  })

  useEffect(() => {
    getStores()
  }, [])

  //   Get Products
  const getStores = async () => {
    await axios
      .get(baseURL + '/stores')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  //   Post Products
  const postStores = async () => {
    await axios
      .post(baseURL + '/stores', createStore)
      .then((res) => {
        // setData(data.concat(res.data));
        getStores()
        setOpen(false)
      })
      .catch((err) => console.log(err))
  }
  //   Update Product
  const updateStore = async () => {
    await axios
      .put(baseURL + '/stores' + '/' + createStore.id, createStore)
      .then((res) => {
        // let putData = res;
        // console.log(putData);
        // setData(putData);
        getStores()
        setUpdateDialog(false)
        setSaveButton(true)
      })
      .catch((err) => console.log(err))
  }
  //   Delete product
  const deleteStore = async () => {
    await axios
      .delete(baseURL + '/stores' + '/' + createStore.id)
      .then((res) => {
        // let newData = res.data;
        // setData(newData);
        getStores()
        setDeleteDialog(false)
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSaveButton(false)
    setCreateStore((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleChangeSwitch = (event) => {
    setSaveButton(false)
    setCreateStore({
      ...createStore,
      [event.target.name]: event.target.checked,
    })
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setUpdateDialog(false)
    setDeleteDialog(false)
    setSaveButton(true)
    setOpen(false)
  }
  const selectStore = (title, type) => {
    setCreateStore(title)
    if (type === 'Edit') {
      setUpdateDialog(true)
    }
    if (type === 'Delete') {
      setDeleteDialog(true)
    }
  }

  const createData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='title'
        label='Title'
      />
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='inn'
        label='STIR'
      />
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='tel'
        label='Telephone number'
      />
      <FormControlLabel
        control={
          <Switch
            checked={createStore.active}
            onChange={handleChangeSwitch}
            name='active'
            color='primary'
          />
        }
        label='Status'
      />
    </div>
  )
  const editData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='title'
        label='Title'
        value={createStore && createStore.title}
      />
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='inn'
        label='STIR'
        value={createStore && createStore.inn}
      />
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='tel'
        label='Telephone number'
        value={createStore && createStore.tel}
      />
      <FormControlLabel
        control={
          <Switch
            checked={createStore.active}
            onChange={handleChangeSwitch}
            name='active'
            color='primary'
          />
        }
        label='Status'
      />
    </div>
  )

  return (
    <div>
      <MaterialTable
        style={{ margin: '0px 10px' }}
        title='Store list'
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            iconProps: {
              color: 'primary',
            },
            onClick: (event, rowData) => selectStore(rowData, 'Edit'),
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            iconProps: {
              color: 'secondary',
            },
            onClick: (event, rowData) => selectStore(rowData, 'Delete'),
          },
          {
            icon: 'add',
            tooltip: 'Add Store',
            isFreeAction: true,
            onClick: () => handleOpen(),
          },
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => getStores(),
          },
        ]}
        options={{
          paginationType: 'stepped',
          pageSizeOptions: [5, 7, 10, 15, 20],
          exportButton: {
            csv: true,
            pdf: true,
          },
          actionsColumnIndex: -1,
          header: true,

          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
          },
        }}
      />

      {/* Create Dialog */}
      <Dialog className={styles.modal} open={open} onClose={handleClose}>
        <DialogTitle>Create a new Store</DialogTitle>
        <DialogContent>{createData}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color='secondary'
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            onClick={() => postStores()}
            color='primary'
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
        <DialogTitle>Update store</DialogTitle>
        <DialogContent>{editData}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color='secondary'
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            disabled={saveButton}
            onClick={() => updateStore()}
            color='primary'
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
        <DialogTitle>Delete store</DialogTitle>
        <DialogContentText
          style={{ width: '400px', padding: 10, textAlign: 'center' }}
        >
          Are you sure you want to delete this store?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color='secondary'
            className={styles.button}
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteStore()}
            color='primary'
            className={styles.button}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
