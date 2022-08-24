import React ,{useContext} from 'react'
import {List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core'
import {Delete, MoneyOff} from '@material-ui/icons'

import {ExpenseTrackerContext} from '../../../context/context';
import useStyles from './listStyles'

const List = () => {

    const classes = useStyles();
    const {deleteTransaction, transactions} = useContext(ExpenseTrackerContext);
  
  return (
    <MUIList dense={false} className={classes.list} >
        {transactions.map((t) => (
            <Slide direction='down' in mountOnEnter unmountOnExit key={t.id} >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={t.type === 'Income' ? classes.avatarIncome : classes.avatarExpense } >
                            <MoneyOff/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={t.category} secondary={`₹${t.amount} - ${t.date}`} />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick={()=> deleteTransaction(t.id)} >
                            <Delete/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Slide>
        ))}

    </MUIList>
  )
}

export default List 