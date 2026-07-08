const express =
  require("express");

const router =
  express.Router();

router.post(
  "/payfast",
  async (req, res) => {

    const payfastUrl =
      process.env.PAYFAST_MODE === "production"
        ? "https://www.payfast.co.za/eng/process"
        : "https://sandbox.payfast.co.za/eng/process";

    const paymentData = {
      merchant_id:
        process.env.PAYFAST_MERCHANT_ID,

      merchant_key:
        process.env.PAYFAST_MERCHANT_KEY,

      return_url:
        `${process.env.FRONTEND_URL}/success`,

      cancel_url:
        `${process.env.FRONTEND_URL}/cancel`,

      notify_url:
        `${process.env.API_URL}/api/payment/notify`,

      name_first:
        req.body.name || "Customer",

      email_address:
        req.body.email || "customer@example.com",

      m_payment_id:
        req.body.orderId || Date.now(),

      amount:
        req.body.amount,

      item_name:
        "Convenience Way Booking"
    };

    const queryString =
      new URLSearchParams(
        paymentData
      ).toString();

    res.json({
      url:
        `${payfastUrl}?${queryString}`
    });

});

module.exports = router;
