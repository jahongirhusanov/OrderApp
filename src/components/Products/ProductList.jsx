import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

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

export default function ProductList() {
  const styles = useStyles()
  const [data, setData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [open, setOpen] = useState(false)
  const [createDialog, setCreateDialog] = useState(false)
  const [updateDialog, setUpdateDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [saveButton, setSaveButton] = useState(true)

  const [createProduct, setCreateProduct] = useState({
    title: '',
    category: '',
    price: 0,
  })

  useEffect(() => {
    getProducts()
    getCategory()
  }, [])
  // Get category list
  const getCategory = async () => {
    await axios
      .get(baseURL + '/category')
      .then((res) => {
        setCategoryData(res.data)
      })
      .catch((err) => console.log(err))
  }
  //   Get Products
  const getProducts = async () => {
    await axios
      .get(baseURL + '/products')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  //   Post Products
  const postProduct = async () => {
    let product = {
      title: createProduct.title,
      category: createProduct.category,
      price: createProduct.price,
    }
    await axios
      .post(baseURL + '/products', product)
      .then((res) => {
        getProducts()
        setOpen(false)
        setCreateDialog(false)
      })
      .catch((err) => console.log(err))
  }
  //   Update Product
  const updateProduct = async () => {
    await axios
      .put(baseURL + '/products' + '/' + createProduct.id, createProduct)
      .then((res) => {
        getProducts()
        setSaveButton(true)
        setUpdateDialog(false)
      })
      .catch((err) => console.log(err))
  }
  //   Delete product
  const deleteProduct = async () => {
    await axios
      .delete(baseURL + '/products' + '/' + createProduct.id)
      .then((res) => {
        getProducts()
        setDeleteDialog(false)
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSaveButton(false)
    setCreateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setUpdateDialog(false)
    setDeleteDialog(false)
    setCreateDialog(false)
    setSaveButton(true)
    setOpen(false)
  }
  const selectProduct = (title, type) => {
    setCreateProduct(title)
    if (type === 'Edit') {
      setUpdateDialog(true)
    }
    if (type === 'Delete') {
      setDeleteDialog(true)
    }
  }

  // Create dialog body
  const createData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='title'
        label='Title'
      />
      <FormControl className={styles.inputMaterial}>
        <InputLabel htmlFor='age-native-simple'>Category</InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{
            name: 'category',
          }}
        >
          <option aria-label='None' value='' />
          {categoryData.map((item) => {
            return <option value={item.id}>{item.parent}</option>
          })}
        </Select>
      </FormControl>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='price'
        label='Price'
      />
    </div>
  )
  // Edit dialog body
  const editData = (
    <div>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='title'
        label='Title'
        value={createProduct && createProduct.title}
      />
      <FormControl className={styles.inputMaterial}>
        <InputLabel htmlFor='age-native-simple'>Category</InputLabel>
        <Select
          native
          onChange={handleChange}
          value={createProduct && createProduct.category}
          inputProps={{
            name: 'category',
          }}
        >
          <option aria-label='None' value='' />
          {categoryData.map((item) => {
            return <option value={item.id}>{item.parent}</option>
          })}
        </Select>
      </FormControl>
      <TextField
        className={styles.inputMaterial}
        onChange={handleChange}
        name='price'
        label='Price'
        value={createProduct && createProduct.price}
      />
    </div>
  )
  // Product category => Category parent
  var category = categoryData.reduce(function (acc, cur, i) {
    acc[cur.id] = cur.parent
    return acc
  }, {})
  return (
    <div>
      {/* Category table */}
      <MaterialTable
        style={{ margin: '0px 10px' }}
        title='Product list'
        columns={[
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
            title: 'Price',
            field: 'price',
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
          {
            title: 'Category',
            field: 'category',
            lookup: category,
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
        ]}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            iconProps: {
              color: 'primary',
            },
            onClick: (event, rowData) => selectProduct(rowData, 'Edit'),
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            iconProps: {
              color: 'secondary',
            },
            onClick: (event, rowData) => selectProduct(rowData, 'Delete'),
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: () => handleOpen(),
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
        <DialogTitle>Create a new product</DialogTitle>
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
            onClick={() => postProduct()}
            color='primary'
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
        <DialogTitle>Update product</DialogTitle>
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
            onClick={() => updateProduct()}
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
        <DialogTitle>Delete product</DialogTitle>
        <DialogContentText
          style={{ width: '400px', padding: 10, textAlign: 'center' }}
        >
          Are you sure you want to delete this product?
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
            onClick={() => deleteProduct()}
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
