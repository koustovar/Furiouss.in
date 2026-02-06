import emailjs from '@emailjs/browser';

/**
 * Sends a delivery email to the customer using EmailJS.
 * You need to sign up at https://www.emailjs.com/ (Free) to get your keys.
 */
export const sendDeliveryEmail = async (orderData) => {
    // These should ideally be in your .env file
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS keys are missing. Email delivery skipped. Please set VITE_EMAILJS keys in .env");
        return;
    }

    const templateParams = {
        to_name: orderData.customerName,
        to_email: orderData.deliveryEmail,
        template_title: orderData.templateTitle,
        image_url: orderData.templateImage,
        delivery_link: orderData.deliveryLink,
        order_id: (orderData.id || orderData.paymentId || 'N/A').slice(-8).toUpperCase(),
        price: orderData.price,
        total_price: orderData.price
    };

    console.log("Attempting to send email with params:", templateParams);

    if (!templateParams.to_email) {
        console.error("Critical Error: to_email is empty! Check formData.deliveryEmail in Checkout.jsx");
        return false;
    }

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('Delivery email sent successfully!', response.status, response.text);
        return true;
    } catch (error) {
        console.error('Failed to send delivery email:', error);
        return false;
    }
};
