function Cart ({items, setCartItems, onCheckout , onBack}) {
  //remove item from cart
    const removeItem =(id) => {
      setCartItems(items.filter((item)=>item.id !==  id))
    };

    //update quantity
    const updateQuantity =(id, newQty) =>{
      if (newQty <= 0){
        removeItem(id)
      }
      else{
        setCartItems(
          items.map((item)=>
            item.id === id? {...item, quantity: newQty}: item

          )
        );
      }
     }

     //calulate total
     const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
     )

  return (
    <>
        <section className='section-header' onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
            <h4>My cart</h4>
        </section>
        <section className="cart">
            {items.length === 0? (
              <p>cart is empty</p>
            ):(
              <div className="cart-item-card">
                {items.map((item)=>(
                  <div key={item.id} style={{marginBottom: "10px"}} className="cart-card">
                    <div className="cart-item-card-info">
                      <div className="cart-item">
                          <img src={item.image} alt="" style={{width:"90px", height: '90px', objectFit:"contain", marginRight:"10px"}}/>
                          <div className="cart-item-info">
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-price">Product price: Ksh {item.price}</p>
                          </div>
                      </div>
                      
                    
                      
                      <div className="cart-calc">
                        <button onClick={()=> updateQuantity(item.id, item.quantity -1)}>-</button>
                        <p className="cart-item-qty">{item.quantity}</p>
                        <button onClick={()=> updateQuantity(item.id, item.quantity +1)}>+</button>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            )}
            <div className="cart-finance">
              <p className="cart-total"><strong>Total: KES {total}</strong></p>
              <button 
                onClick={onCheckout}
                style={{marginTop: "15px", padding: "20px", backgroundColor: "#4caf50", color:"white", border:"none", cursor:"pointer"}}
              >
                Proceed to CheCkout
              </button>
            </div>
            
        </section>
    </>
  )
}

export default Cart