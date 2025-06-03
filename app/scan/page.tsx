import Navbar from '@/components/navbar/Navbar'
import QRScanner from '@/components/QRScanner'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <QRScanner/>
    </div>
  )
}

export default page