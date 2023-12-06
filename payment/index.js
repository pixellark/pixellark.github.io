paypal.Buttons({
    style : {
        color: 'blue',
        shape: 'pill'
    },
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units : [{
                amount: {
                    value: '0.1'
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            console.log(details)
            // JavaScript code
window.location.href = 'success.php';

        })
    },
    onCancel: function (data) {
      // JavaScript code
window.location.href = 'Oncancel.php';

    }
}).render('#paypal-payment-button');