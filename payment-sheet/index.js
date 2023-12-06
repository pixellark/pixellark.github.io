paypal.Buttons({
    style : {
        color: 'blue',
        shape: 'pill'
    },
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units : [{
                amount: {
                    value: '100'
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            console.log(details)
            // JavaScript code
            simulateLoading();
            sendEmail();


        })
    },
    onCancel: function (data) {
      // JavaScript code
window.location.href = 'Oncancel.html';

    }
}).render('#paypal-payment-button');

 