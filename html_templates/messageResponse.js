exports.messageResponse = (info) => {
  return `<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Μηνύματα</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <style>
    .nav {
      padding: 30px;
    
    }
    
    .add-offer {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    
    #search-bar {
      width: 100%;
      margin-left: 75px;
      margin-top:15px;
    }
    
    .btn-search-cont{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    
    .btn-search{
      margin-right: 75px;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
    }
    
    .home {
      font-size: x-large;
    }
    
    .title {
      margin:20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .offer_card {
      width: 75%;
      margin: 25px auto;
    }
    
    .card-header {
      font-size: x-large;
    }
    
    .form-label {
      margin-top: 15px
    }
    
    .btn-primary {
      margin-top: 15px;
    }
    
    
    .btn-add-offer {
      margin-right: 75px;
      margin-top: 0;
    }
    
    .message-form, #offer-card {
      width: 75%;
      margin: 30px auto;
    }
    
    .filter-message{
      width: 200px;
      margin-left: 75px;
    }
    
    .row-cacl {
      margin: 10px;
    
    }
    
    .container-cacl{
      width: 50%
    }
    
    .btn-cacl{
      margin: 15px;
    }
    
    .buttons{
      display: flex;
      justify-content: center;
    }
    
    .result{
      display: flex;
      justify-content: center;
    }
    
    .filter {
      width: 100px;
      margin-left: 75px
    }
    
    .filter-form{
      width:70%
    }
    
    .f-grey{
      color: rgb(116, 116, 116);
    }
    
    .card-info{
      margin:10px
    }
    
    .main{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .message{
      margin-top: 20%;
      width: 50%;
      font-size: 40px;
      text-align: center;
    }
    
    .login-title .login-form{
      display: block;
    }
    
    .login-title{
      text-align: center;
    }
    
    .login-form-actual{
      width: 50%;
      margin: 0 auto;
    }
    
    .buttons-container{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    /* .a-edit{
     float: left;
     clear: none;
    } */
    
    .btn-complete {
      width: 25%;
      margin: 0 auto;
      float: left;
      clear: none;
    }
    
    #timeline{
      display: flex;
      justify-content: center;
      margin: 25px;
    }
    
    .mobile-nav{
      display: none;
    }
    
    #pagination {
      display: flex;
      justify-content: center;
    }
    
    .response{
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .response-table{
      width:60%;
    }

    @media only screen and (max-width: 600px) {
      .response-table{
        width:85%;
      }

      #search-bar {
        width: 100%;
        margin-left: 10px;
        margin-top:15px;
      }
      
      .btn-search-cont{
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      
      .btn-search{
        margin-right: 10px;
      }
    
      .mobile-nav{
        display: block
      }
    
      .desktop-nav{
        display: none
      }
    
      .message {
        width: 80%
      }
    
      .filter{
        margin-left: 10px;
      }
    
      .filter-form{
        width: 100%;
      }
      
      .btn-add-offer {
        margin-right: 0px;
      }
    
      .add-link{
        padding-right: 10px;
      }
      .card-info{
        margin: 10px 0 ;
      }
    
      .col-6 {
        padding: 5
      }
    
      .btn-complete{
        width: 70%;
        margin: 5px;
      }
      .offer-complete{
        position: relative;
        left: -77px;
      }
    
      .offer_card{
        width: 90%;
      }
      html{
        overflow-x: hidden;
      }
    
      body, html {
        overflow-x: hidden;
      }
    }
    </style>
  </head>
  
  <body>
    <script>
      validateForm = () => {
        const form = document.getElementById('offer')
        form.className = 'was-validated'
        document.getElementById('rest-of-page').innerHTML = ''
      }
  
    </script>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mobile-nav">
      <div class="container-fluid">
        <a class="navbar-brand" href="../../index.html">Prime Admin Page</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="../../offers/index.html">Προσφορές</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="../../message.html">Μηνύματα
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <ul class="nav nav-pills nav-fill shadow p-3 mb-5 bg-body rounded desktop-nav">
      <li class="nav-item">
        <a class="nav-link home" href="../../index.html" tabindex="-1" aria-disabled="true">Prime Admin Page</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../../offers/index.html">Προσφορές</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="../../calc.html">Υπολογιστής τιμής</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="../../message.html">Μηνύματα
        </a>
      </li>
    </ul>
    <div class='title'>
      <h5 class="card-title">Αποστολή μηνυμάτων</h5>
    </div>
    <div class='response'>
      <table class='table response-table shadow-sm p-3 mb-5 bg-body rounded'>
        <thead>
          <tr>
            <th scope='col'>Αποτέλεσμα</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Status<th>
            <td>${info.status}</td>
          </tr>
          <tr>
            <th scope='row'>Υπόλοιπο<th>
            <td>${info.balance}</td>
          </tr>
          <tr>
            <th scope='row'>Εγκρίθηκαν<th>
            <td>${info.accepted}</td>
          </tr>
          <tr>
            <th scope='row'>Απορρίφθηκαν<th>
            <td>${info.rejected}</td>
          </tr>
          <tr>
            <th scope='row'>Σχόλια<th>
            <td>${info.remarks}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous">
    </script>
  </body>
  
  </html>`
}