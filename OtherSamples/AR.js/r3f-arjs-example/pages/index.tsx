import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AR.js samples</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <Link href="multi-model"><a className="p-2 mb-2">multi model: timer switching</a></Link>
      <Link href="multi-model"><a className="p-2 mb-2" >multi model: select by user</a></Link>
      </main>
    </div>
  )
}

export default Home
