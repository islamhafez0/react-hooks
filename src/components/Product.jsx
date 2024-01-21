import React from 'react'

export const Product = ({ product, addToCart, setShowCart }) => {
  if(!product) {
    return <div>Something went wrong</div>
  }
  const handleClick = (product) => {
    setShowCart(true);
    addToCart();
  }
  return (
    <div className='product'>
      <img src={product.image} className='image' alt={product.title} />
      <div style={{marginBottom: '60px' ,textAlign:'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2>{product.title}</h2>
        <span style={{ padding: '0 10px', fontSize:'24px', fontWeight: 'bold'}}>${product.price}</span>
      </div>
      <button
        onClick={handleClick}
        style={{cursor: 'pointer', fontWeight: "bold", position: 'absolute', left: '0', bottom: '0', width: '100%', padding: '10px' }}
        >Add To Cart</button>
    </div>
  )
}
