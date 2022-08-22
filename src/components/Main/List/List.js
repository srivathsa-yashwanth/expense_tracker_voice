import React from 'react'
import {List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core'
import {Delete, MoneyOff} from '@material-ui/icons'

import useStyles from './listStyles'

const List = () => {

    const classes = useStyles();
    const transactions = [
        {id:1,
        type:'Income',
        category:'Salary',
        amount: 50,
        date: '22 Aug 2022',
        },
        {id:2,
        type:'Expense',
        category:'Pets',
        amount: 50,
        date: '20 Aug 2022',
        }, 
        {id:3,
        type:'Income',
        category:'Business',
        amount: 150,
        date: '22 Jul 2022',
        }
    ];

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
                    <ListItemText primary={t.category} secondary={`$${t.amount} - ${t.date}`} />
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick='' >
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