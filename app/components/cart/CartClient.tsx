"use client";

import Image from "next/image";
import PageContainer from "../containers/PageContainer";
import useCart from "@/hooks/useCart";
import Counter from "../general/Counter";     // ✅ eklendi
import Button from "../general/Button";       // ✅ eklendi

const CartClient = () => {
  const {
    cartPrdcts,
    removeFromCart,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease,
  } = useCart();

  // Sepet boşsa
  if (!cartPrdcts || cartPrdcts.length === 0) {
    return <div>Sepetinizde ürün bulunmamaktadır..</div>;
  }

  // Toplam tutar
  const cartPrdctsTotal = cartPrdcts.reduce(
    (sum, p) => sum + p.price * (p.quantity ?? 1),
    0
  );

  return (
    <div className="my-3 md:my-10">
      <PageContainer>
        {/* Başlık satırı */}
        <div className="grid grid-cols-5 text-center border-b py-3 font-semibold">
          <div>Ürün Resmi</div>
          <div>Ürün Adı</div>
          <div>Ürün Miktarı</div>
          <div>Ürün Fiyatı</div>
          <div />
        </div>

        {/* Ürün satırları */}
        <div>
          {cartPrdcts.map((cart) => (
            <div
              key={cart.id}
              className="grid grid-cols-5 items-center text-center my-5"
            >
              <div className="flex justify-center">
                <Image
                  src={cart.image}
                  width={40}
                  height={40}
                  alt={cart.name}
                />
              </div>

              <div>{cart.name}</div>

              <div className="flex justify-center">
                <Counter
                  cardProduct={cart}
                  increaseFunc={() => addToBasketIncrease(cart)}
                  decreaseFunc={() => addToBasketDecrease(cart)}
                />
              </div>

              <div className="text-orange-600 text-lg">
                {cart.price} ₺
              </div>

              <div className="flex justify-center">
                <Button text="Ürünü Sil" small onClick={() => removeFromCart(cart)} />
              </div>
            </div>
          ))}
        </div>

        {/* Alt bölüm: sepeti temizle + toplam */}
        <div className="flex items-center justify-between my-5 py-5 border-t">
          <button
            onClick={() => removeCart()}
            className="underline text-sm"
          >
            Sepeti Sil
          </button>

          <div className="text-lg md:text-2xl text-red-500 font-bold">
            {cartPrdctsTotal} ₺
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default CartClient;
