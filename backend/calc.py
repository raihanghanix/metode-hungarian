# Import modul yang dibutuhkan
from munkres import Munkres, print_matrix
import sys

# Membuat function untuk menghitung maksimasi dan minimasi
def calc(arr, type):
    # Menghitung maksimasi jika type = 'max'
    if type == 'max':
        # Matrix berasal dari array yang diinputkan dari client
        matrix = arr
        res_dict = {"row": [], "col": [], "val": [], "total": []}

        # Inisialisasi cost matrix (diperlukan untuk menghitung maksimasi)
        cost_matrix = []
        for row in matrix:
            cost_row = []
            for col in row:
                cost_row += [sys.maxsize - col]
            cost_matrix += [cost_row]

        # Menghitung maksimasi (keuntungan maksimal) dengan algoritma Munkres
        m = Munkres()
        indexes = m.compute(cost_matrix)
        print_matrix(matrix, msg='Highest profit through this matrix:')
        total = 0
        
        # Loop untuk menghitung total keuntungan dan mengisi dictionary res_dict
        for row, column in indexes:
            value = matrix[row][column]
            total += value
            print(f'({row}, {column}) -> {value}')
            res_dict["row"].append(row)
            res_dict["col"].append(column)
            res_dict["val"].append(value)
            res_dict["total"].append(total)

        # Menghitung total keuntungan dan return dictionary res_dict
        # untuk dikirim ke client
        print(f'total profit={total}')
        return res_dict

    # Menghitung minimasi jika type = 'min'
    if type == 'min':
        # Matrix berasal dari array yang diinputkan dari client
        matrix = arr
        res_dict = {"row": [], "col": [], "val": [], "total": []}
        
        # Cost matrix tidak diperlukan untuk menghitung minimasi

        # Menghitung minimasi (biaya terendah) dengan algoritma Munkres
        m = Munkres()
        indexes = m.compute(matrix)
        print_matrix(matrix, msg='Lowest cost through this matrix:')
        total = 0
        
        # Loop untuk menghitung total biaya dan mengisi dictionary res_dict
        for row, column in indexes:
            value = matrix[row][column]
            total += value
            print(f'({row}, {column}) -> {value}')
            res_dict["row"].append(row)
            res_dict["col"].append(column)
            res_dict["val"].append(value)
            res_dict["total"].append(total)

        # Menghitung total biaya dan return dictionary res_dict
        # untuk dikirim ke client
        print(f'total cost: {total}')
        return res_dict