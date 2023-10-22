from munkres import Munkres, print_matrix
import sys


def calc(arr, type):
    if type == 'max':
        matrix = arr
        res_dict = {"row": [], "col": [], "val": [], "total": []}

        # MENGHITUNG MAKSIMASI
        cost_matrix = []
        for row in matrix:
            cost_row = []
            for col in row:
                cost_row += [sys.maxsize - col]
            cost_matrix += [cost_row]

        m = Munkres()
        indexes = m.compute(cost_matrix)
        print_matrix(matrix, msg='Highest profit through this matrix:')
        total = 0
        for row, column in indexes:
            value = matrix[row][column]
            total += value
            print(f'({row}, {column}) -> {value}')
            res_dict["row"].append(row)
            res_dict["col"].append(column)
            res_dict["val"].append(value)
            res_dict["total"].append(total)

        print(f'total profit={total}')
        return res_dict

    if type == 'min':
        matrix = arr
        res_dict = {"row": [], "col": [], "val": [], "total": []}

        m = Munkres()
        indexes = m.compute(matrix)
        print_matrix(matrix, msg='Lowest cost through this matrix:')
        total = 0
        for row, column in indexes:
            value = matrix[row][column]
            total += value
            print(f'({row}, {column}) -> {value}')
            res_dict["row"].append(row)
            res_dict["col"].append(column)
            res_dict["val"].append(value)
            res_dict["total"].append(total)

        print(f'total cost: {total}')
        return res_dict
