import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { CartSummaryItem, Layout } from '../../components';
import { useProduct, useCart, useRecord } from '../../context';
import {
  CartSummaryList,
  ChecoutContent,
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

      <ChecoutContent>
        <SummarySection>
          <SubTitle>Cart Summary</SubTitle>
          <CartSummaryList>
          {allCartItemsId?.map((cartItemId) => (
            <li key={cartItemId.toString()}>
              <CartSummaryItem cartItemId={cartItemId}/>
            </li>
          ))}
          </CartSummaryList>

          <TotalPriceLabel>{`Total: $${subtotalPrice}`}</TotalPriceLabel>
        </SummarySection>

        <hr />

        <FormSection>
          <SubTitle>Payment Form</SubTitle>

          <Formik
            initialValues={{
              email: '',
              name: '',
              lastname: '',
              address: '',
            }}

            onSubmit={buyProducts}
          >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <p>
                <label htmlFor="email">Email:</label>
                <input id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </p>

              <p>
                <label htmlFor="name">Name:</label>
                <input id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </p>

              <p>
                <label htmlFor="lastname">Lastname:</label>
                <input id="lastname"
                  name="lastname"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </p>

              <p>
                <label htmlFor="address">Address:</label>
                <input id="address"
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </p>

              <button type="submit">BUY</button>
            </form>
          )}
          </Formik>
        </FormSection>
      </ChecoutContent>
    </Layout>
  )
}

export default Checkout;