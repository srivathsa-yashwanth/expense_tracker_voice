import {useContext} from 'react'

import {ExpenseTrackerContext} from './context/context'
import {incomeCategories, expenseCategories, resetCategories} from './constants/categories'

const useTransactions = (title) => {

    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t) => t.type === title);
    const total = transactionsPerType.reduce((acc, cur) => acc += cur.amount,0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    // console.log({transactionsPerType, total, categories})

    transactionsPerType.forEach((T) => {
        const category = categories.find((c) => c.type === T.category)
        if (category) category.amount += T.amount
    });

    const filteredCategories = categories.filter((c) => c.amount > 0)

    const chartData = {

        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],

        labels: filteredCategories.map((c) => c.type),
    };

    return { total, chartData}

}

export default useTransactions