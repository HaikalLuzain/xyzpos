import React, { Fragment } from 'react'
import style from 'styles/Table.module.scss'

const Table: React.FC = ({ children }) => {
  return <table className={style.Table}>{children}</table>
}

export default Table
