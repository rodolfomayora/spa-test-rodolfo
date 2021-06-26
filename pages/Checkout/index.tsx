import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { CartSummaryItem, Layout, PaymentForm } from '../../components';
import { useProduct, useCart, useRecord } from '../../context';
import {
  CartSummaryList,
  CheckoutContent,
  FormSection,
  MainTitle,
  SubTitle,
  SummarySection,
  TotalPriceLabel
} from './styles';

const Checkout: FC = () => {

  const productContext = useProduct();
  const { discountProductsFromStok } = productContext;

  const cartContext = useCart();
  const { cartState, emptyCart } = cartContext;
  const { subtotalPrice, cartItemsById, allCartItemsId } = cartState;

  const recordContext = useRecord();
  const { addRecord } = recordContext;

  const router = useRouter();
  const redirect = router.push;

  const buyProducts = (values: any) => {
    const allValues: object = {
      ...values,
      totalPrice: subtotalPrice,
    };
    addRecord(allValues);
    discountProductsFromStok(cartItemsById);
    redirect('/ShoppingRecord');
    emptyCart();
  }

  return (
    <Layout pageTitle="Checkout">
      <MainTitle>Check Out</MainTitle>

      <CheckoutContent>
        <SummarySection>
          <SubTitle>Cart Summary</SubTitle>
          <CartSummaryList>
          {allCartItemsId.map((cartItemId) => (
            <li key={cartItemId}>
              <CartSummaryItem cartItemId={cartItemId}/>
            </li>
          ))}
          </CartSummaryList>

          <TotalPriceLabel>{`Total: $${subtotalPrice.toFixed(2)}`}</TotalPriceLabel>
        </SummarySection>

        <FormSection>
          <SubTitle>Payment Form</SubTitle>
          <PaymentForm onClickSubmitAction={buyProducts}/>
        </FormSection>
      </CheckoutContent>
    </Layout>
  )
}

export default Checkout;