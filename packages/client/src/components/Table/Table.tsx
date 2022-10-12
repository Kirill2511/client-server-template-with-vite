import React, { FC } from 'react';
import classNames from 'classnames';

import './table.scss';

type TableProps = {
  className?: string;
  children: React.ReactNode;
};

export const Table: FC<TableProps> = ({ children, className }) => {
  return <table className={classNames(className, 'table')}>{children}</table>;
};

type TableRowProps = {
  className?: string;
  children: React.ReactNode;
};

export const TableRow: FC<TableRowProps> = ({ children, className }) => {
  return <tr className={classNames(className, 'table__row')}>{children}</tr>;
};

type TableCellProps = {
  className?: string;
  children: React.ReactNode | string;
};

export const TableCell: FC<TableCellProps> = ({ children, className }) => {
  return <td className={classNames(className, 'table__cell')}>{children}</td>;
};
