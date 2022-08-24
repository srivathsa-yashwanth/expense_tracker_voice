import React , {useState, useEffect , useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import {v4 as uuidv4} from 'uuid';
import { useSpeechContext } from '@speechly/react-client';


import { ExpenseTrackerContext } from '../../../context/context'
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate'
import useStyles from './formStyles'
import CustomSnackbar from '../../snackbar/Snackbar';

const initialState = {
    type : '',
    category: '',
    amount: 0,
    date: formatDate(new Date()),
}

const Form = () => {

  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const {addTransaction} = useContext(ExpenseTrackerContext);
  const {segment} = useSpeechContext();
  const [open, setOpen] = useState(false);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount) || !formData.date.includes('-'))) return;
    const transaction = {...formData, amount:Number(formData.amount), id:uuidv4()};
    addTransaction(transaction);
    setOpen(true);
    setFormData(initialState);   
  }

  useEffect(() =>{

        if (segment){
            if (segment.intent.intent === 'add_expense'){
                setFormData({...formData, type:'Expense'});
            }
            else if (segment.intent.intent === 'add_income'){
                setFormData({...formData, type:'Income'});
            }
            else if (segment.isFinal && segment.intent.intent === 'create_transaction'){
                return createTransaction();
            }
            else if (segment.isFinal && segment.intent.intent === 'cancel_transaction'){
                return setFormData(initialState);
            }

            segment.entities.forEach((E) => {
                const category = `${E.value.charAt(0)}${E.value.slice(1).toLowerCase()}`; 
                switch (E.type){
                    case 'amount':
                        setFormData({...formData, amount:E.value})
                        break;
                    case 'category':
                        if (incomeCategories.map((ic) => ic.type).includes(category)){
                            setFormData({...formData,type:'Income', category:category})
                        }
                        else if (incomeCategories.map((ic) => ic.type).includes(category)){
                            setFormData({...formData, type:'Expense', category:category})
                        }
                        setFormData({...formData, category:category})
                        break;
                    case 'date':
                        setFormData({...formData, date:E.value})
                        break;
                    
                    default:
                        setFormData({...formData})
                }
            })
            if (segment.isFinal && formData.amount && formData.type && formData.category && formData.date){
                createTransaction();
            }
        }
    
  }, [segment])

  const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories;

//   console.log(formData)

  return (
    <Grid container spacing={2}>
        <CustomSnackbar open={open} setOpen={setOpen} />
        <Grid item xs={12}>
            <Typography align='center' variant='subtitle2' gutterBottom>
                {segment && segment.words.map((w)=> w.value).join(' ')}
            </Typography>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e)=> setFormData({...formData, type: e.target.value})} >
                    <MenuItem value='Income' >Income</MenuItem>
                    <MenuItem value='Expense' >Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6} >
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e)=> setFormData({...formData, category: e.target.value})} >
                    {
                        selectedCategory.map((c) => <MenuItem key={c.type} value={c.type} >{c.type}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6} >
            <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={(e)=> setFormData({...formData, amount: e.target.value})} />
        </Grid>
        <Grid item xs={6} >
            <TextField type='date' label='Date' fullWidth value={formData.date} onChange={(e)=> setFormData({...formData, date: formatDate(e.target.value)})} />
        </Grid>

        <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction} >Create</Button>
    </Grid>

  )
}

export default Form