import BestBrands from '@/features/Home/component/BestBrands'
import Pricing from '@/features/pricing/component/Pricing'
import React from 'react'

export default function page() {
    return (
        <div>
            <Pricing />
            <div className='mb-4'>
                <BestBrands />
            </div>
        </div>
    )
}
