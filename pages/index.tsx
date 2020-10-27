import Layout from 'components/Layout'
import Link from 'next/link'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/dashboard">Go Dash</Link>
    </p>
  </Layout>
)

export default IndexPage
