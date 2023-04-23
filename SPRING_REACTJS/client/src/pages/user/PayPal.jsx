import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function PayPal() {
    return (
        <PayPalScriptProvider options={{ "client-id": "AQ18uvc60D0y_HroxWTsDN8kc1LvIisSHzbD079BZXZAxLdksIY6rziN0U5S0mCBGm-dB9daa4DAR2dQ" }}>
            <PayPalButtons style={{ layout: "vertical" }} />
        </PayPalScriptProvider>
    );
}

export default PayPal;