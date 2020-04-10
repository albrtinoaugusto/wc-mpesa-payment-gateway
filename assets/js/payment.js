const text = {
    intro : {
      title: 'Informações de pagamento',
      description :  `Verifique seus detalhes antes de pressionar o botão abaixo.
O seu número de telefone DEVE estar registrado na MPesa (e Activo) para que isso funcione.
Você receberá um pop-up no telefone solicitando a confirmação do pagamento.
Digite o PIN do seu serviço (MPesa) para continuar.
Você receberá uma mensagem de confirmação logo em seguida`,
    },
    requested: {
      title: 'Solicitação de pagamento enviada!',
      description: 'Verifique seu telefone e digite seu código PIN para confirmar o pagamento ...'
    },
    received: {
      title: 'Pagamento recebido!',
      description: 'Seu pagamento foi recebido e seu pedido será processado em breve.'
    },
    timeout:{
      title: "Tempo limite de pagamento excedido!",
      description: 'Use o botão Voltar do navegador e tente novamente.'
    },
    failed:{
      title: "O pagamento falhou!",
      description: 'Use o botão Voltar do navegador e tente novamente.'
    }
  };
const TransactionTimeoutTime = 60000;
const TransactionStatusTime = 3000;
var response1;
//TODO: implementar contador visivel

  let app = new Vue({
    el: '#app',
    data: {
      status:{
        title: text.intro.title,
        description: text.intro.description
      },
      timerChecker : null,
      timeoutChecker: null,
      return_url: '#',
      disabled: false
      },
      methods:{
        requestSyncPayment: function (info) {
          this.tooglePaymentButton();
          this.return_url = info.return_url;
          const params = new URLSearchParams();
          params.append('order_id',info.order_id);
          
          this.checkTimeout();
          axios.post('/?wc-api=process_action', params).then(function (response) {
            if(response.data.status == 'success'){
              this.status = text.received;
              setTimeout(()=> (window.location.href = this.return_url) , 5000);
            }else if(response.data.status == 'failed') {
              this.status = text.failed;
            }
          }.bind(this))
        },
        tooglePaymentButton: function () {
        this.disabled = (!this.disabled)
      },
        checkTimeout: function () {
          this.timeoutChecker = setTimeout( () => {
            this.status = text.timeout;
            clearInterval(this.timerChecker)
          }, TransactionTimeoutTime)
        }
      }  
  })