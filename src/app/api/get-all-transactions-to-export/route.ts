import { getAllUserTransactions } from 'entities/transaction';
import * as XLSX from 'xlsx-js-style';
import { type CellStyle } from 'xlsx-js-style';

import { auth } from '@/prisma/auth';

type TypedCell = {
  s?: CellStyle;
};

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response('Вы не авторизованы', { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);
    const transactions = await getAllUserTransactions(userId);

    const headers = ['Название', 'Тип', 'Категория', 'Сумма', 'Дата'];

    const data = transactions.map((transaction) => [
      transaction.title,
      transaction.type === 'income' ? 'Доход' : 'Расход',
      transaction.category,
      transaction.amount,
      new Date(transaction.date).toLocaleDateString(),
    ]);

    const sheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    worksheet['!cols'] = headers.map((_, colIndex) => {
      const maxLength = sheetData.reduce((max, row) => {
        const cellValue = row[colIndex];
        return Math.max(max, cellValue?.toString().length || 0);
      }, 0);
      return { wch: maxLength + 4 };
    });

    headers.forEach((_, colIndex) => {
      const headerCellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
      const headerCell: TypedCell = worksheet[headerCellAddress];
      if (headerCell) {
        headerCell.s = {
          font: { bold: true },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            bottom: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          },
        };
      }
    });

    data.forEach((row, rowIndex) => {
      row.forEach((cellValue, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
        const cell: TypedCell = worksheet[cellAddress];
        if (cell) {
          cell.s = {
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
              right: { style: 'thin', color: { rgb: '000000' } },
            },
          };

          if (colIndex === 1) {
            cell.s.fill = {
              fgColor: { rgb: cellValue === 'Доход' ? 'D4FCD8' : 'FCD8D8' },
            };
          }
        }
      });
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Транзакции');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return new Response(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="transactions.xlsx"',
      },
    });
  } catch (error) {
    console.error('Ошибка при экспорте транзакций:', error);
    return new Response('Ошибка сервера', { status: 500 });
  }
}
