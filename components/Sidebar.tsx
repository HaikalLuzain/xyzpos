import { useUserContext } from 'context/UserContext'
import Link from 'next/link'
import React, { Fragment } from 'react'

const Sidebar: React.FC = () => {
  const { user } = useUserContext()
  return (
    <div className="sidebar">
      <div className="profile">
        <h4 className="mb-0">{user.name}</h4>
        <h6 className="mb-0">{user.email}</h6>
        <a href="#">Keluar</a>
      </div>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/produk">Produk</Link>
        </li>
        <li>
          <Link href="/laporan">Laporan</Link>
        </li>
        <li>
          <Link href="/pengaturan">Pengaturan</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
