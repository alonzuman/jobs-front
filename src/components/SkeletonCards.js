import React from 'react'
import SkeletonCard from './SkeletonCard'

const SkeletonCards = () => {
  const skeletons = [1, 2, 3]

  return (
    <>
      {skeletons.map((skeleton, index) => <SkeletonCard key={index} />)}
    </>
  )
}

export default SkeletonCards
