import { GetServerSideProps } from 'next'
import nextMiddleware from 'utils/nextMiddleware'
import { useRouter } from 'next/router'
import { Api } from 'utils/Api'
import Table from 'components/Table'
import { useUserContext } from 'context/UserContext'
import { ProductOrderModel } from 'models/ProductOrder'
import { useEffect, useState } from 'react'
import { ProductOrder } from 'types/order'
import moment from 'moment'
import DashboardComponent from 'components/Dashboard'
import Card from 'components/Card'

const HomePage = ({ orders: _orders }) => {
  moment.locale('id')
  const { push } = useRouter()
  const { user } = useUserContext()
  const [orders, setOrders] = useState(_orders)

  useEffect(() => {
    setOrders(_orders)
    console.log(_orders)
  }, [_orders])

  const handleLogout = async () => {
    try {
      const res = await Api().delete('/auth/logout')

      if (res.status === 200) {
        push('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardComponent>
      <div className="container">
        <div className="row">
          <Card color="primary">
            <p>Masa Berlaku Langganan</p>
            <h4>15 Juli 2020</h4>
          </Card>
          <Card color="primary">
            <p>Total Produk</p>
            <h4>500</h4>
          </Card>
          <Card color="primary">
            <p>Produk Terjual</p>
            <h4>1000</h4>
          </Card>
          <Card color="primary">
            <p>Total Keuntungan</p>
            <h4>15000000</h4>
          </Card>
        </div>
        <Card>
          <h4>Penjualan hari ini</h4>
          <p style={{ marginBottom: '20px' }}>{moment().format('dddd, LL')}</p>
          <Table>
            <thead>
              <tr>
                <th>Jam</th>
                <th>Customer</th>
                <th>Barang</th>
                <th>Harga Barang</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.docs.map((item: ProductOrder, index: number) => (
                  <tr key={index}>
                    <td>{moment(item.createdAt).format('H:m')}</td>
                    <td>{item.customer}</td>
                    <td>{item.product.name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.total}</td>
                    <td>Action</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </DashboardComponent>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { user } = await nextMiddleware(req, res)

    const order = await ProductOrderModel.find().populate('product')

    return {
      props: {
        user: user,
        isLogin: !!user,
        orders: JSON.parse(
          JSON.stringify({
            docs: order.map((item) => item.toJSON({ virtuals: true })),
          })
        ),
      },
    }
  } catch (e) {
    return { props: { user: null, isLogin: null } }
  }
}
