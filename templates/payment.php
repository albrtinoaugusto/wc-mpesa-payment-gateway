<div class="payment-container" id="app">
  <div>
    <h4  class="payment-title">{{status.title}}</h4>
    <div class="payment-description" role="alert">{{status.description}}</div>
  </div>
<button class="payment-btn" v-bind="{ disabled }" v-on:click="requestSyncPayment({
        order_id: '<?=  $order_id ?>',
        return_url: '<?=  $return_url ?>',
    })">
  <?= __( 'PAY', 'wc-mpesa-payment-gateway' ) ?>
</button>
</div>
